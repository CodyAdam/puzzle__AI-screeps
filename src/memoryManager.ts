
export class MemoryManager {

    public static removeMissing() {
        // Automatically delete memory of missing creeps
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

        for (var name in Memory.rooms) {
            var room = Game.rooms[name];
            if (room) {
                for (var sourceId in room.memory.sources) {
                    var sourceMem = room.memory.sources[sourceId];
                    sourceMem.minersId = _.filter(sourceMem.minersId, (id) => {
                        var creep: Creep | null = Game.getObjectById(id)
                        return (
                            creep != null
                        );
                    })
                }
            }
        }
    }

    public static clearMemory() {
        Memory.creeps = {}
        Memory.rooms = {}
        Memory.spawns = {}
        Memory.flags = {}
        Memory.powerCreeps = {}
        Memory.log = {}
    }

    public static updateSpawn(spawn: StructureSpawn): string {
        var output = "done";
        if (Memory.spawns[spawn.name]) {
            delete Memory.spawns[spawn.name];
            output = "overrided spawn : " + spawn.name;
        }
        spawn.memory.creepsId = _.filter(Game.creeps, (creep) => { return (creep.memory.spawn == spawn); }).map(creep => { return (creep.id); })
        return output;
    }


    public static updateRoom(room: Room): string {
        var output = "done";
        if (Memory.spawns[room.name]) {
            delete Memory.spawns[room.name];
            output = "overrided room : " + room.name
        }

        var sourcesMemory: {
            [id: string]: SourceMemory;
        } = {};
        room.find(FIND_SOURCES).forEach(source => {
            var miners: Creep[] = _.filter(Game.creeps, (creep: Creep) => {
                return (
                    creep.memory.role == "miner" &&
                    creep.memory.target &&
                    creep.memory.target.id == source.id
                );
            });
            var minersId: Id<Creep>[] = miners.map((creep: Creep) => { return (creep.id); });
            sourcesMemory[source.id] = {
                pos: source.pos,
                id: source.id,
                minersId: minersId
            }
        });


        var claimers: Creep[] = _.filter(Game.creeps, (creep: Creep) => {
            return (
                creep.memory.role == "claimer" &&
                creep.memory.target &&
                room.controller &&
                creep.memory.target.id == room.controller.id
            );
        });
        var claimersId: Id<Creep>[] = claimers.map((creep: Creep) => { return (creep.id); });

        // TODO ADD room.memory.creeps
        room.memory.claimers = claimersId;
        room.memory.sources = sourcesMemory;
        room.memory.name = room.name;
        return output;
    }
}
