import { CreepBehavior } from "./creep";

export class Claimer extends CreepBehavior {
    public static run(creep: Creep) {
        var flag: Flag = Game.flags["toClaim"];
        if (flag) {
            if (creep.room == flag.room) {
                if (creep.room.controller && !creep.room.controller.my) {
                    console.log(creep.reserveController(creep.room.controller));
                    if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE)
                        creep.moveTo(creep.room.controller);
                }
            } else {
                creep.moveTo(flag);
            }
        }
    }
}
