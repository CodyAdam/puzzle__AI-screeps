// example declaration file - remove these and add your own custom typings
// memory extension samples
interface CreepMemory {
    role: string;
    focus: any | null;
    spawn: StructureSpawn;
    pos: RoomPosition;
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
        cli: any;

        MINER_PER_SOURCE: number;

        STATE_MINING: STATE_MINING;
        STATE_CLAIMING: STATE_CLAIMING;
        STATE_BUILDING: STATE_BUILDING;
        STATE_UPGRADING: STATE_UPGRADING;
        STATE_IDLE: STATE_IDLE;
        STATE_DEPOSITE: STATE_DEPOSITE;
        STATE_REPAIRING: STATE_REPAIRING;
        STATE_WITHDRAW: STATE_WITHDRAW;

        ROLE_POLY: ROLE_POLY;
        ROLE_LOGISTIC: ROLE_LOGISTIC;
        ROLE_CORE: ROLE_CORE;
        ROLE_MINER: ROLE_MINER;
        ROLE_UPGRADER: ROLE_UPGRADER;
        ROLE_CARRIER: ROLE_CARRIER;
        ROLE_SCOUT: ROLE_SCOUT;
        ROLE_CLAIMER: ROLE_CLAIMER;
        ROLE_HARVESTER: ROLE_HARVESTER;
        ROLE_BUILDER: ROLE_BUILDER;
        ROLE_REPAIRER: ROLE_REPAIRER;
        ROLE_FIGHTER_MELEE: ROLE_FIGHTER_MELEE;
        ROLE_FIGHTER_RANGE: ROLE_FIGHTER_RANGE;
        ROLE_FIGHTER_POLY: ROLE_FIGHTER_POLY;
        ROLE_FIGHTER_SUPPORT: ROLE_FIGHTER_SUPPORT;
    }
}

// CONSTANTS
declare const MINER_PER_SOURCE: 3;

declare const STATE_MINING: STATE_MINING;
declare const STATE_CLAIMING: STATE_CLAIMING;
declare const STATE_BUILDING: STATE_BUILDING;
declare const STATE_UPGRADING: STATE_UPGRADING;
declare const STATE_IDLE: STATE_IDLE;
declare const STATE_DEPOSITE: STATE_DEPOSITE;
declare const STATE_REPAIRING: STATE_REPAIRING;
declare const STATE_WITHDRAW: STATE_WITHDRAW;

declare const ROLE_POLY: ROLE_POLY;
declare const ROLE_LOGISTIC: ROLE_LOGISTIC;
declare const ROLE_CORE: ROLE_CORE;
declare const ROLE_MINER: ROLE_MINER;
declare const ROLE_UPGRADER: ROLE_UPGRADER;
declare const ROLE_CARRIER: ROLE_CARRIER;
declare const ROLE_SCOUT: ROLE_SCOUT;
declare const ROLE_CLAIMER: ROLE_CLAIMER;
declare const ROLE_HARVESTER: ROLE_HARVESTER;
declare const ROLE_BUILDER: ROLE_BUILDER;
declare const ROLE_REPAIRER: ROLE_REPAIRER;
declare const ROLE_FIGHTER_MELEE: ROLE_FIGHTER_MELEE;
declare const ROLE_FIGHTER_RANGE: ROLE_FIGHTER_RANGE;
declare const ROLE_FIGHTER_POLY: ROLE_FIGHTER_POLY;
declare const ROLE_FIGHTER_SUPPORT: ROLE_FIGHTER_SUPPORT;

type CreepState =
    | STATE_CLAIMING
    | STATE_BUILDING
    | STATE_MINING
    | STATE_UPGRADING
    | STATE_IDLE
    | STATE_DEPOSITE
    | STATE_REPAIRING
    | STATE_WITHDRAW;

type STATE_MINING = "mining";
type STATE_CLAIMING = "claiming";
type STATE_BUILDING = "building";
type STATE_UPGRADING = "upgrading";
type STATE_IDLE = "idle";
type STATE_DEPOSITE = "deposite";
type STATE_REPAIRING = "repairing";
type STATE_WITHDRAW = "withdraw";

type CreepRole =
    | ROLE_POLY
    | ROLE_LOGISTIC
    | ROLE_CORE
    | ROLE_MINER
    | ROLE_UPGRADER
    | ROLE_CARRIER
    | ROLE_SCOUT
    | ROLE_CLAIMER
    | ROLE_HARVESTER
    | ROLE_BUILDER
    | ROLE_REPAIRER
    | ROLE_FIGHTER_MELEE
    | ROLE_FIGHTER_RANGE
    | ROLE_FIGHTER_POLY
    | ROLE_FIGHTER_SUPPORT;

type ROLE_POLY = "poly";
type ROLE_LOGISTIC = "logistic";
type ROLE_CORE = "core";
type ROLE_MINER = "miner";
type ROLE_UPGRADER = "upgrader";
type ROLE_CARRIER = "carrier";
type ROLE_SCOUT = "scout";
type ROLE_CLAIMER = "claimer";
type ROLE_HARVESTER = "harvester";
type ROLE_BUILDER = "builder";
type ROLE_REPAIRER = "repairer";
type ROLE_FIGHTER_MELEE = "fighterMelee";
type ROLE_FIGHTER_RANGE = "fighterRange";
type ROLE_FIGHTER_POLY = "fighterPoly";
type ROLE_FIGHTER_SUPPORT = "fighterSupport";
type ROLE_FIGHTER_CARRIER = "fighterCarrier";
