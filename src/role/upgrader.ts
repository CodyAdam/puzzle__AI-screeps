import { CreepBehavior } from "./creep";

export class Upgrader extends CreepBehavior {
    public static run(creep: Creep) {
        if (creep.memory.state == STATE_UPGRADING && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.state = STATE_REFILLING;
            creep.say("🔄 harvest");
        }
        if (!(creep.memory.state == STATE_UPGRADING) && creep.store.getFreeCapacity() == 0) {
            creep.memory.state = STATE_UPGRADING;
            creep.say("⚡ upgrade");
        }

        if (creep.memory.state == STATE_UPGRADING) {
            if (creep.room.controller && creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#ffffff" } });
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
            }
        }
    }
}
