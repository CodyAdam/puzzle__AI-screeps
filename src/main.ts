import "utils/constants";

import { Harvester } from "colony/creeps/roles/harvester";
import { Upgrader } from "colony/creeps/roles/upgrader";
import { Builder } from "colony/creeps/roles/builder";
import { Carrier } from "colony/creeps/roles/carrier";
import { Claimer } from "colony/creeps/roles/claimer";
import { Logistic } from "colony/creeps/roles/logistic";
import { Miner } from "colony/creeps/roles/miner";
import { Repairer } from "colony/creeps/roles/repairer";
import { Poly } from "colony/creeps/roles/poly";
import { Scout } from "colony/creeps/roles/scout";
import { MemoryManager } from "utils/memory";
import { RoomPainter } from "colony/roomPainter";
import { SpawnManager } from "colony/spawns/spawnManager";
import { ErrorMapper } from "utils/ErrorMapper";

import cli from "utils/cli";
import { defendRoom } from 'colony/towers/main';

global.cli = cli;

export const loop = ErrorMapper.wrapLoop(() => {

    //   Loop :
    //      Bucket Pixel
    //      Update Colonies :
    //          colony :
    //              state
    //              controller lvl
    //              structure blueprint
    //          towers :
    //              Repair
    //              Defend
    //          spawns :
    //              Spawning
    //              Memory
    //          creeps :
    //              State
    //              Say
    //              Memory
    //      rooms :
    //          Draw Gizmos
    //          Claim/Controller
    //          ResetMem/Scan
    //          Memory


    if (Game.cpu.bucket >= 10000) {
        Game.cpu.generatePixel();
    }

    console.log("############ Update Rooms ");

    for (const roomName in Memory.rooms) {
        const room: Room = Game.rooms[roomName];
        if (room) {
            defendRoom(room);
            MemoryManager.updateRoom(room);
        }
    }

    console.log("############ Remove Missing ");

    MemoryManager.cleanAllMemory();

    console.log("############ Paint Visual ");

    RoomPainter.drawAll();

    console.log("############ Update Spawns ");

    const spawn: StructureSpawn | null = Game.spawns.B1S1;
    if (spawn) console.log(SpawnManager.spawn(spawn));

    console.log("############ Update Creeps ");

    for (const name in Game.creeps) {
        const creep: Creep = Game.creeps[name];
        console.log("## " + creep.name + " : " + creep.memory.role);
        if (creep.memory.role === ROLE_POLY) {
            Poly.run(creep);
        }
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
