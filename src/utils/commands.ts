import { MemoryManager } from "../memoryManager";

const cmd = {
    initSpawn: (spawnName: string): ScreepsReturnCode => {
        return MemoryManager.updateSpawn(Game.spawns[spawnName]);
    },
    initRoom: (roomName: string): ScreepsReturnCode => {
        return MemoryManager.updateRoom(Game.rooms[roomName]);
    },
    spawnCreep: (spawnName: string, role: string, name: string): ScreepsReturnCode => {
        let bodyParts: BodyPartConstant[] = [];
        let cost = 0;
        const spawn: StructureSpawn = Game.spawns[spawnName];
        switch (role) {
            case "miner":
                bodyParts = [WORK, WORK, WORK, WORK, WORK, MOVE];
                cost = 550;
                break;
            case "claimer":
                bodyParts = [CLAIM, WORK, MOVE, MOVE];
                cost = 800;
                break;
            case "harvester":
                bodyParts = [WORK, CARRY, MOVE];
                cost = 200;
                break;
            case "builder":
                bodyParts = [WORK, WORK, CARRY, CARRY, MOVE];
                cost = 350;
                break;
            case ROLE_LOGISTIC:
                bodyParts = [CARRY, CARRY, MOVE, MOVE];
                cost = 200;
                break;
            case "haulier":
                bodyParts = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                cost = 650;
                break;
            default:
                return ERR_NOT_FOUND;
        }
        if (spawn.room.energyAvailable < cost) return ERR_NOT_ENOUGH_ENERGY;
        return spawn.spawnCreep(bodyParts, name, {
            memory: {
                target: null,
                spawn,
                role,
                pos: spawn.pos,
                state: STATE_IDLE,
            },
        });
    },
    showRooms: (): ScreepsReturnCode => {
        for (const room in Game.rooms) {
            console.log(Game.rooms[room]);
        }
        return OK;
    },
    clearMemory: (): ScreepsReturnCode => {
        return MemoryManager.cleanAllMemory();
    },
};

export default cmd;
