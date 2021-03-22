import { CreepSuper } from "role/creepSuper";
import { Miner } from "role/miner";
import { isOfType } from "utils/helper";

export class MemoryManager {
    public static cleanAllMemory(): ScreepsReturnCode {
        CreepSuper.cleanMemory();
        Miner.cleanMemory();
        return OK;
    }

    public static clearMemory(): ScreepsReturnCode {
        Memory.creeps = {};
        Memory.rooms = {};
        Memory.spawns = {};
        Memory.homes = {};
        Memory.flags = {};
        Memory.powerCreeps = {};
        Memory.log = {};

        return OK;
    }

    public static updatateCreep(creep: Creep): ScreepsReturnCode {
        creep.memory
    }

    public static updateHome(homeMem: HomeMemory): ScreepsReturnCode {
        if (!homeMem || !homeMem.name || !homeMem.roomName || !homeMem.spawns)
            return ERR_INVALID_TARGET;
        homeMem.creeps = _.filter(Game.creeps, creep => creep.memory.homeName === homeMem.name).map(creep => creep.memory);
        Memory.homes[homeMem.name] = homeMem;
        return OK;
    }

    public static updateRoom(roomMem: RoomMemory): ScreepsReturnCode {
        if (!roomMem || !roomMem.name || !roomMem.controller || !roomMem.cord)
            return ERR_INVALID_TARGET;

        const room = Game.rooms[roomMem.name]
        if (!room)
            return ERR_NOT_FOUND;


        const sources: { [id: string]: SourceMemory } = {};
        room.find(FIND_SOURCES).forEach((source) => {
            const miners: Creep[] = _.filter(Game.creeps, (creep: Creep) => {
                return creep.memory.role === "miner" && creep.memory.target && creep.memory.target.id === source.id;
            });
            const minersId: Id<Creep>[] = miners.map((creep: Creep) => {
                return creep.id;
            });
            sources[source.id] = {
                pos: source.pos,
                id: source.id,
                minersId,
            };
        });

        const claimers: Creep[] = _.filter(Game.creeps, (creep: Creep) => {
            return (
                creep.memory.role === "claimer" &&
                creep.memory.target &&
                room.controller &&
                creep.memory.target.id === room.controller.id
            );
        });
        const claimersId: Id<Creep>[] = claimers.map((creep: Creep) => {
            return creep.id;
        });

        // TODO ADD room.memory.creeps
        room.memory.claimers = claimersId;
        room.memory.sources = sources;
        if (room.memory.name) room.memory.name = room.name;
        return OK;
    }

    public static updateSource(sourceMem: SourceMemory): ScreepsReturnCode {

    }

    public static updateController(controllerMem: ControllerMemory): ScreepsReturnCode {
        if (!controllerMem || !controllerMem.id || !controllerMem.pos)
            return ERR_INVALID_TARGET;

        controllerMem.claimers = _.filter(Game.creeps, (creep) => {
            return (
                creep.memory.target &&
                isOfType<Id<StructureController>>(creep.memory.target, creep.memory.target.id) &&
                creep.memory.target.id === controllerMem.id);
        }).map(creep => creep.memory);

        Memory.rooms[controllerMem.pos.roomName].controller = controllerMem;
        return OK;
    }
}
