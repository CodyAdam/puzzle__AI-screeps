
export class SpawnManager {
    public static roles: string[] = [ROLE_POLY, ROLE_CARRIER];
    public static targetCount: number[] = [10, 0];
    public static maxCount = 30;

    public static spawn(spawn: StructureSpawn): string {
        let output = "done : ";
        if (!spawn.spawning && _.size(Game.creeps) < this.maxCount) {
            const role: string | null = this.neededRole();
            if (role) {
                let bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];
                switch (role) {
                    case ROLE_POLY:
                        bodyParts = [WORK, WORK, WORK, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE];
                        break;
                    case ROLE_MINER:
                        bodyParts = [WORK, WORK, MOVE];
                        break;
                    case ROLE_HARVESTER:
                        bodyParts = [WORK, CARRY, MOVE];
                        break;
                    case ROLE_UPGRADER:
                        bodyParts = [
                            WORK,
                            CARRY,
                            MOVE,
                        ];
                        break;
                    case ROLE_REPAIRER:
                        bodyParts = [
                            WORK,
                            CARRY,
                            MOVE,
                        ];
                        break;
                    case ROLE_CARRIER:
                        bodyParts = [
                            MOVE,
                            MOVE,
                            CARRY,
                            CARRY,
                        ];
                        break;
                    case ROLE_LOGISTIC:
                        bodyParts = [
                            MOVE,
                            MOVE,
                            CARRY,
                            CARRY,
                        ];
                        break;
                    case ROLE_CLAIMER:
                        bodyParts = [CLAIM, MOVE, MOVE];
                        break;
                    case ROLE_SCOUT:
                        bodyParts = [MOVE, MOVE];
                        break;
                    default:
                        return "role not found";
                }
                const cost = _.sum(bodyParts, (b) => BODYPART_COST[b]);
                if (spawn.room.energyAvailable < cost) return "not enough energy";
                output += role + " spawned : ";
                const name: string = this.getUnusedName(role);
                output += spawn.spawnCreep(bodyParts, name, {
                    memory: {
                        focus: null,
                        spawn,
                        role,
                        pos: spawn.pos,
                        state: STATE_IDLE,
                    },
                });
                return output;
            } else output = "not spawned because : no need new unit";
        } else output = "not spawned because : busy or limit reach";
        return output;
    }

    public static getUnusedName(role: string): string {
        outer: for (let index = 0; index < 100; index++) {
            const name = role + (index ? index.toString() : "") + " Scala";
            for (const creepName in Game.creeps) {
                if (creepName === name) {
                    continue outer;
                }
            }
            return name;
        }
        return role + " " + Game.time.toString();
    }

    public static neededRole(): string | null {
        const roles = this.roles;
        const targetCount = this.targetCount;
        for (let i = 0; i < roles.length; i++) {
            const count: number = _.filter(Game.creeps, (creep) => {
                return (
                    (creep.memory.role === ROLE_BUILDER && roles[i] === ROLE_UPGRADER) || creep.memory.role === roles[i]
                );
            }).length;
            if (targetCount[i] > count) return roles[i];
        }
        return null;
    }
}
