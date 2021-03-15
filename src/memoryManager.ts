
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
            room.memory.sources.forEach(source => {
                source.miners.forEach((creep, i) => {
                    if (creep) {
                        delete source.miners[i];
                    }
                })
            });
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
            output = "overrided"
        }
        spawn.memory.gameObject = spawn;
        spawn.memory.creeps = _.filter(Game.creeps, (creep) => { return (creep.memory.spawn == spawn); })
        return output;
    }


    public static initRoom(room: Room): string {
        var output = "done";
        if (Memory.spawns[room.name]) {
            delete Memory.spawns[room.name];
            output = "overrided"
        }
        var sources = room.find(FIND_SOURCES);
        var arr: SourceMemory[] = [];
        sources.forEach(source => {
            var sourceMemory: SourceMemory = {
                gameObject: source,
                miners: []
            };
            arr.push(sourceMemory);
        });
        room.memory.sources = arr;
        room.memory.gameObject = room;
        return output;
    }
}
