export class SpawnManager {

    public static roles: string[] = ["miner", "builder", "upgrader", "repairer", "haulier", "claimer"];
    public static targetCount: number[] = [6, 3, 2, 1, 8, 1];
    public static maxCount: number = 25;

    public static spawn(spawn: StructureSpawn): string {
        var output: string = "done : ";
        if (!spawn.spawning && _.size(Game.creeps) < this.maxCount) {
            var role = this.neededRole();
            if (role) {
                var cost: number = 0;
                var bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE]
                switch (role) {
                    case "miner":
                        bodyParts = [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE];
                        output += " miner spawned";
                        cost = 700;
                        break;
                    case "builder":
                        bodyParts = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
                        output += " builder spawned";
                        cost = 800;
                        break;
                    case "upgrader":
                        bodyParts = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                        output += " upgrader spawned";
                        cost = 800;
                        break;
                    case "repairer":
                        bodyParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
                        output += " repairer spawned";
                        cost = 400;
                        break;
                    case "haulier":
                        bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
                        cost = 800;
                        break;
                    case "claimer":
                        bodyParts = [CLAIM, WORK, MOVE, MOVE];
                        cost = 800;
                        break;
                    default:
                        return "role not found";
                }
                if (spawn.room.energyAvailable < cost)
                    return "not enough energy";
                output += role + " spawned";
                var name = role + (Game.time - 26401107);
                spawn.spawnCreep(bodyParts, name, {
                    memory: {
                        target: null,
                        spawn: spawn,
                        role: role,
                        room: spawn.room,
                        state: STATE_IDLE
                    },
                });
                return output
            } else output = "not spawned because : no need new unit"
        } else output = "not spawned because : busy or limit reach";
        return output;
    }

    public static neededRole(): string | null {
        var roles = this.roles;
        var targetCount = this.targetCount;
        for (var i = 0; i < roles.length; i++) {
            var count = _.filter(Game.creeps, (creep) => creep.memory.role == roles[i]).length;
            if (targetCount[i] > count)
                return roles[i];
        }
        return null;
    }
}
