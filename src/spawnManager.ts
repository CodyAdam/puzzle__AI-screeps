export class spawnManager {

    private static roles: string[] = ["harvester", "builder", "upgrader", "repairer"];
    private static targetCount: number[] = [3, 4, 1, 1];

    public static spawn(): void {
        if (!Game.spawns["Spawn1"].spawning && _.size(Game.creeps) < 9) {
            var role = this.neededRole();
            if (role != "fill") {
                var newName = role + (Game.time - 26385007);
                Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, {
                    memory: {
                        role: role,
                        room: Game.spawns["Spawn1"].room,
                        building: false,
                        working: false,
                        upgrading: false,
                        repairing: false,
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
