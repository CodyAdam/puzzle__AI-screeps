import { find } from "lodash";

export class memoryManager {

    public static clearCreeps() {
        // Automatically delete memory of missing creeps
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }

    public static initRoom(room: Room): void {
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
    }
}
