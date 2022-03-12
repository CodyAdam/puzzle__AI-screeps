import { defaults } from 'lodash';
import { CreepSuper } from "../creepSuper";

export abstract class Poly extends CreepSuper {
  public static role: CreepRole = ROLE_POLY;
  public static run(creep: Creep): ScreepsReturnCode {
    super.run(creep);
    switch (creep.memory.state) {
      case STATE_MINING:
        {
          if (creep.store.getFreeCapacity() == 0) {
            creep.memory.state = STATE_DEPOSITE;
            creep.memory.focus = null;
            this.run(creep);
            break;
          }
          if (creep.memory.focus) {
            const source: Source | null = Game.getObjectById<Source>(creep.memory.focus.id)
            if (source && source.energy) {
              if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
              }
            } else creep.memory.focus = null;
          } else {
            const sourceMem: SourceMemory | null = Poly.getAvailableSourceMem();
            if (sourceMem)
              creep.memory.focus = sourceMem;
            else
              creep.memory.state = STATE_IDLE;
          }
          break;
        }
      case STATE_BUILDING:
        {
          if (creep.store.getUsedCapacity() == 0) {
            creep.memory.state = STATE_MINING
            this.run(creep);
            break;
          }
          const constructionSite = _.sortBy(Game.rooms["E8S57"].find(FIND_CONSTRUCTION_SITES), s => creep.pos.getRangeTo(s.pos));




          if (constructionSite.length) {
            if (creep.build(constructionSite[0]) === ERR_NOT_IN_RANGE)
              creep.moveTo(constructionSite[0].pos, { visualizePathStyle: { stroke: "#ffaa00" } });
          } else {
            creep.memory.state = STATE_UPGRADING
            this.run(creep);
            break;
          }
          break;
        }
      case STATE_DEPOSITE:
        {
          if (creep.store.getUsedCapacity() == 0) {
            creep.memory.state = STATE_MINING
            this.run(creep);
            break;
          } else if (this.stockEnergy(creep) === ERR_NOT_FOUND) {
            creep.memory.state = STATE_BUILDING
            this.run(creep);
            break;
          }
          break;
        }
      case STATE_UPGRADING:
        {
          let controller = Game.rooms["E8S57"].controller;
          if (creep.store.getUsedCapacity() == 0 || !controller) {
            creep.memory.state = STATE_MINING
            this.run(creep);
            break;
          }
          if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE)
            creep.moveTo(controller.pos, { visualizePathStyle: { stroke: "#ffaa00" } });
          break;
        }
      default:
        {
          creep.memory.state = STATE_MINING
          this.run(creep);
          break;
        }

    }
    return OK;
  }
  public static getAvailableSourceMem(): SourceMemory | null {
    for (const roomName in Memory.rooms) {
      const roomMem: RoomMemory = Memory.rooms[roomName];
      for (const sourcesId in roomMem.sources) {
        const sourceMem = roomMem.sources[sourcesId];
        const source = Game.getObjectById(sourceMem.id)
        if (source && sourceMem.minersId.length < MINER_PER_SOURCE && source.energy) return sourceMem;
      }
    }
    return null;
  }
}
