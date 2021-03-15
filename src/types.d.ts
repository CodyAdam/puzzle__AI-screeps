// example declaration file - remove these and add your own custom typings
// memory extension samples
interface CreepMemory {
  role: string;
  room: Room;
  building: boolean;
  upgrading: boolean;
  repairing : boolean;
  working: boolean;
}
interface RoomMemory {
  gameObject : Room;
  sources: SourceMemory[];
}

interface SourceMemory {
  gameObject : Source;
  miners: Creep[];
}

interface Memory {
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
