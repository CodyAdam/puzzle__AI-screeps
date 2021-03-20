import { CreepSuper } from "./creepSuper";

export abstract class Harvester extends CreepSuper {
    public static role: CreepRole = ROLE_HARVESTER;
    public static run(creep: Creep): ScreepsReturnCode {
        super.run(creep);
        if (creep.store.getFreeCapacity() > 0) {
            // HARVEST
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: "#ffaa00" } });
            }
        } else {
            // TRANSFER
            if (this.stockEnergy(creep) === ERR_NOT_FOUND) this.sleep(creep);
        }
        return OK;
    }
}
