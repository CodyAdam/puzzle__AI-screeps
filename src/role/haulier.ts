import { CreepBehavior } from "./creep";

export class Haulier extends CreepBehavior {
    public static run(creep: Creep) {
        switch (creep.memory.state) {
            case STATE_IDLE:
                if (creep.store.getUsedCapacity() != 0 && this.stockEnergy(creep) != ERR_NOT_FOUND) {
                    creep.memory.state = STATE_HAULING;
                    this.run(creep);
                } else if (creep.store.getFreeCapacity() != 0 && this.getDroppedResource(creep)) {
                    creep.memory.state = STATE_REFILLING;
                    this.run(creep);
                } else this.sleep(creep);
                break;
            case STATE_REFILLING:
                if (creep.store.getFreeCapacity() == 0) { // FULL
                    creep.memory.state = STATE_HAULING;
                    this.run(creep);
                } else { // HAS SOME SLOT FREE
                    var dropped: Resource | null = this.getDroppedResource(creep);
                    if (dropped) // THERE IS THING ON THE GROUND
                    {
                        creep.say("🔍" + dropped.amount);
                        if (creep.pickup(dropped) == ERR_NOT_IN_RANGE)
                            creep.moveTo(dropped, { visualizePathStyle: { stroke: "#ffaa00" } });
                    }
                    else { // NOTHING FOUND
                        creep.memory.state = STATE_HAULING;
                        this.run(creep);
                    }
                }
                break;
            case STATE_HAULING:
                creep.say("🔽" + creep.store.getUsedCapacity());
                if (creep.store.getUsedCapacity() == 0) {
                    creep.memory.state = STATE_IDLE;
                    this.run(creep);
                } else {
                    if (this.stockEnergy(creep) == ERR_NOT_FOUND) {
                        creep.memory.state = STATE_IDLE;
                        this.run(creep);
                    }
                }
                break;
            default:
                console.log(creep.name + " state not found : " + creep.memory.state);
                break;

        }
    }

    public static getDroppedResource(creep: Creep): Resource | null {
        var resource: Resource | null = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: (resource: Resource) => {
                return (
                    resource.amount > 60
                );
            }
        });
        if (resource)
            return resource;
        return null;
    }
}
