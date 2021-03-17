export class B {
    public static patern: BuildableStructureConstant[][] = [
        [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_EXTENSION, STRUCTURE_ROAD, STRUCTURE_TOWER, STRUCTURE_ROAD, STRUCTURE_LAB, STRUCTURE_LAB, STRUCTURE_FACTORY],
        [STRUCTURE_EXTENSION, STRUCTURE_ROAD, STRUCTURE_EXTENSION, STRUCTURE_EXTENSION, STRUCTURE_ROAD, STRUCTURE_LAB, STRUCTURE_LAB, STRUCTURE_ROAD, STRUCTURE_LAB],
        [STRUCTURE_EXTENSION, STRUCTURE_EXTENSION, STRUCTURE_ROAD, STRUCTURE_EXTENSION, STRUCTURE_ROAD, STRUCTURE_LAB, STRUCTURE_ROAD, STRUCTURE_LAB, STRUCTURE_LAB],
        [],
        [],
        [],
        [],
        [],
        [],
    ]
    public static center: any = { x: 4, y: 4 };
    public static draw(flag: Flag) {
        const style: PolyStyle = {
            fill: "#fc3903",
            opacity: 0.2,
            stroke: "#FFFF0f",
            strokeWidth: 0.1,
            lineStyle: "dashed"
        }
        var room: Room | undefined = flag.room;
        if (room)
            room.visual.rect(
                flag.pos.x - this.center.x,
                flag.pos.y - this.center.y,
                this.patern[0].length - 1,
                this.patern.length - 1,
                style)
    }
}
