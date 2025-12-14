const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const dbModule = require('./db')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inicio.html'))
})

//----------------API HORARIOS -----------------------
// endpoint to list horarios from the DB
app.get('/api/horarios', async (req, res) => {
  try {
    const horarios = await app.locals.db.all('select * from disciplina where horario like "%'+req.query.dia+req.query.hora+'%"')
    res.json(horarios)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

//----------------API AREAS --------------------------

// endpoint to list áreas from the DB
app.get('/api/areas', async (req, res) => {
  try {
    const areas = await app.locals.db.all('SELECT id, nombre_area FROM area ORDER BY id')
    res.json(areas)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// endpoint to get area by id from the DB
app.get('/api/areabyid', async (req, res) => {
  try {
    const profesores = await app.locals.db.all('SELECT nombre_area FROM area WHERE id ='+req.query.id)
    res.json(profesores)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// endpoint to count area from the DB
app.get('/api/areacount', async (req, res) => {
  try {
    const count = await app.locals.db.all('SELECT count(*) as cantidad_areas FROM area ')
    res.json(count)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// simple endpoint to list areas from the DB
app.get('/area', async (req, res) => {
  try {
    const area = await app.locals.db.all('SELECT id, nombre_area FROM area ORDER BY id')
    res.json(area)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// simple endpoint to add an area
app.post('/area', async (req, res) => {
  const { nombre_area } = req.body
  if ( !nombre_area) return res.status(400).json({ error: 'todos los campos son requeridos' })
  try {
    const result = await app.locals.db.run('INSERT INTO area (nombre_area) VALUES (?)', nombre_area )
    const id = result.lastID || null
    res.status(201).json({ id, nombre_area})
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


//----------------API ESTATUS --------------------------

// endpoint to get estatus by id from the DB
app.get('/api/estatusbyid', async (req, res) => {
  try {
    const estatus = await app.locals.db.all('SELECT estatus FROM estatus WHERE id ='+req.query.id)
    res.json(estatus)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// endpoint to count estatus from the DB
app.get('/api/estatuscount', async (req, res) => {
  try {
    const count = await app.locals.db.all('SELECT count(*) as cantidad_estatus FROM estatus ')
    res.json(count)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// simple endpoint to list estatus from the DB
app.get('/estatus', async (req, res) => {
  try {
    const estatus = await app.locals.db.all('SELECT id, estatus FROM estatus ORDER BY id')
    res.json(estatus)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// simple endpoint to list estatus from the DB
app.get('/estatusbyid', async (req, res) => {
  try {
    const estatus = await app.locals.db.all('SELECT estatus FROM estatus WHERE id=?', req.query.id)
    res.json(estatus)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// simple endpoint to add an estatus
app.post('/estatus', async (req, res) => {
  const { estatus } = req.body
  if ( !estatus ) return res.status(400).json({ error: 'todos los campos son requeridos' })
  try {
    const result = await app.locals.db.run('INSERT INTO estatus ( estatus) VALUES (?)', estatus )
    const id = result.lastID || null
    res.status(201).json({ id, estatus  })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

//----------------API PROFESORES --------------------------

// endpoint to list profesores from the DB
app.get('/api/profesores', async (req, res) => {
  try {
    const profesores = await app.locals.db.all('SELECT id, nombre_profesor FROM profesor ORDER BY id')
    res.json(profesores)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// endpoint to get profesor by id from the DB
app.get('/api/profesorbyid', async (req, res) => {
  try {
    const profesores = await app.locals.db.all('SELECT nombre_profesor FROM profesor WHERE id ='+req.query.id)
    res.json(profesores)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// endpoint to count profesor from the DB
app.get('/api/profesorcount', async (req, res) => {
  try {
    const count = await app.locals.db.all('SELECT count(*) as cantidad_profesores FROM profesor ')
    res.json(count)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// endpoint to add a profesor
app.post('/api/profesores', async (req, res) => {
  const { nombre_profesor } = req.body
  if (!nombre_profesor) return res.status(400).json({ error: 'El nombre del profesor es requerido' })
  try {
    const result = await app.locals.db.run('INSERT INTO profesor (nombre_profesor) VALUES (?)', nombre_profesor)
    const id = result.lastID || null
    res.status(201).json({ id, nombre_profesor })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// simple endpoint to list profesores from the DB
app.get('/profesor', async (req, res) => {
  try {
    const profesor = await app.locals.db.all('SELECT id, nombre_profesor FROM profesor ORDER BY id')
    res.json(profesor)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// simple endpoint to add a profesor
app.post('/profesor', async (req, res) => {
  const { nombre_profesor } = req.body
  if (!nombre_profesor ) return res.status(400).json({ error: 'todos los campos son requeridos' })
  try {
    const result = await app.locals.db.run('INSERT INTO profesor (nombre_profesor) VALUES (?)', nombre_profesor )
    const id = result.lastID || null
    res.status(201).json({ id, nombre_profesor  })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

//----------------API DISCIPLINAS --------------------------

// API endpoint to list disciplinas from the DB (JSON)
app.get('/api/disciplinas', async (req, res) => {
  try {
    const disciplinas = await app.locals.db.all('SELECT id, nombre_disciplina, profesor_id, area_id, estatus_id, horario FROM disciplina ORDER BY id')
    res.json(disciplinas)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// API endpoint to add a disciplina
app.post('/api/disciplinas', async (req, res) => {
  const { nombre_disciplina, profesor_id, area_id, estatus_id, horario } = req.body
  if (!nombre_disciplina || profesor_id == null || area_id == null || estatus_id == null || !horario) return res.status(400).json({ error: 'todos los campos son requeridos' })
  try {
    const result = await app.locals.db.run('INSERT INTO disciplina (nombre_disciplina, profesor_id, area_id, estatus_id, horario ) VALUES (?,?,?,?,?)', nombre_disciplina, profesor_id, area_id, estatus_id, horario )
    const id = result.lastID || null
    res.status(201).json({ id, nombre_disciplina, profesor_id, area_id, estatus_id, horario })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// serve disciplinas page
app.get('/disciplinas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'disciplinas.html'))
})

// simple endpoint to list disciplinas from the DB
app.get('/disciplina', async (req, res) => {
  try {
    const disciplina = await app.locals.db.all('SELECT id, nombre_disciplina, profesor_id, area_id, estatus_id, horario FROM disciplina ORDER BY id')
    res.json(disciplina)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// simple endpoint to add a disciplinas
app.post('/disciplina', async (req, res) => {
  const { nombre_disciplina, profesor_id, area_id, estatus_id, horario  } = req.body
  if (!nombre_disciplina  || !profesor_id  || !area_id  || !estatus_id  || !horario ) return res.status(400).json({ error: 'todos los campos son requeridos' })
  try {
    const result = await app.locals.db.run('INSERT INTO disciplina (nombre_disciplina, profesor_id, area_id, estatus_id, horario ) VALUES (?,?,?,?,?)', nombre_disciplina, profesor_id, area_id, estatus_id, horario )
    const id = result.lastID || null
    res.status(201).json({ id, nombre_disciplina, profesor_id, area_id, estatus_id, horario  })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Start the server after initializing the database
async function start () {
  try {
    const db = await dbModule.init()
    app.locals.db = db
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
      console.log('SQLite DB initialized and ready')
    })
  } catch (err) {
    console.error('Failed to initialize database:', err)
    process.exit(1)
  }
}

start()