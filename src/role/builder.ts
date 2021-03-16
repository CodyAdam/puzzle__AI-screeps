import { CreepBehavior } from "./creep";

export class Builder extends CreepBehavior {
    public static run(creep: Creep) {
        switch (creep.memory.state) {
            case STATE_IDLE:
                if (creep.store.getUsedCapacity() == 0) { // Empty
                    if (this.availableEnergyStructures(creep).length > 0) {
                        creep.memory.state = STATE_REFILLING;
                        this.run(creep);
                    } else super.sleep(creep);
                } else { // has energy
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (targets.length) { // there is things to do
                        creep.memory.state = STATE_BUILDING;
                        this.run(creep);
                    } else  // nothing to do
                        super.sleep(creep);
                }
                break;
            case STATE_REFILLING:
                if (creep.store.getFreeCapacity() == 0) {
                    creep.memory.state = STATE_BUILDING;
                    this.run(creep);
                } else if (super.refillEnergy(creep) == ERR_NOT_FOUND)
                    creep.memory.state = STATE_IDLE;
                break;
            case STATE_BUILDING:
                if (creep.store.energy == 0) {
                    creep.memory.state = STATE_REFILLING;
                    this.run(creep);
                } else {
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (targets.length) {
                        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffaa00" } });
                        }
                    } else {
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
}
