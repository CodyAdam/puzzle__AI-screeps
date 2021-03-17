import { CreepBehavior } from "./creep";

export class Builder extends CreepBehavior {
    public static run(creep: Creep) {
        switch (creep.memory.state) {
            case STATE_IDLE:
                if (creep.store.getUsedCapacity() == 0) { // Empty
                    if (this.closiestEnergyStructure(creep)) {
                        creep.memory.state = STATE_REFILLING;
                        this.run(creep);
                    } else super.sleep(creep);
                } else { // has energy
                    var targets: ConstructionSite<BuildableStructureConstant> | null = this.getConstructionSite(creep);
                    if (targets) { // there is things to do
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
                    var target: ConstructionSite<BuildableStructureConstant> | null = this.getConstructionSite(creep);
                    if (target) {
                        if (creep.build(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: "#ffaa00" } });
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

    public static getConstructionSite(creep: Creep): ConstructionSite<BuildableStructureConstant> | null {
        for (var roomName in Memory.rooms) {
            var room: Room = Game.rooms[roomName]
            if (room) {
                var targets: ConstructionSite<BuildableStructureConstant>[] | null = room.find(FIND_CONSTRUCTION_SITES)
                if (targets.length)
                    return targets[0];
            }
        } return null;
    }
}
