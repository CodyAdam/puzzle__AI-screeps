export abstract class Messenger {
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

    public static run(creep: Creep): void {
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
        if (creep.memory.target)
            creep.memory.target = { tick: creep.memory.target.tick + 1, flagTick: creep.memory.target.flagTick };
    }

    public static move(creep: Creep): void {
        var flagsRoute: Flag[] = _.filter(Game.flags, (flag: Flag) => {
            return (
                flag.name.toLowerCase().includes("messenger")
            );
        })
        flagsRoute = _.sortBy(flagsRoute, (flag: Flag) => { return (flag.name); })
        if (flagsRoute.length && creep.memory.target.flagTick != undefined && creep.memory.target.flagTick != null) {
            let target: RoomPosition = flagsRoute[creep.memory.target.flagTick % flagsRoute.length].pos
            if (target.x == creep.pos.x && target.y == creep.pos.y && target.roomName == creep.pos.roomName) {
                creep.memory.target = { tick: creep.memory.target.tick, flagTick: creep.memory.target.flagTick + 1 };
            }
            creep.moveTo(flagsRoute[creep.memory.target.flagTick % flagsRoute.length], { visualizePathStyle: { stroke: "#fcf803" } })
        }
    }
}
