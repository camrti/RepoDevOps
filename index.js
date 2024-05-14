const express = require('express');
const app = express();
const port = 8000;

app.get('/',(req, res) => {
    res.send('Hello World!');
})

app.use("/scopus",require(`./publicationRoute`));

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}!`);
})