import { Miner } from "role/miner";
import { MemoryManager } from "../memoryManager";

var cmd = {
    initSpawn: (spawnName: string) => {
        return MemoryManager.updateSpawn(Game.spawns[spawnName]);
    },
    initRoom: (roomName: string) => {
        return MemoryManager.updateRoom(Game.rooms[roomName]);
    },
    spawnCreep: (spawnName: string, role: string, name: string) => {
        var output = "done";
        var bodyParts: BodyPartConstant[] = []
        var cost: number = 0;
        var spawn: StructureSpawn = Game.spawns[spawnName];
        switch (role) {
            case "miner":
                bodyParts = [WORK, WORK, WORK, WORK, WORK, MOVE];
                cost = 550
                break;
            case "claimer":
                bodyParts = [CLAIM, WORK, MOVE, MOVE];
                cost = 800
                break;
            case "builder":
                bodyParts = [WORK, WORK, CARRY, CARRY, MOVE];
                cost = 350
                break;
            case "haulier":
                bodyParts = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                cost = 650
                break;
            default:
                return "role not found";
        }
        if (spawn.room.energyAvailable < cost)
            return "not enough energy";
        output += " " + role + " spawned";
        spawn.spawnCreep(bodyParts, name, {
            memory: {
                target: null,
                spawn: spawn,
                role: role,
                pos: spawn.pos,
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
