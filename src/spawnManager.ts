export class SpawnManager {
    public static roles: string[] = [
        ROLE_LOGISTIC,
        ROLE_MINER,
        ROLE_CARRIER,
        ROLE_UPGRADER,
        ROLE_REPAIRER,
        ROLE_CLAIMER,
        ROLE_SCOUT,
    ];
    public static targetCount: number[] = [1, 6, 8, 8, 1, 1, 0];
    public static maxCount = 30;

    public static spawn(spawn: StructureSpawn): string {
        let output = "done : ";
        if (!spawn.spawning && _.size(Game.creeps) < this.maxCount) {
            const role: string | null = this.neededRole();
            if (role) {
                let bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];
                switch (role) {
                    case ROLE_MINER:
                        bodyParts = [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE];
                        break;
                    case ROLE_UPGRADER:
                        bodyParts = [
                            WORK,
                            WORK,
                            WORK,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                        ];
                        break;
                    case ROLE_REPAIRER:
                        bodyParts = [
                            WORK,
                            WORK,
                            WORK,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                        ];
                        break;
                    case ROLE_CARRIER:
                        bodyParts = [
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                        ];
                        break;
                    case ROLE_LOGISTIC:
                        bodyParts = [
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            MOVE,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
                            CARRY,
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
                        target: null,
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
