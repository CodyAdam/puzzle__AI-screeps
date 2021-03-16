import { SpawnManager } from "spawnManager";

export class RoomPainter {
    public static drawAll() {
        for (var spawnName in Memory.spawns) {
            var spawn: StructureSpawn = Game.spawns[spawnName];
            if (spawn) {
                this.drawRoles(spawn);
                this.drawSpawning(spawn);
            }
        }
        for (var roomName in Memory.rooms) {
            var room: Room = Game.rooms[roomName];
            if (room) {
                this.drawSources(room);
            }
        }
    }
    public static drawSources(room: Room) {
        for (var sourceId in room.memory.sources) {
            var sourceMem = room.memory.sources[sourceId];
            var source = Game.getObjectById(sourceMem.id);
            if (source) {
                var icon: string = sourceMem.minersId.length == global.MINER_PER_SOURCE ? "✅" : (sourceMem.minersId.length < global.MINER_PER_SOURCE ? "🟥" : "🟨");
                room.visual.text(
                    "⛏ : " + sourceMem.minersId.length + "/" + global.MINER_PER_SOURCE + icon,
                    source.pos.x - 1,
                    source.pos.y,
                    { align: "right", opacity: 0.8 },
                );
            }
        }
    }

    public static drawSpawning(spawn: StructureSpawn) {
        if (spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                "🛠️" + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                { align: "left", opacity: 0.8 },
            );
        }
    }
    public static drawRoles(spawn: StructureSpawn): void {
        var roles = SpawnManager.roles;
        var targetCount = SpawnManager.targetCount;
        for (var i = 0; i < roles.length; i++) {
            var count: number = _.filter(Game.creeps, (creep) => creep.memory.role == roles[i]).length;
            var icon: string = count == targetCount[i] ? "✅" : (count < targetCount[i] ? "🟥" : "🟨");
            spawn.room.visual.text(
                roles[i] + "  : " + count + "/" + targetCount[i] + " " + icon,
                spawn.pos.x - 2,
                spawn.pos.y + i,
                { align: "right", opacity: 0.3 },
            );
        }
        var count = _.filter(Game.creeps).length
        var icon: string = count == SpawnManager.maxCount ? "✅" : (count < SpawnManager.maxCount ? "🟥" : "🟨");
        spawn.room.visual.text(
            "creeps  : " + count + "/" + SpawnManager.maxCount + " " + icon,
            spawn.pos.x - 2,
            spawn.pos.y + roles.length + 1,
            { align: "right", opacity: 0.3 },
        );
    }
}
