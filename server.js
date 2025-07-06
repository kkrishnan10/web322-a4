/********************************************************************************
*  WEB322 – Assignment 04
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Karthika Krishnan Student ID: 101801231 Date: 06/07/25
*
*  Published URL:
********************************************************************************/

const express = require('express');
const path = require('path');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


const projects = require('./data/projects.json');


app.get('/', (req, res) => {
    res.render("home", { page: "/" });
});


app.get('/about', (req, res) => {
    res.render("about", { page: "/about" });
});


app.get('/solutions/projects', (req, res) => {
    const sector = req.query.sector;
    let filteredProjects = projects;

    if (sector) {
        filteredProjects = projects.filter(p => p.sector.toLowerCase() === sector.toLowerCase());
        if (filteredProjects.length === 0) {
            return res.status(404).render("404", { page: "", message: `No projects found for sector: ${sector}` });
        }
    }

    res.render("projects", { projects: filteredProjects, page: "/solutions/projects" });
});


app.get('/solutions/projects/:id', (req, res) => {
    const project = projects.find(p => p.id == req.params.id);
    if (!project) {
        return res.status(404).render("404", { page: "", message: "Project not found" });
    }

    res.render("project", { project: project, page: "" });
});


app.use((req, res) => {
    res.status(404).render("404", { page: "", message: "Page not found" });
});

app.listen(HTTP_PORT, () => {
    console.log(`Server listening on port ${HTTP_PORT}`);
});

