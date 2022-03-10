import { CreepSuper } from "colony/creeps/creepSuper";
import { Miner } from "colony/creeps/roles/miner";

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
        Memory.flags = {};
        Memory.powerCreeps = {};
        Memory.log = {};

        return OK;
    }

    public static updateSpawn(spawn: StructureSpawn): ScreepsReturnCode {
        if (Memory.spawns[spawn.name]) {
            delete Memory.spawns[spawn.name];
        }
        spawn.memory.creepsId = _.filter(Game.creeps, (creep) => {
            return creep.memory.spawn === spawn;
        }).map((creep) => {
            return creep.id;
        });
        return OK;
    }

    public static updateRoom(room: Room): ScreepsReturnCode {
        if (Memory.spawns[room.name]) {
            delete Memory.spawns[room.name];
        }

        const sourcesMemory: {
            [id: string]: SourceMemory;
        } = {};
        room.find(FIND_SOURCES).forEach((source) => {
            const miners: Creep[] = _.filter(Game.creeps, (creep: Creep) => {
                return creep.memory.role === "poly" && creep.memory.focus && creep.memory.focus.id === source.id;
            });
            const minersId: Id<Creep>[] = miners.map((creep: Creep) => {
                return creep.id;
            });
            sourcesMemory[source.id] = {
                pos: source.pos,
                id: source.id,
                minersId,
            };
        });

        const claimers: Creep[] = _.filter(Game.creeps, (creep: Creep) => {
            return (
                creep.memory.role === "claimer" &&
                creep.memory.focus &&
                room.controller &&
                creep.memory.focus.id === room.controller.id
            );
        });
        const claimersId: Id<Creep>[] = claimers.map((creep: Creep) => {
            return creep.id;
        });

        // TODO ADD room.memory.creeps
        room.memory.claimers = claimersId;
        room.memory.sources = sourcesMemory;
        room.memory.name = room.name;
        return OK;
    }
}
