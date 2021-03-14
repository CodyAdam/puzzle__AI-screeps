import { ErrorMapper } from "utils/ErrorMapper";
import { roleHarvester } from "role/harvester";
import { roleUpgrader } from "role/upgrader";
import { roleBuilder } from "role/builder";
import { memoryManager } from "memoryManager";
import { spawnManager } from "spawnManager";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    //console.log(`Current game tick is ${Game.time}`);

    memoryManager.clearCreeps();
    spawnManager.drawSpawning();
    spawnManager.spawnOnAmount(300);

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == "upgrader") {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == "builder") {
            roleBuilder.run(creep);
        }
    }
});
