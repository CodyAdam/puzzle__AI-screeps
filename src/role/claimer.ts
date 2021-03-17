import { CreepBehavior } from "./creep";

export class Claimer extends CreepBehavior {
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
}
