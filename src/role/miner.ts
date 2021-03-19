import { CreepSuper } from "./creepSuper";

export abstract class Miner extends CreepSuper {
    public static role: CreepRole = ROLE_MINER;
    public static run(creep: Creep): ScreepsReturnCode {
        super.run(creep);
        if (!creep.memory.target) {
            const sourceMem: SourceMemory | null = this.getAvailableSourceMem();
            if (sourceMem) {
                creep.memory.target = sourceMem;
                creep.memory.state = STATE_MINING;
            } else creep.memory.state = STATE_IDLE;
        } else {
            switch (creep.memory.state) {
                case STATE_MINING: {
                    const source: Source | null = Game.getObjectById(creep.memory.target.id);
                    if (source) {
                        if (source && creep.harvest(source) === ERR_NOT_IN_RANGE)
                            creep.moveTo(source, { visualizePathStyle: { stroke: "#FFFFF0" } });
                    } else if (creep.memory.target) {
                        const targetPos: RoomPosition | undefined | null = creep.memory.target.pos;
                        if (targetPos) {
                            const exit: ExitConstant | ERR_NO_PATH | ERR_INVALID_ARGS = creep.room.findExitTo(
                                targetPos.roomName,
                            );
                            if (exit !== ERR_NO_PATH && exit !== ERR_INVALID_ARGS) {
                                const pos: RoomPosition | null = creep.pos.findClosestByPath(exit);
                                if (pos) creep.moveTo(pos, { visualizePathStyle: { stroke: "#FFFFF0" } });
                            }
                        } else console.log(creep.name + " pos not found : " + creep.memory.target.pos.toString());
                    } else {
                        creep.memory.state = STATE_IDLE;
                        this.run(creep);
                    }
                    break;
                }
                case STATE_IDLE: {
                    const source: Source | null = Game.getObjectById(creep.memory.target.id);
                    if (source) {
                        creep.memory.state = STATE_MINING;
                        this.run(creep);
                    } else super.sleep(creep);
                    break;
                }
                default:
                    console.log(creep.name + " not found state : " + creep.memory.state);
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
                if (sourceMem.minersId.length < MINER_PER_SOURCE) return sourceMem;
            }
        }
        return null;
    }

    public static cleanMemory(): ScreepsReturnCode {
        // delete missing miners
        for (const roomName in Memory.rooms) {
            const roomMem: RoomMemory = Memory.rooms[roomName];
            for (const sourceId in roomMem.sources) {
                const sourceMem = roomMem.sources[sourceId];
                sourceMem.minersId = _.filter(sourceMem.minersId, (id) => {
                    const creep: Creep | null = Game.getObjectById(id);
                    return creep !== null;
                });
            }
        }
        return OK;
    }
}
