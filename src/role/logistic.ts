import { CreepSuper } from "./creepSuper";

export abstract class Logistic extends CreepSuper {
    public static role: CreepRole = ROLE_LOGISTIC;
    public static run(creep: Creep) {
        super.run(creep);
        switch (creep.memory.state) {
            case STATE_IDLE:
                if (creep.room.energyCapacityAvailable == creep.room.energyAvailable)
                    this.sleep(creep);
                else {
                    if (creep.store.getUsedCapacity() != 0) {
                        creep.memory.state = STATE_DEPOSITE;
                        this.run(creep);
                    } else {
                        creep.memory.state = STATE_WITHDRAW;
                        this.run(creep);
                    }
                }
                break;
            case STATE_WITHDRAW:
                if (creep.store.getFreeCapacity() == 0) {
                    creep.memory.state = STATE_DEPOSITE;
                    this.run(creep);
                } else if (this.refillEnergy(creep) == ERR_NOT_FOUND)
                    creep.memory.state = STATE_IDLE;
                break;
            case STATE_DEPOSITE:
                if (creep.room.energyCapacityAvailable == creep.room.energyAvailable) {
                    creep.memory.state = STATE_IDLE;
                    this.run(creep);
                }
                else if (creep.store[RESOURCE_ENERGY] != 0) {
                    this.stockEnergy(creep);
                } else {
                    creep.memory.state = STATE_WITHDRAW;
                    this.run(creep);
                }
                break;
            default:
                console.log(creep.name + " state not found : " + creep.memory.state);
                break;

        }
    }

    public static fillExtensions(creep: Creep) {

    }
}
