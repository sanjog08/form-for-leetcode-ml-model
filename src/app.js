const express = require("express");
require("./db/conn");
const Leet = require("./models/schema");
const app = express();
const bodyParser = require("body-parser")
const port = process.env.PORT  || 8800;

// to get data from the postman in our terminal
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Homepage
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>LeetCode Form</title>
        </head>
        <body>
            <h1>Submit Your LeetCode Stats</h1>
            <form action="/submit" method="post">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name"><br><br>
                <label for="easy">Easy:</label>
                <input type="number" id="easy" name="easy"><br><br>
                <label for="medium">Medium:</label>
                <input type="number" id="medium" name="medium"><br><br>
                <label for="hard">Hard:</label>
                <input type="number" id="hard" name="hard"><br><br>
                <label for="leetcodeRank">LeetCode Rank:</label>
                <input type="number" id="leetcodeRank" name="leetrank"><br><br>
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
    `);
});


// submit user leetcode data
app.post("/submit", async (req, res) => {

    console.log(req.body);
    let user;
    try{
        user = new Leet(req.body);
        await user.save();
    }catch(err){
        console.log(err);
        res.status(404).send(err.message);
        return 
    }
    res.status(201).send(user);
});


// get method to display all data 
app.get("/users", async (req, res) => {

    try {
        const users = await Leet.find();
        res.send(users);
    }catch (err) {
        res.send(err);
    }

});



app.listen(port, () => {
    console.log(`server is listening at port number --> ${port} <--`);
});