import { CreepBehavior } from "./creep";

export class Miner extends CreepBehavior {
    public static run(creep: Creep) {

        if (!creep.memory.targetId) {
            var sourceId: string | null = this.getAvailableSource(creep.room);
            if (sourceId) {
                var sourceMem: SourceMemory = creep.room.memory.sources[sourceId];
                creep.memory.targetId = sourceMem.id;
                creep.room.memory.sources[sourceId].minersId.push(creep.id);
                creep.memory.state = STATE_MINING;
            } else
                creep.memory.state = STATE_IDLE;
        } else {
            switch (creep.memory.state) {
                case STATE_MINING:
                    var source: Source | null = Game.getObjectById(creep.memory.targetId);
                    if (source && creep.harvest(source) == ERR_NOT_IN_RANGE)
                        creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
                    break;
                case STATE_IDLE:
                    creep.memory.state = STATE_MINING;
                    super.sleep(creep);
                    break;
                default:
                    console.log(creep.name + " not found state : " + creep.memory.state);
                    break;
            }
        }
    }

    public static getAvailableSource(room: Room): string | null {
        for (var sourcesId in room.memory.sources) {
            var sourceMem = room.memory.sources[sourcesId]
            if (sourceMem.minersId.length < MINER_PER_SOURCE)
                return sourceMem.id;
        }
        return null;
    }
}
