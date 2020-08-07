const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('dotenv').config({ path: "./config/keys.env" });

const app = express();
mongoose.set('useCreateIndex', true);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

//ROUTES
const generalController = require("./controllers/general");
const mealController = require("./controllers/meals");
const userController = require("./controllers/user");

app.use("/", generalController);
app.use("/meals", mealController);
app.use("/user", userController);

mongoose.connect(`mongodb+srv://pzdankoDB:${process.env.MONGODB_KEY}@senecaweb.arekk.mongodb.net/ValhallaFeasts?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB database`);
    })
    .catch(err => console.log(`Error occurred when conecting to database ${err}`));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Web Server is up and running");
})