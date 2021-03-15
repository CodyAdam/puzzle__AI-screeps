import { MemoryManager } from "../memoryManager";

var cmd = {
    initSpawn: (spawnName: string) => {
        return MemoryManager.initSpawn(Game.spawns[spawnName]);
    },
    initRoom: (roomName: string) => {
        return MemoryManager.initRoom(Game.rooms[roomName]);
    },
    spawnCreep: (spawnName: string, role: string, name: string) => {
        var output = "done";
        var bodyParts: BodyPartConstant[] = []
        var spawn: StructureSpawn = Game.spawns[spawnName];
        switch (role) {
            case "miner":
                bodyParts = [WORK, WORK, WORK, WORK, WORK, MOVE];
                output += " miner spawned";
                if (spawn.room.energyAvailable < 550)
                    return "not enough energy";
                break;
            case "builder":
                bodyParts = [WORK, WORK, CARRY, CARRY, MOVE];
                output += " miner spawned";
                if (spawn.room.energyAvailable < 350)
                    return "not enough energy";
                break;
            default:
                return "role not found";
        }

        spawn.spawnCreep(bodyParts, name, {
            memory: {
                targetId: null,
                spawn: spawn,
                role: role,
                room: spawn.room,
                state: STATE_IDLE
            },
        });
        return output;
    },
    showRooms: () => {
        for (var room in Game.rooms) {
            console.log(Game.rooms[room]);
        }
    },
    clearMemory: () => {
        return MemoryManager.clearMemory();
    }
}

export default cmd;
