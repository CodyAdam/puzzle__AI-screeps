import { MemoryManager } from "../memoryManager";

var cmd = {
    initSpawn: (spawnName: string) => {
        return MemoryManager.initSpawn(Game.spawns[spawnName]);
    },
    clearMemory: () => {
        return MemoryManager.clearMemory();
    }
}

export default cmd;
