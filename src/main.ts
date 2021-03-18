import "utils/constants"
import { ErrorMapper } from "utils/ErrorMapper";

import { MemoryManager } from "memoryManager";
import { SpawnManager } from "spawnManager";

import { Harvester } from "role/Harvester";
import { Upgrader } from "role/Upgrader";
import { Builder } from "role/Builder";
import { Repairer } from "role/Repairer";
import { Miner } from "role/miner";
import { Carrier } from "role/carrier";
import { RoomPainter } from "roomPainter";
import { Claimer } from "role/claimer";
import { Scout } from "role/scout";
import { Logistic } from "role/logistic";


export const loop = ErrorMapper.wrapLoop(() => {
  if (Game.cpu.bucket >= 10000) {
    Game.cpu.generatePixel();
  }

  console.log("############ Update Towers ");

  var tower: StructureTower | undefined | null = Game.getObjectById("6052b3f926a7a12d4b5cab0e");
  if (tower && tower.attack && tower.repair) {
    let closestHostile: Creep | null = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
      filter: (creep: Creep) => {
        return (!creep.name.toLowerCase().includes("scala"));
        //return true;
      }
    });
    if (closestHostile) {
      tower.attack(closestHostile);
    } else {
      var closestDamagedStructure: Structure | null = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure: Structure) => {
          return structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL;
        }
      });
      if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
      }
    }
  }


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

  let spawn: StructureSpawn | null = Game.spawns["Spawn1"];
  if (spawn)
    SpawnManager.spawn(spawn);

  console.log("############ Update Creeps ");

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    console.log("### " + creep.name);

    if (creep.memory.role == ROLE_HARVESTER) {
      Harvester.run(creep);
    }
    if (creep.memory.role == ROLE_UPGRADER) {
      Upgrader.run(creep);
    }
    if (creep.memory.role == ROLE_BUILDER) {
      Builder.run(creep);
    }
    if (creep.memory.role == ROLE_REPAIRER) {
      Repairer.run(creep);
    }
    if (creep.memory.role == ROLE_MINER) {
      Miner.run(creep);
    }
    if (creep.memory.role == ROLE_CARRIER) {
      Carrier.run(creep);
    }
    if (creep.memory.role == ROLE_CLAIMER) {
      Claimer.run(creep);
    }
    if (creep.memory.role == ROLE_SCOUT) {
      Scout.run(creep);
    }
    if (creep.memory.role == ROLE_LOGISTIC) {
      Logistic.run(creep);
    }
  }
});


