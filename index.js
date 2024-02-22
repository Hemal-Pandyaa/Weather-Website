import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = "http://api.weatherapi.com/v1/current.json";
const API_KEY = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.redirect("/home")
})

app.get("/home", async (req, res) => {
    const location =  req.query.location || "London";
    console.log(location)
    const URL = `${API_URL}?key=${API_KEY}&q=${location}`;
    console.log(URL)

    // Axios request to api for default location
    const data = await get(URL);
    if (data.error) {
        res.render("error.ejs");
    } else {
        let locData = {
            data: data,
        };

        res.render("index.ejs", locData);
    }
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
