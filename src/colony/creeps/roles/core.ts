import { CreepSuper } from "../creepSuper";

export abstract class Core extends CreepSuper {
    public static run(creep: Creep): ScreepsReturnCode {
        this.sleep(creep);
        return OK;
    }
}
