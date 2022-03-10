import { CreepSuper } from "../creepSuper";

export abstract class Scout extends CreepSuper {
    public static role: CreepRole = ROLE_SCOUT;
    public static run(creep: Creep): ScreepsReturnCode {
        super.run(creep);

        if (!creep.memory.focus) {
            creep.memory.focus = { tick: 0, flagTick: 0 };
            this.run(creep);
        } else {
            creep.say(this.rickRoll(creep.memory.focus.tick), true);
            this.incrementTick(creep);
            this.move(creep);
        }
        return OK;
    }

    public static rickRoll(index: number): string {
        return this.rickRollLyrics[index % this.rickRollLyrics.length];
    }

    public static incrementTick(creep: Creep): void {
        if (creep.memory.focus) {
            const creepMem = creep.memory.focus;
            creepMem.tick += 1;
            creep.memory.focus = creepMem;
        }
    }

    public static move(creep: Creep): void {
        let flagsRoute: Flag[] = _.filter(Game.flags, (flag: Flag) => {
            return flag.name.toLowerCase().includes(creep.memory.focus.arrived ? "mesloop" : "mespath");
        });
        if (!creep.memory.focus.arrived && creep.memory.focus.flagTick >= flagsRoute.length - 1) {
            const creepMem = creep.memory.focus;
            creepMem.arrived = true;
            creep.memory.focus = creepMem;
        }
        flagsRoute = _.sortBy(flagsRoute, (flag: Flag) => {
            return flag.name;
        });
        if (flagsRoute.length && creep.memory.focus.flagTick !== undefined && creep.memory.focus.flagTick != null) {
            const target: RoomPosition = flagsRoute[creep.memory.focus.flagTick % flagsRoute.length].pos;
            if (target.x === creep.pos.x && target.y === creep.pos.y && target.roomName === creep.pos.roomName) {
                const creepMem = creep.memory.focus;
                creepMem.flagTick += 1;
                creep.memory.focus = creepMem;
            }
            creep.moveTo(flagsRoute[creep.memory.focus.flagTick % flagsRoute.length], {
                visualizePathStyle: { stroke: "#fcf803" },
            });
        }
    }

    public static rickRollLyrics: string[] = [
        "We're no",
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
        "👌😎✌",
    ];
}
