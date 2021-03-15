
export class MemoryManager {

    public static removeMissing() {
        // Automatically delete memory of missing creeps
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

        // for (var name in Memory.rooms) {
        //     var room = Game.rooms[name];
        //     room.memory.sources.forEach(source => {
        //         source.minersId.forEach((creepId, i) => {
        //             if (Game.getObjectById(creepId)) {
        //                 delete source.minersId[i];
        //             }
        //         })
        //     });
        // }
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

        var sourcesMemory: SourceMemory[] = [];
        room.find(FIND_SOURCES).forEach(source => {
            var sourceMemory: SourceMemory = {
                id: source.id,
                minersId: []
            };
            sourcesMemory.push(sourceMemory);
        });

        room.memory.sources = sourcesMemory;
        room.memory.name = room.name;
        return output;
    }
}
