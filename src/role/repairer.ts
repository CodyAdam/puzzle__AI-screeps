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
            var allRoomsTargets: AnyStructure[] = []
            for (var roomName in Memory.rooms) {
                var room = Game.rooms[roomName];
                if (room) {

                    var targets: AnyStructure[] = room.find(FIND_STRUCTURES, {
                        filter: (structure: Structure) => {
                            return (
                                structure.structureType != STRUCTURE_WALL &&
                                structure.structureType != STRUCTURE_CONTROLLER &&
                                structure.hitsMax != structure.hits
                            );
                        }
                    });
                    allRoomsTargets = allRoomsTargets.concat(targets);
                } else continue;
            }
            allRoomsTargets.sort((a, b) => a.hits - b.hits);
            if (allRoomsTargets.length) {
                if (creep.repair(allRoomsTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(allRoomsTargets[0]);
                }
            } else super.sleep(creep);
        }
        else {
            if (this.refillEnergy(creep) == ERR_NOT_FOUND)
                creep.memory.state = STATE_REPAIRING;
        }

    }
}
