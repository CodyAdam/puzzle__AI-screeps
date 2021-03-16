export class CreepBehavior {
    public static sleep(creep: Creep): void {
        var restPoint = Game.flags["rest"].pos;
        creep.say("💤");
        creep.moveTo(restPoint, { visualizePathStyle: { stroke: "#00C8E180" } });
    }

    public static refillEnergy(creep: Creep): number {
        var structuresEnergy: AnyStructure[] = this.availableEnergyStructures(creep);
        if (structuresEnergy.length > 0) {
            creep.say("🔋");
            var target = structuresEnergy[0];
            if (target.structureType == STRUCTURE_CONTAINER ||
                target.structureType == STRUCTURE_STORAGE) {
                var minValue: number = (creep.store.getFreeCapacity() > target.store[RESOURCE_ENERGY]) ? target.store[RESOURCE_ENERGY] : creep.store.getFreeCapacity();
                if (creep.withdraw(target, RESOURCE_ENERGY, minValue) == ERR_NOT_IN_RANGE)
                    creep.moveTo(target, { visualizePathStyle: { stroke: "#00C8E180" } });
                return OK;
            }
        }
        return ERR_NOT_FOUND;
    }

    public static stockEnergy(creep: Creep): number {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) => {
                return (
                    ((structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) || (
                        structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 500));
            }
        });
        if (!(targets.length > 0)) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: AnyStructure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store.getFreeCapacity() > 0
                    );
                }
            });
        }
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
            }
            return OK;
        } else return ERR_NOT_FOUND;
    }

    public static availableEnergyStructures(creep: Creep): AnyStructure[] {
        return creep.room.find(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) => {
                return (
                    ((structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] > 0)
                );
            }
        });
    }
}
