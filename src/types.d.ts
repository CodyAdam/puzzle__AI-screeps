// example declaration file - remove these and add your own custom typings
// memory extension samples
interface CreepMemory {
  role: string;
  target: any | null;
  room: Room;
  spawn: StructureSpawn;
  state: CreepState;
}

interface SpawnMemory {
  id: Id<StructureSpawn>;
  creepsId: Id<Creep>[];
}

interface Source {
  memory: SourceMemory;
}

interface RoomMemory {
  id: Id<Room>;
  name: string;
  claimers: Id<Creep>[];
  sources: {
    [id: string]: SourceMemory;
  };
}

interface SourceMemory {
  minersId: Id<Creep>[];
  id: Id<Source>;
  pos: RoomPosition;
}

interface Memory {
  uuid: number;
  log: any;
}

declare namespace NodeJS {
  interface Global {
    cmd: any;
    MINER_PER_SOURCE: number;
    STATE_MINING: STATE_MINING;
    STATE_BUILDING: STATE_BUILDING;
    STATE_UPGRADING: STATE_UPGRADING;
    STATE_IDLE: STATE_IDLE;
    STATE_HAULING: STATE_HAULING;
    STATE_REPAIRING: STATE_REPAIRING;
    STATE_REFILLING: STATE_REFILLING;
  }
}

// CONSTANTS
declare const MINER_PER_SOURCE: 1;

declare const STATE_MINING: STATE_MINING;
declare const STATE_BUILDING: STATE_BUILDING;
declare const STATE_UPGRADING: STATE_UPGRADING;
declare const STATE_IDLE: STATE_IDLE;
declare const STATE_HAULING: STATE_HAULING;
declare const STATE_REPAIRING: STATE_REPAIRING;
declare const STATE_REFILLING: STATE_REFILLING;

type CreepState =
  | STATE_BUILDING
  | STATE_MINING
  | STATE_UPGRADING
  | STATE_IDLE
  | STATE_HAULING
  | STATE_REPAIRING
  | STATE_REFILLING;

type STATE_MINING = "mining";
type STATE_BUILDING = "building";
type STATE_UPGRADING = "upgrading";
type STATE_IDLE = "idle";
type STATE_HAULING = "hauling";
type STATE_REPAIRING = "repairing";
type STATE_REFILLING = "refilling";
