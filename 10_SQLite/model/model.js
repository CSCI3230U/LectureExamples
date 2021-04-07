const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/chirps.db', (err) => {
    if (err) {
        console.error('Error while connecting to database: ', err);
    } else {
        console.log('Connected to or created SQLite database');
    }
});

db.serialize(() => {
    db.run('DROP TABLE chirps')
      .run(`CREATE TABLE chirps(chirpId INTEGER PRIMARY KEY,
                                sender INTEGER,
                                sentTime DATETIME DEFAULT CURRENT_TIMESTAMP,
                                message TEXT)`)
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, ?, ?)`,
          [1, "DATETIME('now')", 'fred was here!'])
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, ?, ?)`,
          [2, "DATETIME('now')", 'so was sally!'])
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, ?, ?)`,
          [1, "DATETIME('now')", 'fred was here first!'])
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, ?, ?)`,
          [2, "DATETIME('now')", 'who cares?'])
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, ?, ?)`,
          [1, "DATETIME('now')", 'fred is the best!'])
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, ?, ?)`,
          [2, "DATETIME('now')", 'oh boy']);
});

module.exports.db = db;