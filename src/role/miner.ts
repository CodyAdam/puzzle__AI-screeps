import { CreepBehavior } from "./creep";

export class Miner extends CreepBehavior {
    public static run(creep: Creep) {
        if (!creep.memory.targetId) {
            var sourceMem: SourceMemory | null = this.getAvailableSourceId();
            if (sourceMem) {
                creep.memory.targetId = sourceMem.id;
                creep.memory.state = STATE_MINING;
            } else
                creep.memory.state = STATE_IDLE;
        } else {
            switch (creep.memory.state) {
                case STATE_MINING:
                    var source: Source | null = Game.getObjectById(creep.memory.targetId);
                    if (source && creep.harvest(source) == ERR_NOT_IN_RANGE)
                        creep.moveTo(source, { visualizePathStyle: { stroke: "#FFFFF0" } });
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

    public static getAvailableSourceId(): SourceMemory | null {
        for (var roomName in Memory.rooms) {
            var room: Room = Game.rooms[roomName];
            for (var sourcesId in room.memory.sources) {
                var sourceMem = room.memory.sources[sourcesId]
                if (sourceMem.minersId.length < MINER_PER_SOURCE)
                    return sourceMem;
            }
        }
        return null;
    }
}
