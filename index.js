import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = "http://api.weatherapi.com/v1/current.json";
const API_KEY = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req,res) => {
    res.render("index.ejs");
});
    

app.listen(PORT, () => {
    console.log(`Server Running on port : ${PORT}`);
});