import { CreepSuper } from "../creepSuper";

export abstract class Claimer extends CreepSuper {
    public static role: CreepRole = ROLE_CLAIMER;
    public static run(creep: Creep): ScreepsReturnCode {
        super.run(creep);
        const flag: Flag = Game.flags.toClaim;
        if (flag) {
            if (creep.room === flag.room) {
                if (creep.room.controller && !creep.room.controller.my) {
                    creep.memory.focus = creep.room.controller;
                    if (creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE)
                        creep.moveTo(creep.room.controller);
                }
            } else {
                creep.moveTo(flag);
                creep.memory.focus = null;
            }
        } else {
            this.sleep(creep);
            creep.memory.focus = null;
        }
        return OK;
    }

    public static run2(creep: Creep): ScreepsReturnCode {
        super.run(creep);
        if (!creep.memory.focus) {
            const roomMem: RoomMemory | null = this.getAvailableRoomMem();
            if (roomMem) {
                creep.memory.focus = roomMem;
                creep.memory.state = STATE_CLAIMING;
            } else creep.memory.state = STATE_IDLE;
        } else {
            switch (creep.memory.state) {
                case STATE_IDLE: {
                    const source: Source | null = Game.getObjectById<Source>(creep.memory.focus.id);
                    if (source) {
                        creep.memory.state = STATE_CLAIMING;
                        this.run(creep);
                    } else super.sleep(creep);
                    break;
                }
                case STATE_CLAIMING: {
                    const source: Source | null = Game.getObjectById<Source>(creep.memory.focus.id);
                    if (source) {
                        if (source && creep.harvest(source) === ERR_NOT_IN_RANGE)
                            creep.moveTo(source, { visualizePathStyle: { stroke: "#FFFFF0" } });
                    } else if (creep.memory.focus) {
                        const targetPos: RoomPosition | undefined | null = creep.memory.focus.pos;
                        if (targetPos) {
                            const exit: ExitConstant | ERR_NO_PATH | ERR_INVALID_ARGS = creep.room.findExitTo(
                                targetPos.roomName,
                            );
                            if (exit !== ERR_NO_PATH && exit !== ERR_INVALID_ARGS) {
                                const pos: RoomPosition | null = creep.pos.findClosestByPath(exit);
                                if (pos) creep.moveTo(pos, { visualizePathStyle: { stroke: "#FFFFF0" } });
                            }
                        } else console.log(creep.name + " pos not found : " + creep.memory.focus);
                    } else {
                        creep.memory.state = STATE_IDLE;
                        this.run(creep);
                    }
                    break;
                }

                default:
                    console.log(creep.name + " not found state : " + creep.memory.state);
                    break;
            }
        }
        return OK;
    }

    public static getAvailableRoomMem(): RoomMemory | null {
        for (const roomName in Memory.rooms) {
            const roomMem: RoomMemory = Memory.rooms[roomName];
            if (roomMem.claimers.length < 1) return roomMem;
        }
        return null;
    }
}
