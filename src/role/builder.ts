import { CreepBehavior } from "./creep";

export class Builder extends CreepBehavior {
    public static run(creep: Creep) {
        if (creep.memory.state != STATE_BUILDING && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.state = STATE_BUILDING;
            creep.say("🔄 harvest");
        }
        if (creep.memory.state != STATE_BUILDING && creep.store.getFreeCapacity() == 0) {
            creep.memory.state = STATE_BUILDING;
            creep.say("🚧 build");
        }

        if (creep.memory.state == STATE_BUILDING) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
                }
            } else super.sleep(creep);
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
            }
        }
    }
}
