export class SpawnManager {
  public static roles: string[] = ["miner", "haulier", "upgrader", "repairer", "builder", "claimer", "messenger"];
  public static targetCount: number[] = [6, 8, 4, 1, 2, 1, 0];
  public static maxCount = 30;

  public static spawn(spawn: StructureSpawn): string {
    let output = "done : ";
    if (!spawn.spawning && _.size(Game.creeps) < this.maxCount) {
      const role = this.neededRole();
      if (role) {
        let bodyParts: BodyPartConstant[] = [WORK, CARRY, MOVE];
        switch (role) {
          case "miner":
            bodyParts = [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE];
            break;
          case "builder":
            bodyParts = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
            break;
          case "upgrader":
            bodyParts = [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            break;
          case "repairer":
            bodyParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
            break;
          case "haulier":
            bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
            break;
          case "claimer":
            bodyParts = [CLAIM, WORK, MOVE, MOVE];
            break;
          case "messenger":
            bodyParts = [MOVE, MOVE];
            break;
          default:
            return "role not found";
        }
        const cost = _.sum(bodyParts, (b) => BODYPART_COST[b]);
        if (spawn.room.energyAvailable < cost) return "not enough energy";
        output += role + " spawned";
        const name: string = role + (Game.time - 26474107) + "Escalade";
        spawn.spawnCreep(bodyParts, name, {
          memory: {
            target: null,
            spawn,
            role,
            pos: spawn.pos,
            state: STATE_IDLE
          }
        });
        return output;
      } else output = "not spawned because : no need new unit";
    } else output = "not spawned because : busy or limit reach";
    return output;
  }

  public static neededRole(): string | null {
    const roles = this.roles;
    const targetCount = this.targetCount;
    for (var i = 0; i < roles.length; i++) {
      const count = _.filter(Game.creeps, creep => creep.memory.role == roles[i]).length;
      if (targetCount[i] > count) return roles[i];
    }
    return null;
  }
}
