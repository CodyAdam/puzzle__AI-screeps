import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "role/Harvester";
import { Upgrader } from "role/Upgrader";
import { Builder } from "role/Builder";
import { Repairer } from "role/Repairer";
import { MemoryManager } from "memoryManager";
import { SpawnManager } from "spawnManager";
import cmd from "utils/commands";
import { Miner } from "role/miner";
import { Haulier } from "role/haulier";
import { RoomPainter } from "roomPainter";
import { Claimer } from "role/claimer";
import { Messenger } from "role/messenger";

global.cmd = cmd;
global.MINER_PER_SOURCE = 1;

export const loop = ErrorMapper.wrapLoop(() => {
  if (Game.cpu.bucket >= 10000) {
    Game.cpu.generatePixel();
  }

  console.log("############ Update Towers ");

  var tower: StructureTower | undefined | null = Game.getObjectById("604fe9fbf201b678adf2c70f");
  if (tower) {
    let closestHostile: Creep | null = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
      filter: (creep: Creep) => {
        return (!creep.name.toLowerCase().includes("scala"));
      }
    });
    if (closestHostile) {
      tower.attack(closestHostile);
    } else {
      var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: structure => {
          return structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL;
        }
      });
      if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
      }
    }
  }

  // var joe = Game.creeps["joe"];
  // joe.moveTo(Game.flags["joe"])

  console.log("############ Update Rooms ");

  for (var roomName in Memory.rooms) {
    var room: Room = Game.rooms[roomName];
    if (room) MemoryManager.updateRoom(room);
  }

  console.log("############ Remove Missing  ");

  MemoryManager.removeMissing();

  console.log("############ Paint  ");
  RoomPainter.drawAll();
  console.log("############ Update Spawns ");
  SpawnManager.spawn(Game.spawns["Spawn1"]);

  console.log("############ Update Creeps ");

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    console.log("### " + creep.name);

    if (creep.memory.role == "harvester") {
      Harvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      Upgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      Builder.run(creep);
    }
    if (creep.memory.role == "repairer") {
      Repairer.run(creep);
    }
    if (creep.memory.role == "miner") {
      Miner.run(creep);
    }
    if (creep.memory.role == "haulier") {
      Haulier.run(creep);
    }
    if (creep.memory.role == "claimer") {
      Claimer.run(creep);
    }
    if (creep.memory.role == "messenger") {
      Messenger.run(creep);
    }
  }
});

global.STATE_MINING = "mining";
global.STATE_BUILDING = "building";
global.STATE_UPGRADING = "upgrading";
global.STATE_IDLE = "idle";
global.STATE_HAULING = "hauling";
global.STATE_REPAIRING = "repairing";
global.STATE_REFILLING = "refilling";
