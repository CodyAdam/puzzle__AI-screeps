import { B } from "colony/structures/blueprint/B";
import { SpawnManager } from "colony/spawns/spawnManager";

export class RoomPainter {
    public static drawAll(): ScreepsReturnCode {
        for (const spawnName in Memory.spawns) {
            const spawn: StructureSpawn = Game.spawns[spawnName];
            if (spawn) {
                this.drawRoles(spawn);
                this.drawSpawning(spawn);
            }
        }
        for (const roomName in Memory.rooms) {
            const room: Room = Game.rooms[roomName];
            if (room) {
                this.drawSources(room);
            }
        }

        for (const flagName in Game.flags) {
            const flag: Flag = Game.flags[flagName];
            if (flag) {
                const initial: string = flag.name.slice(0, 1);
                if (initial && initial === "B") B.draw(flag);
            }
        }
        return OK;
    }
    public static drawSources(room: Room): ScreepsReturnCode {
        for (const sourceId in room.memory.sources) {
            const sourceMem = room.memory.sources[sourceId];
            const source = Game.getObjectById(sourceMem.id);
            if (source) {
                const icon: string =
                    sourceMem.minersId.length === global.MINER_PER_SOURCE
                        ? "✅"
                        : sourceMem.minersId.length < global.MINER_PER_SOURCE
                            ? "🟥"
                            : "🟨";
                room.visual.text(
                    "⛏ : " + sourceMem.minersId.length.toString() + "/" + global.MINER_PER_SOURCE.toString() + icon,
                    source.pos.x - 1,
                    source.pos.y,
                    { align: "right", opacity: 0.8 },
                );
            }
        }
        return OK;
    }

    public static drawSpawning(spawn: StructureSpawn): ScreepsReturnCode {
        if (spawn.spawning) {
            const spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text("🛠️" + spawningCreep.memory.role, spawn.pos.x + 1, spawn.pos.y, {
                align: "left",
                opacity: 0.8,
            });
        }
        return OK;
    }
    public static drawRoles(spawn: StructureSpawn): ScreepsReturnCode {
        const roles = SpawnManager.roles;
        const targetCount = SpawnManager.targetCount;
        let totalCount = _.filter(Game.creeps).length;
        for (let i = 0; i < roles.length; i++) {
            const count: number = _.filter(Game.creeps, (creep) => {
                return (
                    (creep.memory.role === ROLE_BUILDER && roles[i] === ROLE_UPGRADER) || creep.memory.role === roles[i]
                );
            }).length;
            const icon: string = count === targetCount[i] ? "✅" : count < targetCount[i] ? "🟥" : "🟨";
            spawn.room.visual.text(
                roles[i] + "  : " + count.toString() + "/" + targetCount[i].toString() + " " + icon,
                spawn.pos.x - 2,
                spawn.pos.y + i - 9,
                { align: "right", opacity: 0.3 },
            );
        }
        const totalIcon: string =
            totalCount === SpawnManager.maxCount ? "✅" : totalCount < SpawnManager.maxCount ? "🟥" : "🟨";
        spawn.room.visual.text(
            "creeps  : " + totalCount.toString() + "/" + SpawnManager.maxCount.toString() + " " + totalIcon,
            spawn.pos.x - 2,
            spawn.pos.y + roles.length + 1 - 9,
            { align: "right", opacity: 0.3 },
        );
        return OK;
    }
}
