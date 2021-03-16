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
                    if (source) {

                        if (source && creep.harvest(source) == ERR_NOT_IN_RANGE)
                            creep.moveTo(source, { visualizePathStyle: { stroke: "#FFFFF0" } });
                    } else {
                        creep.memory.state = STATE_IDLE;
                        this.run(creep);
                    }
                    break;
                case STATE_IDLE:
                    var source: Source | null = Game.getObjectById(creep.memory.targetId);
                    if (source) {
                        creep.memory.state = STATE_MINING;
                        this.run(creep);
                    } else
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
            var roomMem: RoomMemory = Memory.rooms[roomName];
            for (var sourcesId in roomMem.sources) {
                var sourceMem = roomMem.sources[sourcesId]
                if (sourceMem.minersId.length < MINER_PER_SOURCE)
                    return sourceMem;
            }
        }
        return null;
    }
}
