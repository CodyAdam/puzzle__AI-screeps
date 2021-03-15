export class SpawnManager {

    private static roles: string[] = ["harvester", "builder", "upgrader", "repairer"];
    private static targetCount: number[] = [3, 4, 1, 1];
    private static maxCount: number = 9;

    public static spawn(): void {
        if (!Game.spawns["Spawn1"].spawning && _.size(Game.creeps) < this.maxCount) {
            var role = this.neededRole();
            if (role != "fill") {
                var newName = role + (Game.time - 26385007);
                var spawn = Game.spawns["Spawn1"];
                spawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, {
                    memory: {
                        target: null,
                        spawn: spawn,
                        role: role,
                        room: Game.spawns["Spawn1"].room,
                        state: STATE_IDLE
                    },
                });
            }
        }
    }
    public static spawnOnAmount(amount: number) {
        if (!Game.spawns["Spawn1"].spawning && Game.spawns["Spawn1"].room.energyAvailable >= amount) {
            this.spawn();
        }
    }
    public static drawSpawning() {
        if (Game.spawns["Spawn1"].spawning) {
            var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
            Game.spawns["Spawn1"].room.visual.text(
                "🛠️" + spawningCreep.memory.role,
                Game.spawns["Spawn1"].pos.x + 1,
                Game.spawns["Spawn1"].pos.y,
                { align: "left", opacity: 0.8 },
            );
        }
    }
    public static drawRoles(): void {
        var roles = this.roles;
        var targetCount = this.targetCount;
        for (var i = 0; i < roles.length; i++) {
            var count: number = _.filter(Game.creeps, (creep) => creep.memory.role == roles[i]).length;
            var icon: string = count == targetCount[i] ? "✅" : (count < targetCount[i] ? "🟥" : "🟨");
            Game.spawns["Spawn1"].room.visual.text(
                roles[i] + "  : " + count + "/" + targetCount[i] + " " + icon,
                Game.spawns["Spawn1"].pos.x - 3,
                Game.spawns["Spawn1"].pos.y + i,
                { align: "right", opacity: 0.5 },
            );
        }
        var count = _.filter(Game.creeps).length
        var icon: string = count == this.maxCount ? "✅" : (count < this.maxCount ? "🟥" : "🟨");
        Game.spawns["Spawn1"].room.visual.text(
            "creeps  : " + count + "/" + this.maxCount + " " + icon,
            Game.spawns["Spawn1"].pos.x - 3,
            Game.spawns["Spawn1"].pos.y + roles.length + 1,
            { align: "right", opacity: 0.8 },
        );
    }
    public static neededRole(): string {
        var roles = this.roles;
        var targetCount = this.targetCount;
        for (var i = 0; i < roles.length; i++) {
            var count = _.filter(Game.creeps, (creep) => creep.memory.role == roles[i]).length;
            if (targetCount[i] > count)
                return roles[i];
        }
        return roles[1];
    }
}
