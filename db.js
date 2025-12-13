const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const fs = require('fs')

async function init () {
  const dbDir = path.join(__dirname, 'data')
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir)
  const dbFile = path.join(dbDir, 'database.sqlite')
  const db = await sqlite.open({ filename: dbFile, driver: sqlite3.Database })
  //await db.run(`CREATE TABLE IF NOT EXISTS area (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_area TEXT NOT NULL); `)
  //await db.run(`CREATE TABLE IF NOT EXISTS estatus (id INTEGER PRIMARY KEY AUTOINCREMENT, estatus TEXT NOT NULL); `)
  //await db.run(`CREATE TABLE IF NOT EXISTS disciplina (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_disciplina TEXT NOT NULL, profesor_id INTEGER NOT NULL, area_id INTEGER NOT NULL, estatus_id INTEGER NOT NULL, horario TEXT NOT NULL)`)
  //await db.run(`CREATE TABLE IF NOT EXISTS profesor (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_profesor TEXT NOT NULL); `)
  await db.run(`DELETE FROM profesor WHERE id=15; ; `)
  return db
}

module.exports = { init }
