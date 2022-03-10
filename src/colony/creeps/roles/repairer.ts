import { CreepSuper } from "../creepSuper";

export abstract class Repairer extends CreepSuper {
    public static role: CreepRole = ROLE_REPAIRER;
    public static run(creep: Creep): ScreepsReturnCode {
        super.run(creep);
        if (
            (creep.memory.state === STATE_REPAIRING && creep.store.energy === 0) ||
            (!(creep.memory.state === STATE_REPAIRING) && creep.store.energy < creep.store.getCapacity())
        ) {
            creep.memory.state = STATE_WITHDRAW;
        } else if (!(creep.memory.state === STATE_REPAIRING) && creep.store.energy === creep.store.getCapacity()) {
            creep.memory.state = STATE_REPAIRING;
        }

        if (creep.memory.state === STATE_REPAIRING) {
            let allRoomsTargets: AnyStructure[] = [];
            for (const roomName in Memory.rooms) {
                const room = Game.rooms[roomName];
                if (room) {
                    const targets: AnyStructure[] = room.find(FIND_STRUCTURES, {
                        filter: (structure: Structure) => {
                            return (
                                structure.structureType !== STRUCTURE_WALL &&
                                structure.structureType !== STRUCTURE_CONTROLLER &&
                                structure.hitsMax !== structure.hits
                            );
                        },
                    });
                    allRoomsTargets = allRoomsTargets.concat(targets);
                } else continue;
            }
            allRoomsTargets.sort((a, b) => a.hits - b.hits);
            if (allRoomsTargets.length) {
                if (creep.repair(allRoomsTargets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(allRoomsTargets[0]);
                }
            } else super.sleep(creep);
        } else {
            if (this.refillEnergy(creep) === ERR_NOT_FOUND) creep.memory.state = STATE_REPAIRING;
        }
        return OK;
    }
}
