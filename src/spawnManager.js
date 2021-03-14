var spawnManager = {
    spawn: function () {
        if (!Game.spawns["Spawn1"].spawning) {
            var role = this.neededRole();
            var newName = role + Game.time;
            return Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], newName, {
                memory: { role: role },
            });
        }
    },
    spawnOnAmount: function (amount) {
        if (!Game.spawns["Spawn1"].spawning) {
            var isFullEnergy = Game.spawns["Spawn1"].room.energyAvailable >= amount;

            if (isFullEnergy) {
                this.spawn();
            }
        }
    },
    drawSpawning: function () {
        if (Game.spawns["Spawn1"].spawning) {
            var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
            Game.spawns["Spawn1"].room.visual.text(
                "🛠️" + spawningCreep.memory.role,
                Game.spawns["Spawn1"].pos.x + 1,
                Game.spawns["Spawn1"].pos.y,
                { align: "left", opacity: 0.8 },
            );
        }
    },
    neededRole: function () {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester");
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader");
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");

        var roles = ["harvester", "upgrader", "builder"];

        needed = null;
        min = 0;
        roles.forEach((role) => {
            count = _.filter(Game.creeps, (creep) => creep.memory.role == role).length;
            if (needed == null || min > count) {
                needed = role;
                min = count;
            }
        });
        return needed;
    },
};

module.exports = spawnManager;
