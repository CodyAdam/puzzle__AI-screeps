import cmd from "./commands";

global.cmd = cmd;

global.MINER_PER_SOURCE = 1;

global.STATE_MINING = "mining";
global.STATE_CLAIMING = "claiming";
global.STATE_BUILDING = "building";
global.STATE_UPGRADING = "upgrading";
global.STATE_IDLE = "idle";
global.STATE_REPAIRING = "repairing";
global.STATE_DEPOSITE = "deposite";
global.STATE_WITHDRAW = "withdraw";

global.ROLE_LOGISTIC = "logistic";
global.ROLE_CORE = "core";
global.ROLE_MINER = "miner";
global.ROLE_UPGRADER = "upgrader";
global.ROLE_CARRIER = "carrier";
global.ROLE_SCOUT = "scout";
global.ROLE_CLAIMER = "claimer";
global.ROLE_HARVESTER = "harvester";
global.ROLE_BUILDER = "builder";
global.ROLE_REPAIRER = "repairer";
global.ROLE_FIGHTER_MELEE = "fighterMelee";
global.ROLE_FIGHTER_RANGE = "fighterRange";
global.ROLE_FIGHTER_Poly = "fighterPoly";
global.ROLE_FIGHTER_SUPPORT = "fighterSupport";
