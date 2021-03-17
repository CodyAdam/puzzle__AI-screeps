export class CreepBehavior {
    public static run(creep: Creep) {
        let creepMem: CreepMemory = creep.memory;
        creepMem.pos = creep.pos;
        creep.memory = creepMem;
    }
    public static sleep(creep: Creep): void {
        var restPoint = Game.flags["rest"].pos;
        creep.say("💤");
        creep.moveTo(restPoint, { visualizePathStyle: { stroke: "#00C8E180" } });
    }

    public static refillEnergy(creep: Creep): number {
        let target: StructureContainer | StructureStorage | Ruin | Tombstone | null = this.closiestEnergyStructure(creep);
        if (target && target.store) {
            creep.say("🔋");
            var minValue: number = (creep.store.getFreeCapacity() > target.store[RESOURCE_ENERGY]) ? target.store[RESOURCE_ENERGY] : creep.store.getFreeCapacity();
            if (creep.withdraw(target, RESOURCE_ENERGY, minValue) == ERR_NOT_IN_RANGE)
                creep.moveTo(target, { visualizePathStyle: { stroke: "#00C8E180" } });
            return OK;
        }
        return ERR_NOT_FOUND;
    }

    public static stockEnergy(creep: Creep): number {

        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) => {
                return (
                    ((structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                        structure.my) || (
                        structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 500));
            }
        });
        if (!(targets.length)) {
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
            targets = _.sortBy(targets, (structure: AnyStructure) => { return (creep.pos.findPathTo(structure).length); })
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
            }
            return OK;
        } else return ERR_NOT_FOUND;
    }

    public static closiestEnergyStructure(creep: Creep): StructureContainer | StructureStorage | Ruin | Tombstone | null {
        let targets: AnyStructure[] | null = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) => {
                return (
                    ((structure instanceof StructureContainer ||
                        structure instanceof StructureStorage || structure instanceof Ruin || structure instanceof Tombstone) &&
                        structure.store[RESOURCE_ENERGY] > 0)
                );
            }
        });
        targets = _.sortBy(targets, (structure: AnyStructure) => { return (creep.pos.findPathTo(structure).length); })
        if (targets && (targets[0] instanceof StructureContainer ||
            targets[0] instanceof StructureStorage || targets[0] instanceof Ruin || targets[0] instanceof Tombstone)) {
            return targets[0];
        } else return null;
    }
}
