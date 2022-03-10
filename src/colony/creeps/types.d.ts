export interface StateBuilding {
  name: STATE_BUILDING
  structure: ConstructionSite
}
export interface StateMining {
  name: STATE_MINING
  source: Source
}
export interface StateClaiming {
  name: STATE_CLAIMING
  controller: StructureController
}
export interface StateUpgrading {
  name: STATE_UPGRADING
  controller: StructureController
}

export interface StateIdle {
  name: STATE_IDLE
}
export declare const StateIdle: { name: STATE_IDLE }


export interface StateDeposite {
  name: STATE_DEPOSITE
  storage: StructureContainer | StructureExtension | StructureSpawn
}
export interface StateWithdraw {
  name: STATE_WITHDRAW
  storage: StructureContainer | StructureExtension | StructureSpawn
}
export interface StateRepairing {
  name: STATE_REPAIRING
  controller: OwnedStructure
}


// export type CreepState =
//   | StateClaiming
//   | StateBuilding
//   | StateMining
//   | StateIdle
//   | StateDeposite
//   | StateRepairing
//   | StateUpgrading
//   | StateWithdraw;



// declare const STATE_MINING: STATE_MINING;
// declare const STATE_CLAIMING: STATE_CLAIMING;
// declare const STATE_BUILDING: STATE_BUILDING;
// declare const STATE_UPGRADING: STATE_UPGRADING;
// declare const STATE_IDLE: STATE_IDLE;
// declare const STATE_DEPOSITE: STATE_DEPOSITE;
// declare const STATE_REPAIRING: STATE_REPAIRING;
// declare const STATE_WITHDRAW: STATE_WITHDRAW;

// declare const ROLE_POLY: ROLE_POLY;
// declare const ROLE_LOGISTIC: ROLE_LOGISTIC;
// declare const ROLE_CORE: ROLE_CORE;
// declare const ROLE_MINER: ROLE_MINER;
// declare const ROLE_UPGRADER: ROLE_UPGRADER;
// declare const ROLE_CARRIER: ROLE_CARRIER;
// declare const ROLE_SCOUT: ROLE_SCOUT;
// declare const ROLE_CLAIMER: ROLE_CLAIMER;
// declare const ROLE_HARVESTER: ROLE_HARVESTER;
// declare const ROLE_BUILDER: ROLE_BUILDER;
// declare const ROLE_REPAIRER: ROLE_REPAIRER;
// declare const ROLE_FIGHTER_MELEE: ROLE_FIGHTER_MELEE;
// declare const ROLE_FIGHTER_RANGE: ROLE_FIGHTER_RANGE;
// declare const ROLE_FIGHTER_POLY: ROLE_FIGHTER_POLY;
// declare const ROLE_FIGHTER_SUPPORT: ROLE_FIGHTER_SUPPORT;


// type STATE_MINING = "mining";
// type STATE_CLAIMING = "claiming";
// type STATE_BUILDING = "building";
// type STATE_UPGRADING = "upgrading";
// type STATE_IDLE = "idle";
// type STATE_DEPOSITE = "deposite";
// type STATE_REPAIRING = "repairing";
// type STATE_WITHDRAW = "withdraw";

// type CreepRole =
//   | ROLE_POLY
//   | ROLE_LOGISTIC
//   | ROLE_CORE
//   | ROLE_MINER
//   | ROLE_UPGRADER
//   | ROLE_CARRIER
//   | ROLE_SCOUT
//   | ROLE_CLAIMER
//   | ROLE_HARVESTER
//   | ROLE_BUILDER
//   | ROLE_REPAIRER
//   | ROLE_FIGHTER_MELEE
//   | ROLE_FIGHTER_RANGE
//   | ROLE_FIGHTER_POLY
//   | ROLE_FIGHTER_SUPPORT;

// type ROLE_POLY = "poly";
// type ROLE_LOGISTIC = "logistic";
// type ROLE_CORE = "core";
// type ROLE_MINER = "miner";
// type ROLE_UPGRADER = "upgrader";
// type ROLE_CARRIER = "carrier";
// type ROLE_SCOUT = "scout";
// type ROLE_CLAIMER = "claimer";
// type ROLE_HARVESTER = "harvester";
// type ROLE_BUILDER = "builder";
// type ROLE_REPAIRER = "repairer";
// type ROLE_FIGHTER_MELEE = "fighterMelee";
// type ROLE_FIGHTER_RANGE = "fighterRange";
// type ROLE_FIGHTER_POLY = "fighterPoly";
// type ROLE_FIGHTER_SUPPORT = "fighterSupport";
// type ROLE_FIGHTER_CARRIER = "fighterCarrier";
