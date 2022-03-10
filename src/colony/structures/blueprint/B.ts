export class B {
    public static patern: BuildableStructureConstant[][] = [
        [
            STRUCTURE_SPAWN,
            STRUCTURE_EXTENSION,
            STRUCTURE_EXTENSION,
            STRUCTURE_ROAD,
            STRUCTURE_TOWER,
            STRUCTURE_ROAD,
            STRUCTURE_LAB,
            STRUCTURE_LAB,
            STRUCTURE_FACTORY,
        ],
        [
            STRUCTURE_EXTENSION,
            STRUCTURE_ROAD,
            STRUCTURE_EXTENSION,
            STRUCTURE_EXTENSION,
            STRUCTURE_ROAD,
            STRUCTURE_LAB,
            STRUCTURE_LAB,
            STRUCTURE_ROAD,
            STRUCTURE_LAB,
        ],
        [
            STRUCTURE_EXTENSION,
            STRUCTURE_EXTENSION,
            STRUCTURE_ROAD,
            STRUCTURE_EXTENSION,
            STRUCTURE_ROAD,
            STRUCTURE_LAB,
            STRUCTURE_ROAD,
            STRUCTURE_LAB,
            STRUCTURE_LAB,
        ],
        [],
        [],
        [],
        [],
        [],
        [],
    ];
    public static center: { x: number; y: number } = { x: 4, y: 4 };
    public static draw(flag: Flag): ScreepsReturnCode {
        const style: PolyStyle = {
            fill: "#fc3903",
            opacity: 0.075,
            stroke: "#FFFF0f",
            strokeWidth: 0.1,
            lineStyle: "dotted",
        };
        const room: Room | undefined = flag.room;
        if (room)
            room.visual.rect(
                flag.pos.x - this.center.x - 0.5,
                flag.pos.y - this.center.y - 0.5,
                this.patern[0].length,
                this.patern.length,
                style,
            );
        return OK;
    }
}
