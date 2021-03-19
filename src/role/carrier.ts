import { CreepSuper } from "./creepSuper";

export abstract class Carrier extends CreepSuper {
    public static role: CreepRole = ROLE_CARRIER;
    public static run(creep: Creep): ScreepsReturnCode {
        super.run(creep);
        switch (creep.memory.state) {
            case STATE_IDLE:
                if (creep.store.getUsedCapacity() !== 0 && this.stockEnergy(creep) !== ERR_NOT_FOUND) {
                    // GO BANK
                    creep.memory.state = STATE_DEPOSITE;
                    this.run(creep);
                } else if (
                    creep.store.getFreeCapacity() !== 0 &&
                    (this.getDroppedResource(creep) || this.getContainer(creep))
                ) {
                    // THING FOUND
                    creep.memory.state = STATE_WITHDRAW;
                    this.run(creep);
                } else this.sleep(creep);
                break;
            case STATE_WITHDRAW:
                if (creep.store.getFreeCapacity() === 0) {
                    // FULL
                    creep.memory.state = STATE_DEPOSITE;
                    this.run(creep);
                } else {
                    // HAS SOME SLOT FREE
                    let target: Resource | StructureContainer | null;
                    if (creep.memory.target) target = Game.getObjectById(creep.memory.target);
                    else {
                        const dropped: Resource | null = this.getDroppedResource(creep);
                        const container: StructureContainer | null = this.getContainer(creep);
                        if (dropped && container) {
                            target =
                                creep.pos.findPathTo(dropped).length < creep.pos.findPathTo(container).length
                                    ? dropped
                                    : container;
                            target = dropped;
                        } else target = container;
                    }
                    if (target) {
                        // THERE IS THING ON THE GROUND
                        creep.memory.target = target.id;
                        if (target instanceof StructureContainer) {
                            creep.say("📦" + target.store.getUsedCapacity().toString());
                            const minValue: number =
                                creep.store.getFreeCapacity() > target.store[RESOURCE_ENERGY]
                                    ? target.store[RESOURCE_ENERGY]
                                    : creep.store.getFreeCapacity();
                            if (creep.withdraw(target, RESOURCE_ENERGY, minValue) === ERR_NOT_IN_RANGE)
                                creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
                            else creep.memory.target = null;
                        } else {
                            creep.say("🔍" + target.amount.toString());
                            if (creep.pickup(target) === ERR_NOT_IN_RANGE)
                                creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
                            else creep.memory.target = null;
                        }
                    } else {
                        // NOTHING FOUND
                        creep.memory.target = null;
                        creep.memory.state = STATE_DEPOSITE;
                        this.run(creep);
                    }
                }
                break;
            case STATE_DEPOSITE:
                creep.say("🔽" + creep.store.getUsedCapacity().toString());
                if (creep.store.getUsedCapacity() === 0) {
                    creep.memory.state = STATE_IDLE;
                    this.run(creep);
                } else {
                    if (this.stockEnergy(creep) === ERR_NOT_FOUND) {
                        creep.memory.state = STATE_IDLE;
                        this.run(creep);
                    }
                }
                break;
            default:
                console.log(creep.name + " state not found : " + creep.memory.state);
                break;
        }
        return OK;
    }

    public static getDroppedResource(creep: Creep): Resource | null {
        for (const roomName in Memory.rooms) {
            const room = Game.rooms[roomName];
            if (room) {
                const resources: Resource[] | null = room.find(FIND_DROPPED_RESOURCES, {
                    filter: (resource: Resource) => {
                        let alreadyCollected = 0;
                        _.forEach(Game.creeps, (subcreep: Creep) => {
                            if (subcreep.memory.target === resource.id)
                                alreadyCollected += subcreep.store.getFreeCapacity();
                        });
                        return resource.amount - alreadyCollected >= creep.store.getFreeCapacity() - 100;
                    },
                });
                if (resources.length) {
                    return resources[0];
                }
            }
        }
        return null;
    }

    public static getContainer(creep: Creep): StructureContainer | null {
        const containers: AnyStructure[] | null = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) => {
                if (structure.structureType === STRUCTURE_CONTAINER) {
                    let alreadyCollected = 0;
                    _.forEach(Game.creeps, (subcreep: Creep) => {
                        if (subcreep.memory.target === structure.id)
                            alreadyCollected += subcreep.store.getFreeCapacity();
                    });
                    return structure.store.getUsedCapacity() - alreadyCollected >= creep.store.getFreeCapacity() - 100;
                } else return false;
            },
        });

        const targets = _.sortBy(containers, (structure: RoomObject) => {
            return creep.pos.findPathTo(structure).length;
        });
        if (targets && targets[0] instanceof StructureContainer) {
            return targets[0];
        } else return null;
    }
}
