export function tick(room: Room) {
  defendRoom(room);
}

export function defendRoom(room: Room) {
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
