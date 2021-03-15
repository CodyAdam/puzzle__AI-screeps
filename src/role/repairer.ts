import { CreepBehavior } from "./creep";

export class Repairer extends CreepBehavior {
    public static run(creep: Creep) {
        if ((creep.memory.state == STATE_REPAIRING && creep.store.energy == 0) ||
            (!(creep.memory.state == STATE_REPAIRING) && creep.store.energy < creep.store.getCapacity())) {
            creep.memory.state = STATE_REFILLING;
            creep.say('🔄 refill');
        }
        else if (!(creep.memory.state == STATE_REPAIRING) && creep.store.energy == creep.store.getCapacity()) {
            creep.memory.state = STATE_REPAIRING;
            creep.say('🚧 repair');
        }

        if (creep.memory.state == STATE_REPAIRING) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: Structure) => {
                    return (
                        structure.structureType != STRUCTURE_WALL &&
                        structure.structureType != STRUCTURE_CONTROLLER &&
                        structure.hitsMax != structure.hits
                    );
                }
            });
            targets.sort((a, b) => a.hits - b.hits);
            if (targets.length) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    creep.say('🚧 repair');
                }
            } else super.sleep(creep);
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }

    }
}
