const utils = require('./utils');
const express = require('express');
const cors = require('cors');
const hash = require('object-hash');

const app = express();
const port = 4000;

const api = '/api';
const cache = {};

app.use(express.json({ limit: "50mb" }));

// enabling CORS for any unknown origin
app.use(cors());

app.get('/', (req, res) => {
    // Check DB connection to send health
    res.status(200).json({
        "status": {
            "Database": "HEALTHY, I PROMISE :3",
            "Server": "You're using it right now! ^-^"
        }
    });
});

app.get('/1987', (req, res) => {
    res.status(418).send('Is that the bite of \'87?!');
});

app.get(`${api}`, (req, res) => {
    let myPage = `<html>
                        <body style="background-color: black;">
                            <div style="position: absolute; top: 50%; left: 50%; translate: -50% -50%;">
                                <h1 style="color: red; font-weight: 900; font-family: 'courier new';">WHAT ARE YOU DOING!?</h1>
                            </div>
                        </body>
                    </html>`
    res.status(403).send(myPage);
});

app.post(`${api}/sendFile`, (req, res) => {
    // Replace with DB query for the check
    let requestHash = hash.MD5(req.body);
    if (cache[requestHash]) {
        res.status(400).json({ "error": "Object already exists!" })
    } else {
        // Add to DB with hash as ID, return hash only
        cache[requestHash] = req.body;
        res.status(201).json({ "MD5": requestHash });
    }
});

app.get(`${api}/getCache`, (req, res) => {
    res.status(200).json(cache);
});

app.delete(`${api}/clearCache`, (req, res) => {
    cache = {};
    res.status(200).json({ "message": "Cache cleared!" });
});

app.get(`${api}/mockStats`, (req, res) => {
    const resObj = new Array();
    resObj.push(utils.messageCount(utils.messages))
    resObj.push(utils.avgResponseTime(utils.messages));
    res.status(200).json(resObj);
});

app.get(`${api}/:ID`, (req, res) => {
    cache[req.params.ID]
        ? res.status(200).json(cache[req.params.ID])
        : res.status(404).json({ "error": "Object not found" });
});


// app.get(`${api}/statistics/:ID`, (req, res) => {

// });

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
});