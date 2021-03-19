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

  function defendRoom(roomName: string) {
    var room = Game.rooms[roomName];
    var hostiles = room.find(FIND_HOSTILE_CREEPS);
    var towers = room.find(
      FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
    if (hostiles.length > 0) {
      var username = hostiles[0].owner.username;
      Game.notify(`User ${username} spotted in room ${roomName}`);
      towers.forEach((tower: AnyOwnedStructure) => { if (tower.structureType == STRUCTURE_TOWER) tower.attack(hostiles[0]) });
    } else if (room.controller) {
      var closestDamagedStructure: Structure | null = room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure: Structure) => {
          return (structure.hits < structure.hitsMax &&
            structure.structureType != STRUCTURE_WALL &&
            structure.hits < 2000000);
        }
      });
      if (closestDamagedStructure && towers[0]) {
        if (towers[0].structureType == STRUCTURE_TOWER && closestDamagedStructure) towers[0].repair(closestDamagedStructure);

      }
    }
  }



  console.log("############ Update Rooms ");

  for (var roomName in Memory.rooms) {
    var room: Room = Game.rooms[roomName];
    defendRoom(roomName);
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


