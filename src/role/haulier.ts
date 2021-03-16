import { CreepBehavior } from "./creep";

export class Haulier extends CreepBehavior {
    public static run(creep: Creep) {
        switch (creep.memory.state) {
            case STATE_IDLE:
                if (creep.store.getUsedCapacity() != 0 && this.stockEnergy(creep) != ERR_NOT_FOUND) { // GO BANK
                    creep.memory.state = STATE_HAULING;
                    this.run(creep);
                } else if (creep.store.getFreeCapacity() != 0 && this.getDroppedResource(creep)) { // THING FOUND
                    creep.memory.state = STATE_REFILLING;
                    this.run(creep);
                } else this.sleep(creep);
                break;
            case STATE_REFILLING:
                if (creep.store.getFreeCapacity() == 0) { // FULL
                    creep.memory.state = STATE_HAULING;
                    this.run(creep);
                } else { // HAS SOME SLOT FREE
                    var dropped: Resource | null;
                    if (creep.memory.target)
                        dropped = Game.getObjectById(creep.memory.target);
                    else
                        dropped = this.getDroppedResource(creep);
                    if (dropped) // THERE IS THING ON THE GROUND
                    {
                        creep.memory.target = dropped.id;
                        creep.say("🔍" + dropped.amount);
                        if (creep.pickup(dropped) == ERR_NOT_IN_RANGE)
                            creep.moveTo(dropped, { visualizePathStyle: { stroke: "#ffaa00" } });
                        else creep.memory.target = null;
                    }
                    else { // NOTHING FOUND
                        creep.memory.target = null;
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
        for (var roomName in Memory.rooms) {
            var room = Game.rooms[roomName];
            if (room) {
                var resources: Resource[] | null = room.find(FIND_DROPPED_RESOURCES, {
                    filter: (resource: Resource) => {
                        var alreadyCollected: number = 0;
                        _.forEach(Game.creeps, (subcreep: Creep) => {
                            if (subcreep.memory.target == resource.id)
                                alreadyCollected += subcreep.store.getFreeCapacity();
                        })
                        return (
                            (resource.amount - alreadyCollected) >= (creep.store.getFreeCapacity() - 100)
                        );
                    }
                });
                if (resources.length) {

                    return resources[0];
                }
            }
        }
        return null;
    }
}
