import { CreepSuper } from "./creepSuper";

export abstract class Scout extends CreepSuper {
    public static role: CreepRole = ROLE_SCOUT;
    public static run(creep: Creep): void {
        super.run(creep);

        if (!creep.memory.target) {
            creep.memory.target = { tick: 0, flagTick: 0 };
            this.run(creep);
        }
        else {
            creep.say(this.rickRoll(creep.memory.target.tick), true);
            this.incrementTick(creep);
            this.move(creep);
        }
    }

    public static rickRoll(index: number): string {
        return this.rickRollLyrics[index % this.rickRollLyrics.length]
    }

    public static incrementTick(creep: Creep): void {
        if (creep.memory.target) {
            let creepMem = creep.memory.target
            creepMem.tick += 1
            creep.memory.target = creepMem;
        }
    }

    public static move(creep: Creep): void {
        var flagsRoute: Flag[] = _.filter(Game.flags, (flag: Flag) => {
            return (
                flag.name.toLowerCase().includes((creep.memory.target.arrived) ? "mesloop" : "mespath")
            );
        })
        if (!creep.memory.target.arrived && creep.memory.target.flagTick >= flagsRoute.length - 1) {
            let creepMem = creep.memory.target
            creepMem.arrived = true
            creep.memory.target = creepMem;
        }
        flagsRoute = _.sortBy(flagsRoute, (flag: Flag) => { return (flag.name); })
        if (flagsRoute.length && creep.memory.target.flagTick != undefined && creep.memory.target.flagTick != null) {
            let target: RoomPosition = flagsRoute[creep.memory.target.flagTick % flagsRoute.length].pos
            if (target.x == creep.pos.x && target.y == creep.pos.y && target.roomName == creep.pos.roomName) {
                let creepMem = creep.memory.target
                creepMem.flagTick += 1
                creep.memory.target = creepMem;
            }
            creep.moveTo(flagsRoute[creep.memory.target.flagTick % flagsRoute.length], { visualizePathStyle: { stroke: "#fcf803" } })
        }
    }

    public static rickRollLyrics: string[] = ["We're no",
        "strangers",
        "to love",
        "You know",
        "the rules",
        "and so do",
        "I! 🖤",
        "*heavy",
        "breathing*",
        "Never",
        "gonna",
        "give you",
        "up 😎",
        "Never",
        "gonna",
        "let you",
        "down ⏬",
        "Never",
        "gonna run",
        "around",
        "and",
        "desert",
        "you 👌",
        "Never",
        "gonna",
        "make you",
        "cry 🙈",
        "Never",
        "gonna say",
        "goodbye 🙉",
        "Never",
        "gonna",
        "tell a",
        "lie and",
        "hurt you!",
        "👌😎✌"]
}
