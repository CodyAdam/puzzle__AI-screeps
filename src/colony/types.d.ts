export interface Colony {
  name: string
  spawns: Id<StructureSpawn>
  creeps: Id<Creep>
  rooms: Id<Room>
  maxEnergy: number
  level: number
}
