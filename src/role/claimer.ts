import { CreepSuper } from "./creepSuper";

export abstract class Claimer extends CreepSuper {
    public static role: CreepRole = ROLE_CLAIMER;
    public static run(creep: Creep) {
        super.run(creep);
        var flag: Flag = Game.flags["toClaim"];
        if (flag) {
            if (creep.room == flag.room) {
                if (creep.room.controller && !creep.room.controller.my) {
                    creep.memory.target = creep.room.controller;
                    if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE)
                        creep.moveTo(creep.room.controller);
                }
            } else {
                creep.moveTo(flag);
                creep.memory.target = null;
            }
        } else {
            this.sleep(creep);
            creep.memory.target = null;
        }
    }

    public static run2(creep: Creep) {
        super.run(creep);
        if (!creep.memory.target) {
            var roomMem: RoomMemory | null = this.getAvailableRoomMem();
            if (roomMem) {
                creep.memory.target = roomMem;
                creep.memory.state = STATE_CLAIMING;
            } else
                creep.memory.state = STATE_IDLE;
        } else {
            switch (creep.memory.state) {
                case STATE_IDLE:
                    var source: Source | null = Game.getObjectById(creep.memory.target.id);
                    if (source) {
                        creep.memory.state = STATE_CLAIMING;
                        this.run(creep);
                    } else
                        super.sleep(creep);
                    break;
                case STATE_CLAIMING:
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

                default:
                    console.log(creep.name + " not found state : " + creep.memory.state);
                    break;
            }
        }
    }

    public static getAvailableRoomMem(): RoomMemory | null {
        for (var roomName in Memory.rooms) {
            var roomMem: RoomMemory = Memory.rooms[roomName];
            if (roomMem.claimers.length < 1)
                return roomMem;
        }
        return null;
    }
}
