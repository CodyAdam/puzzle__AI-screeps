import { CreepBehavior } from "./creep";

export class Miner extends CreepBehavior {
    public static run(creep: Creep) {
        super.run(creep);
        if (!creep.memory.target) {
            var sourceMem: SourceMemory | null = this.getAvailableSourceId();
            if (sourceMem) {
                creep.memory.target = sourceMem;
                creep.memory.state = STATE_MINING;
            } else
                creep.memory.state = STATE_IDLE;
        } else {
            switch (creep.memory.state) {
                case STATE_MINING:
                    var source: Source | null = Game.getObjectById(creep.memory.target.id);
                    if (source) {
                        if (source && creep.harvest(source) == ERR_NOT_IN_RANGE)
                            creep.moveTo(source, { visualizePathStyle: { stroke: "#FFFFF0" } });
                    } else if (creep.memory.target) {
                        var targetPos: RoomPosition | undefined | null = creep.memory.target.pos;
                        if (targetPos) {
                            var exit: ExitConstant | ERR_NO_PATH | ERR_INVALID_ARGS = creep.room.findExitTo(targetPos.roomName);
                            if (exit != ERR_NO_PATH && exit != ERR_INVALID_ARGS) {
                                var pos: RoomPosition | null = creep.pos.findClosestByPath(exit);
                                if (pos)
                                    creep.moveTo(pos, { visualizePathStyle: { stroke: "#FFFFF0" } });
                            }
                        }
                        else console.log(creep.name + " pos not found : " + creep.memory.target);

                    } else {
                        creep.memory.state = STATE_IDLE;
                        this.run(creep);
                    }
                    break;
                case STATE_IDLE:
                    var source: Source | null = Game.getObjectById(creep.memory.target.id);
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
