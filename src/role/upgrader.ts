import { Builder } from "./Builder";
import { CreepSuper } from "./creepSuper";

export abstract class Upgrader extends CreepSuper {
    public static role: CreepRole = ROLE_UPGRADER;
    public static run(creep: Creep) {
        if (Builder.getConstructionSite(creep)) {
            creep.memory.role = "builder";
            return;
        }
        super.run(creep);
        switch (creep.memory.state) {
            case STATE_IDLE:
                if (creep.store.getFreeCapacity() != 0) { // not full
                    if (this.closiestEnergyStructure(creep)) {
                        creep.memory.state = STATE_WITHDRAW;
                        this.run(creep);
                    } else super.sleep(creep);
                } else { // full
                    var target: StructureController | undefined = creep.room.controller;
                    if (target && creep.room.name == creep.memory.spawn.room.name) { // there is things to do
                        creep.memory.state = STATE_UPGRADING;
                        this.run(creep);
                    } else
                        super.sleep(creep);
                }
                break;
            case STATE_WITHDRAW:
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
                    if (target && creep.room.name == creep.memory.spawn.room.name) {
                        if (creep.upgradeController(target) == ERR_NOT_IN_RANGE)
                            creep.moveTo(target);
                    } else {
                        creep.memory.state = STATE_IDLE;
                        this.run(creep);
                    }
                }
                break;
            case STATE_BUILDING:
                creep.memory.state = STATE_UPGRADING;
                this.run(creep);
                break;
            default:
                console.log(creep.name + " state not found : " + creep.memory.state);
                break;
        }
    }
}
