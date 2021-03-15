export class CreepBehavior {
    public static sleep(creep: Creep): void {
        var restPoint = Game.flags["rest"].pos;
        creep.say("😴");
        creep.moveTo(restPoint, { visualizePathStyle: { stroke: "#00C8E180" } });
    }
}
