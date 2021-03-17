export abstract class Messenger {
    public static rickRollLyrics: string[] = ["We're no strangers to love",
        "You know the rules and so do I",
        "A full commitment's what I'm thinking of",
        "You wouldn't get this from any other guy",
        "I just wanna tell you how I'm feeling",
        "Gotta make you understand",
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
        "We've known each other for so long",
        "Your heart's been aching, but",
        "You're too shy to say it",
        "Inside, we both know what's been going on",
        "We know the game and we're gonna play it",
        "And if you ask me how I'm feeling",
        "Don't tell me you're too blind to see",
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
        "(Ooh, give you up)",
        "(Ooh, give you up)",
        "Never gonna give, never gonna give",
        "(Give you up)",
        "Never gonna give, never gonna give",
        "(Give you up)",
        "We've known each other for so long",
        "Your heart's been aching, but",
        "You're too shy to say it",
        "Inside, we both know what's been going on",
        "We know the game and we're gonna play it",
        "I just wanna tell you how I'm feeling",
        "Gotta make you understand",
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",]

    public static run(creep: Creep): void {
        if (!creep.memory.target) {
            creep.memory.target = { tick: 0, flagTick: 0 };
            this.run(creep);
        }
        else {
            creep.say(this.rickRoll(creep.memory.target.tick));
            this.incrementTick(creep);
            this.move(creep);
        }
    }

    public static rickRoll(index: number): string {
        return this.rickRollLyrics[index % this.rickRollLyrics.length]
    }

    public static incrementTick(creep: Creep): void {
        if (creep.memory.target)
            creep.memory.target = { tick: creep.memory.target.tick + 1, goToFlag: creep.memory.target.goToFlag };
    }

    public static move(creep: Creep): void {
        var flagsRoute: Flag[] = _.filter(Game.flags, (flag: Flag) => {
            return (
                flag.name.toLowerCase().includes("messenger")
            );
        })
        flagsRoute = _.sortBy(flagsRoute, (flag: Flag) => { return (flag.name); })

        if (flagsRoute.length && creep.memory.target.flagTick) {
            if (flagsRoute[creep.memory.target.flagTick % flagsRoute.length].pos == creep.pos)
                creep.memory.target.flagTick += 1
            creep.moveTo(flagsRoute[creep.memory.target.flagTick % flagsRoute.length])
        }
    }
}
