export abstract class CreepSuper {
    abstract role: CreepRole;

    public static run(creep: Creep): ScreepsReturnCode {
        const creepMem: CreepMemory = creep.memory;
        creepMem.pos = creep.pos;
        creep.memory = creepMem;
        return OK;
    }
    public static sleep(creep: Creep): ScreepsReturnCode {
        const restPoint = Game.flags.rest;
        if (restPoint) {
            creep.say("💤");
            creep.moveTo(restPoint.pos, { visualizePathStyle: { stroke: "#00C8E180" } });
            return OK;
        }
        return ERR_NOT_FOUND;
    }

    public static cleanMemory(): ScreepsReturnCode {
        // Automatically delete memory of missing creeps
        for (const creepName in Memory.creeps) {
            if (!Game.creeps[creepName]) {
                delete Memory.creeps[creepName];
            }
        }
        return OK;
    }

    public static refillEnergy(creep: Creep): ScreepsReturnCode {
        const target: StructureContainer | StructureStorage | Ruin | Tombstone | null = this.closiestEnergyStructure(
            creep,
        );
        if (target && target.store) {
            creep.say("🔋");
            const minValue: number =
                creep.store.getFreeCapacity() > target.store[RESOURCE_ENERGY]
                    ? target.store[RESOURCE_ENERGY]
                    : creep.store.getFreeCapacity();
            if (creep.withdraw(target, RESOURCE_ENERGY, minValue) === ERR_NOT_IN_RANGE)
                creep.moveTo(target, { visualizePathStyle: { stroke: "#00C8E180" } });
            return OK;
        }
        return ERR_NOT_FOUND;
    }

    public static stockEnergy(creep: Creep): ScreepsReturnCode {
        let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) => {
                return structure.structureType === STRUCTURE_STORAGE && structure.store.getFreeCapacity() > 0;
            },
        });
        if (!Game.creeps[ROLE_LOGISTIC + " Scala"]) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: AnyStructure) => {
                    return (
                        ((structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                            structure.my) ||
                        (structure.structureType === STRUCTURE_TOWER &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 500)
                    );
                },
            });
        }
        if (targets.length > 0) {
            targets = _.sortBy(targets, (structure: AnyStructure) => {
                return creep.pos.findPathTo(structure).length;
            });
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                return creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
            }
            return OK;
        } else return ERR_NOT_FOUND;
    }

    public static closiestEnergyStructure(
        creep: Creep,
    ): StructureContainer | StructureStorage | Ruin | Tombstone | null {
        const storables: AnyStructure[] | null = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) => {
                return structure.structureType === STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 0;
            },
        });
        const ruins: Ruin[] | null = creep.room.find(FIND_RUINS, {
            filter: (ruin: Ruin) => {
                return ruin.store[RESOURCE_ENERGY] > 0;
            },
        });
        const tombstones: Tombstone[] | null = creep.room.find(FIND_TOMBSTONES, {
            filter: (tombstone: Tombstone) => {
                return tombstone.store[RESOURCE_ENERGY] > 0;
            },
        });

        const targets = tombstones.length
            ? _.sortBy(tombstones, (structure: RoomObject) => {
                return creep.pos.findPathTo(structure).length;
            })
            : ruins.length
                ? _.sortBy(ruins, (structure: RoomObject) => {
                    return creep.pos.findPathTo(structure).length;
                })
                : _.sortBy(storables, (structure: RoomObject) => {
                    return creep.pos.findPathTo(structure).length;
                });
        if (
            targets &&
            (targets[0] instanceof StructureContainer ||
                targets[0] instanceof StructureStorage ||
                targets[0] instanceof Ruin ||
                targets[0] instanceof Tombstone)
        ) {
            return targets[0];
        } else return null;
    }
}
