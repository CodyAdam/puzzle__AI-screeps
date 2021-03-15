import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "role/Harvester";
import { Upgrader } from "role/Upgrader";
import { Builder } from "role/Builder";
import { Repairer } from "role/Repairer";
import { memoryManager } from "memoryManager";
import { spawnManager } from "spawnManager";

// Game.memoryManager = memoryManager;

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

    memoryManager.clearCreeps();
    memoryManager.initRoom(Game.rooms["E7N31"]);
    spawnManager.drawSpawning();
    spawnManager.spawnOnAmount(300);
    spawnManager.neededRole();

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
    }
});
