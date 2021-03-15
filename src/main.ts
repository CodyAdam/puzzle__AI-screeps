import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "role/Harvester";
import { Upgrader } from "role/Upgrader";
import { Builder } from "role/Builder";
import { Repairer } from "role/Repairer";
import { MemoryManager } from "memoryManager";
import { SpawnManager } from "spawnManager";
import cmd from "utils/commands";
import { Miner } from "role/miner";

global.cmd = cmd;
global.MINER_PER_SOURCE = 1;

export const loop = ErrorMapper.wrapLoop(() => {
    if (Game.cpu.bucket >= 10000) {
        Game.cpu.generatePixel();
    }

    MemoryManager.removeMissing();
    SpawnManager.drawSpawning();
    SpawnManager.drawRoles();
    SpawnManager.spawnOnAmount(300);

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            Harvester.run(creep);
        }
        if (creep.memory.role == "upgrader") {
            Upgrader.run(creep);
        }
        if (creep.memory.role == "builder") {
            Builder.run(creep);
        }
        if (creep.memory.role == "repairer") {
            Repairer.run(creep);
        }
        if (creep.memory.role == "miner") {
            Miner.run(creep);
        }
    }
});

global.STATE_MINING = "mining";
global.STATE_BUILDING = "building";
global.STATE_UPGRADING = "upgrading";
global.STATE_IDLE = "idle";
global.STATE_HAULING = "hauling";
global.STATE_REPAIRING = "repairing";
global.STATE_REFILLING = "refilling";
