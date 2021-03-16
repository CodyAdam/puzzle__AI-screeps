
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
            for (var sourceId in room.memory.sources) {
                var sourceMem = room.memory.sources[sourceId];
                sourceMem.minersId = _.filter(sourceMem.minersId, (id) => {
                    var miner: Creep | null = Game.getObjectById(id)
                    return (
                        miner != null && miner.memory.targetId == sourceMem.id
                    );
                })
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

    public static initSpawn(spawn: StructureSpawn): string {
        var output = "done";
        if (Memory.spawns[spawn.name]) {
            delete Memory.spawns[spawn.name];
            output = "overrided spawn : " + spawn.name;
        }
        spawn.memory.creepsId = _.filter(Game.creeps, (creep) => { return (creep.memory.spawn == spawn); }).map(creep => { return (creep.id); })
        return output;
    }


    public static initRoom(room: Room): string {
        var output = "done";
        if (Memory.spawns[room.name]) {
            delete Memory.spawns[room.name];
            output = "overrided room : " + room.name
        }

        var sourcesMemory: {
            [id: string]: SourceMemory;
        } = {};
        room.find(FIND_SOURCES).forEach(source => {
            sourcesMemory[source.id] = {
                id: source.id,
                minersId: [] // TODO ADD CREEPS WITH REF
            }
        });

        // TODO ADD room.memory.creeps
        room.memory.sources = sourcesMemory;
        room.memory.name = room.name;
        return output;
    }
}
