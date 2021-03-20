import "utils/constants";

import { Builder } from "role/builder";
import { Carrier } from "role/carrier";
import { Claimer } from "role/claimer";
import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "role/harvester";
import { Logistic } from "role/logistic";
import { MemoryManager } from "memoryManager";
import { Miner } from "role/miner";
import { Repairer } from "role/repairer";
import { RoomPainter } from "roomPainter";
import { Scout } from "role/scout";
import { SpawnManager } from "spawnManager";
import { Upgrader } from "role/upgrader";

import cmd from "utils/commands";

global.cmd = cmd;

export const loop = ErrorMapper.wrapLoop(() => {
    if (Game.cpu.bucket >= 10000) {
        Game.cpu.generatePixel();
    }

    console.log("############ Update Towers ");

    function defendRoom(room: Room) {
        if (room) {
            const hostiles = room.find(FIND_HOSTILE_CREEPS);
            const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            if (hostiles.length > 0) {
                const username = hostiles[0].owner.username;
                Game.notify(`User ${username} spotted in room ${room.name}`);
                towers.forEach((tower: AnyOwnedStructure) => {
                    if (tower.structureType === STRUCTURE_TOWER) tower.attack(hostiles[0]);
                });
            } else if (room.controller) {
                const closestDamagedStructure: Structure | null = room.controller.pos.findClosestByRange(
                    FIND_STRUCTURES,
                    {
                        filter: (structure: Structure) => {
                            return (
                                structure.hits < structure.hitsMax &&
                                structure.structureType !== STRUCTURE_WALL &&
                                structure.hits < 2000000
                            );
                        },
                    },
                );
                if (closestDamagedStructure && towers[0]) {
                    if (towers[0].structureType === STRUCTURE_TOWER && closestDamagedStructure)
                        towers[0].repair(closestDamagedStructure);
                }
            }
        }
    }

    console.log("############ Update Rooms ");

    for (const roomName in Memory.rooms) {
        const room: Room = Game.rooms[roomName];
        if (room) {
            defendRoom(room);
            MemoryManager.updateRoom(room);
        }
    }

    console.log("############ Remove Missing  ");

    MemoryManager.cleanAllMemory();

    console.log("############ Paint Visual ");

    RoomPainter.drawAll();

    console.log("############ Update Spawns ");

    const spawn: StructureSpawn | null = Game.spawns.Spawn1;
    if (spawn) SpawnManager.spawn(spawn);

    console.log("############ Update Creeps ");

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        console.log("### " + creep.name);

        if (creep.memory.role === ROLE_HARVESTER) {
            Harvester.run(creep);
        }
        if (creep.memory.role === ROLE_UPGRADER) {
            Upgrader.run(creep);
        }
        if (creep.memory.role === ROLE_BUILDER) {
            Builder.run(creep);
        }
        if (creep.memory.role === ROLE_REPAIRER) {
            Repairer.run(creep);
        }
        if (creep.memory.role === ROLE_MINER) {
            Miner.run(creep);
        }
        if (creep.memory.role === ROLE_CARRIER) {
            Carrier.run(creep);
        }
        if (creep.memory.role === ROLE_CLAIMER) {
            Claimer.run(creep);
        }
        if (creep.memory.role === ROLE_SCOUT) {
            Scout.run(creep);
        }
        if (creep.memory.role === ROLE_LOGISTIC) {
            Logistic.run(creep);
        }
    }
});
