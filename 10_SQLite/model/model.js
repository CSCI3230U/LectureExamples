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
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, DATETIME('now'), ?)`,
          [1, 'fred was here!'])
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, DATETIME('now'), ?)`,
          [2, 'so was sally!'])
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, DATETIME('now'), ?)`,
          [1, 'fred was here first!'])
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, DATETIME('now'), ?)`,
          [2, 'who cares?'])
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, DATETIME('now'), ?)`,
          [1, 'fred is the best!'])
      .run(`INSERT INTO chirps(sender, sentTime, message) VALUES(?, DATETIME('now'), ?)`,
          [2, 'oh boy']);
});

db.serialize(() => {
    let deletedId = -1;
    db.run(`INSERT INTO chirps(sender, message) VALUES(?, ?)`, [2, 'Oh gosh darn it!'])
      .run('INSERT INTO chirps(sender, message) VALUES(?, ?)', [2, 'This is a controversial message'], (err) => {
        if (err) {
            console.error('Error inserting into database: ', err);
        } else {
            deletedId = this.lastID;
        }
      })
      .run(`UPDATE chirps SET message = ? WHERE message LIKE '%darn%'`, ['Censored'], (err) => {
        if (err) {
            console.error('Error updating database: ', err);
        } else {
            console.log(`Updated chirps: ${this.changes}`);
        }
      })
      .run('DELETE FROM chirps WHERE chirpId = ?', deletedId, (err) => {
        if (err) {
            console.error('Error deleting from database: ', err);
        } else {
            console.log(`Deleted chirps: ${this.changes}`);
        }
        console.log(this);
      })
      .each('SELECT message, sentTime FROM chirps WHERE sender = ?', [2], (err, chirp) => {
        if (err) {
            console.error('Error querying database: ', err);
        } else {
            console.log(`${chirp.sentTime}: ${chirp.message}`);
        }
    });
});

function getAllChirps(callback) {
    db.all('SELECT chirpId, sender, sentTime, message FROM chirps', (err, chirps) => {
        if (err) {
            console.error('Error querying database: ', err);
        } else {
            callback(chirps);
        }
    });
}

function deleteChirp(id, callback) {
    db.run('DELETE FROM chirps WHERE chirpId = ?', id, (err) => {
        if (err) {
            console.error('Error deleting from database: ', err);
        } else {
            callback();
        }
    });
}

function addChirp(sender, message, callback) {
    db.run('INSERT INTO chirps(sender, message) VALUES(?, ?)', [sender, message], (err) => {
        if (err) {
            console.error('Error inserting into database: ', err);
        } else {
            callback();
        }
    });
}

function updateChirp(id, sentTime, sender, message, callback) {
    db.run('UPDATE chirps SET sentTime = ?, sender = ?, message = ? WHERE chirpId = ?', 
           [sentTime, sender, message, id], (err) => {
        if (err) {
            console.error('Error updating database: ', err);
        } else {
            callback();
        }
    });
}

module.exports.getAllChirps = getAllChirps;
module.exports.deleteChirp = deleteChirp;
module.exports.addChirp = addChirp;
module.exports.updateChirp = updateChirp;