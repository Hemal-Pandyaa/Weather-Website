import express, { application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = "http://api.weatherapi.com/v1/";
const API_KEY = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.redirect("/home")
})

app.get("/home", async (req, res) => {
    const location =  req.query.location || "London";
    const date = getDate();

    const URL = `${API_URL}forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=yes&alerts=yes`;

    const data = await get(URL);
    if (data.error) {
        console.log(data.error)
        return data.error
    }
    console.log(data);

    const localtime = data.location.localtime
    const current_date = `${localtime.slice(8,10)}-${localtime.slice(5,7)}-${localtime.slice(0,4)}`

    let loc_data = {
        data:data,
        current_date:current_date
    }

    res.render("index.ejs",loc_data)
    
});

app.post("/search", (req, res) => {
    const location = req.body["location"];
    res.redirect(`/home?location=${location}`);
});

app.listen(PORT, () => {
    console.log(`Server Running on port : ${PORT}`);
});

async function get(URL) {
    let data;
    try {
        const response = await axios.get(URL);
        data = response.data;
    } catch (error) {
        data = { error: error.message };
    }

    return data;
}

function getDate(){
    const date = new Date();
    let todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return todayDate;
}

async function getData(URL){
    const data = await get(URL);
    if (data.error) {
        console.log(data.error)
        return data.error
    }
    console.log(data);
    return data;
}