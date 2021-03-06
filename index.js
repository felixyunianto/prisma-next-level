const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const mainRouters = require('./src/routes');
// const bodyParser = require('body-parser');
const cors = require('cors');

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'));

app.use('/', mainRouters);