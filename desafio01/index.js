const express = require('express')
const app = express()


let countRequest = 0
const projects = [
  {
    "id": "3",
    "title": "Novo nome do projeto",
    "tasks": []
  },
  {
    "id": "1",
    "title": "Novo projeto",
    "tasks": []
  },
  {
    "id": "2",
    "title": "Novo projeto",
    "tasks": []
  }
]

app.use(express.json())


const log = (req, res, next) => {
  countRequest++

  console.time('Request')
  console.log(`Número de requisições: ${countRequest}`)
  next()
  console.timeEnd('Request')
}

app.use(log)

const checkProjectExists = (req, res, next) => {
  const { id } = req.params
  const project = projects.find(p => p.id === id)

  if (!project) {
    return res.status(400).json({ error: 'Project not found' })
  }

  return next()
}

app.get('/projects', (req, res) => {
	return res.json(projects)
})

app.get('/projects/:id', checkProjectExists, (req, res) => {
	const { id } = req.params

	const project = projects.find(p => p.id === id)

	return res.json(project)
})

app.post('/projects', (req, res) => {
	projects.push(req.body)
	return res.json(projects)
})

app.put('/projects/:id', checkProjectExists, (req, res) => {
	const { id } = req.params
	const { title } = req.body

	const project = projects.find(p => p.id === id)

	project.title = title

	return res.json(projects)
})

app.delete('/projects/:id', checkProjectExists, (req, res) => {
	const { id } = req.params

	const index = projects.findIndex(p => p.id === id)

	projects.splice(index, index)

	return res.json(projects)
})

app.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
	const { id } = req.params
	const { title } = req.body

	const project = projects.find(p => p.id === id)

	if(project.tasks.indexOf(title) === -1) project.tasks.push(title)

	return res.json(project)
})

app.listen(3333)


