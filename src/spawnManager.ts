export class spawnManager {

    public static spawn(): void {
        if (!Game.spawns["Spawn1"].spawning && _.size(Game.creeps) < 9) {
            var role = this.neededRole();
            if (role != "fill") {
                var newName = role + Game.time;
                Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE], newName, {
                    memory: {
                        role: role,
                        room: Game.spawns["Spawn1"].room,
                        building: false,
                        working: false,
                        upgrading: false
                    },
                });
            }
        }
    }
    public static spawnOnAmount(amount: number) {
        if (!Game.spawns["Spawn1"].spawning) {
            var isFullEnergy = Game.spawns["Spawn1"].room.energyAvailable >= amount;

            if (isFullEnergy) {
                this.spawn();
            }
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
    public static neededRole(): string {
        var roles = ["harvester", "builder", "upgrader"];
        var targetCount = [4, 4, 2];
        for (var i = 0; i <= roles.length; i++) {
            var count = _.filter(Game.creeps, (creep) => creep.memory.role == roles[i]).length;
            console.log(roles[i] + " " + count + "/" + targetCount[i]);

            if (targetCount[i] > count)
                return roles[i];
        }
        return "fill";
    }
}
