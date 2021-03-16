import { Miner } from "role/miner";
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
                output += " builder spawned";
                if (spawn.room.energyAvailable < 350)
                    return "not enough energy";
                break;
            case "haulier":
                bodyParts = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                output += " haulier spawned";
                if (spawn.room.energyAvailable < 400)
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
    ,
    getAvailableSource: (room: Room) => {
        var sourceId: Id<Source> | null = Miner.getAvailableSource(room);
        if (sourceId) {
            console.log(Game.getObjectById(sourceId));
        }
    }
}

export default cmd;
