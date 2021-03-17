import { CreepBehavior } from "./creep";

export class Upgrader extends CreepBehavior {
    public static run(creep: Creep) {
        super.run(creep);
        switch (creep.memory.state) {
            case STATE_IDLE:
                if (creep.store.getFreeCapacity() != 0) { // not full
                    if (this.closiestEnergyStructure(creep)) {
                        creep.memory.state = STATE_REFILLING;
                        this.run(creep);
                    } else super.sleep(creep);
                } else { // full
                    var target: StructureController | undefined = creep.room.controller;
                    if (target) { // there is things to do
                        creep.memory.state = STATE_UPGRADING;
                        this.run(creep);
                    } else
                        super.sleep(creep);
                }
                break;
            case STATE_REFILLING:
                if (creep.store.getFreeCapacity() == 0) { // FULL
                    creep.memory.state = STATE_UPGRADING;
                    this.run(creep);
                } else if (super.refillEnergy(creep) == ERR_NOT_FOUND)
                    creep.memory.state = STATE_IDLE;
                break;
            case STATE_UPGRADING:
                if (creep.store.getUsedCapacity() == 0) {
                    creep.memory.state = STATE_IDLE;
                    this.run(creep);
                } else {
                    var target: StructureController | undefined = creep.room.controller;
                    if (target) {
                        if (creep.upgradeController(target) == ERR_NOT_IN_RANGE)
                            creep.moveTo(target);
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
