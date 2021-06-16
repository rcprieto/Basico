//Faz o route /projects para get
const express = require('express');
const {
    uuid
} = require('uuidv4');
const app = express();
app.use(express.json());

const projects = [
    {"owner":"Rodrigo", "title":"Novo Node"},
    {"owner":"Rodrigo 2", "title":"Novo Node 2"}
];

app.get('/projects', (request, response) => {
    const {filtro} = request.query;
   const results = filtro ? projects.filter(p => p.title.includes(filtro) || p.owner.includes(filtro)) : projects;
    return response.json(results);
});

app.post('/projects', (request, response) => {
    //const body = request.body;
    const {
        title,
        owner
    } = request.body;
    //console.log(body);
    const id = uuid();
    const project = {
        id,
        title,
        owner
    };
    projects.push(project);
    return response.json(projects);
});

app.put('/projects/:id', (request, response) => {
    const {
        id
    } = request.params;
    const {
        title,
        owner
    } = request.body;

    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex < 0) {
        return response.status(400).json({
            error: 'Não encontrado!'
        });
    }

    const project = projects[projectIndex];
    project.owner = owner;
    project.title = title;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const {
        id
    } = request.params;
    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex < 0) {
        return response.status(400).json({
            error: 'Não encontrado!'
        });
    }

    projects.splice(projectIndex, 1);
     return response.status(204).json([]);


});
app.listen(3333, () => {
    console.log('Backend started');
});