export const Game = {
  creeps: [],
  rooms: [],
  spawns: {},
  time: 12345
};

export const Memory = {
  creeps: [{
    role: "harverster",
    room: new Room("testRoom"),
    building: false,
    upgrading: false,
    working: false
  }, {
      role: "builder",
      room: new Room("testRoom"),
      building: false,
      upgrading: false,
      working: false
    }, {
      role: "harverster",
      room: new Room("testRoom"),
      building: false,
      upgrading: false,
      working: false
    }, {
      role: "harverster",
      room: new Room("testRoom"),
      building: false,
      upgrading: false,
      working: false
    }, ]
};
