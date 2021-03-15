import { CreepBehavior } from "./creep";

export class Miner extends CreepBehavior {
    public static run(creep: Creep) {
        if (!creep.memory.targetId) {
            var sourceId: Id<Source> | null = this.getAvailableSource(creep);
            if (sourceId) {
                var source = Game.getObjectById(sourceId);
                if (source) {
                    creep.memory.targetId = sourceId;
                    source.memory.minersId.push(creep.id);
                    creep.memory.state = STATE_MINING;
                } else
                    creep.memory.state = STATE_IDLE;
            }
        } else {
            switch (creep.memory.state) {
                case STATE_MINING:
                    var source: Source | null = Game.getObjectById(creep.memory.targetId);
                    if (source && creep.harvest(source) == ERR_NOT_IN_RANGE)
                        creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
                    break;
                case STATE_IDLE:
                    creep.memory.state = STATE_MINING;
                    super.sleep(creep);
                    break;
                default:
                    console.log(creep.name + " not found state : " + creep.memory.state);
                    break;
            }
        }
    }

    public static getAvailableSource(creep: Creep): Id<Source> | null {
        for (var sourceIndex in creep.room.memory.sources) {
            var sourceMemory = creep.room.memory.sources[sourceIndex]
            if (sourceMemory.minersId.length < MINER_PER_SOURCE)
                return sourceMemory.id;
        }
        return null;
    }
}
