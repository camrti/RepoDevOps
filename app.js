const express = require('express');
const app = express();
const port = 8000;
const researcherRoute = require('./researcherRoute');
const publicationRoute = require('./publicationRoute');

app.get('/',(req, res) => {
    res.send('Hello World!');
})

app.use("/scopus", publicationRoute);
app.use("/researcher", researcherRoute);

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}!`);
})
