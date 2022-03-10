import { CreepSuper } from "../creepSuper";

export abstract class Logistic extends CreepSuper {
    public static role: CreepRole = ROLE_LOGISTIC;
    public static run(creep: Creep): ScreepsReturnCode {
        super.run(creep);
        switch (creep.memory.state) {
            case STATE_IDLE:
                if (creep.room.energyCapacityAvailable === creep.room.energyAvailable) {
                    const flag: Flag | null = Game.flags.B1;
                    if (flag) creep.moveTo(flag);
                } else {
                    if (creep.store.getUsedCapacity() !== 0) {
                        creep.memory.state = STATE_DEPOSITE;
                        this.run(creep);
                    } else {
                        creep.memory.state = STATE_WITHDRAW;
                        this.run(creep);
                    }
                }
                break;
            case STATE_WITHDRAW:
                if (creep.store.getFreeCapacity() === 0) {
                    creep.memory.state = STATE_DEPOSITE;
                    this.run(creep);
                } else if (this.refillEnergy(creep) === ERR_NOT_FOUND) creep.memory.state = STATE_IDLE;
                break;
            case STATE_DEPOSITE:
                if (creep.room.energyCapacityAvailable === creep.room.energyAvailable) {
                    creep.memory.state = STATE_IDLE;
                    this.run(creep);
                } else if (creep.store[RESOURCE_ENERGY] !== 0) {
                    this.fillExtensions(creep);
                } else {
                    creep.memory.state = STATE_WITHDRAW;
                    this.run(creep);
                }
                break;
            default:
                console.log(creep.name + " state not found : " + creep.memory.state);
                break;
        }
        return OK;
    }

    public static fillExtensions(creep: Creep): ScreepsReturnCode {
        let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) => {
                return (
                    ((structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                        structure.my) ||
                    (structure.structureType === STRUCTURE_TOWER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 500)
                );
            },
        });
        if (!targets.length) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: AnyStructure) => {
                    return structure.structureType === STRUCTURE_STORAGE && structure.store.getFreeCapacity() > 0;
                },
            });
        }
        if (targets.length > 0) {
            targets = _.sortBy(targets, (structure: AnyStructure) => {
                return creep.pos.findPathTo(structure).length;
            });
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
            }
            return OK;
        } else return ERR_NOT_FOUND;
    }
}
