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
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: #f9f9f9;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    text-align: center;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                input[type="text"], input[type="number"] {
                    width: 100%;
                    padding: 8px;
                    box-sizing: border-box;
                }
                button {
                    display: block;
                    width: 100%;
                    padding: 10px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 1.1em;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #45a049;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Help Us to Train Our Model...</h2>
                <form action="/submit" method="post">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name">
                    </div>
                    <div class="form-group">
                        <label for="easy">Easy:</label>
                        <input type="number" id="easy" name="easy">
                    </div>
                    <div class="form-group">
                        <label for="medium">Medium:</label>
                        <input type="number" id="medium" name="medium">
                    </div>
                    <div class="form-group">
                        <label for="hard">Hard:</label>
                        <input type="number" id="hard" name="hard">
                    </div>
                    <div class="form-group">
                        <label for="leetcodeRank">LeetCode Rank:</label>
                        <input type="number" id="leetcodeRank" name="leetrank">
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div class="footer">
                    <p>If you have any questions or concerns, please <a href="mailto:sanjogbhatia8@gmail.com">email us</a>.</p>
                </div>
            </div>
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