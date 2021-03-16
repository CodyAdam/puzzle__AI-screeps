import { CreepBehavior } from "./creep";

export class Repairer extends CreepBehavior {
    public static run(creep: Creep) {
        if ((creep.memory.state == STATE_REPAIRING && creep.store.energy == 0) ||
            (!(creep.memory.state == STATE_REPAIRING) && creep.store.energy < creep.store.getCapacity())) {
            creep.memory.state = STATE_REFILLING;
        }
        else if (!(creep.memory.state == STATE_REPAIRING) && creep.store.energy == creep.store.getCapacity()) {
            creep.memory.state = STATE_REPAIRING;
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
                }
            } else super.sleep(creep);
        }
        else {
            if (this.refillEnergy(creep) == ERR_NOT_FOUND)
                creep.memory.state = STATE_REPAIRING;
        }

    }
}
