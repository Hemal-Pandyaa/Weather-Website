import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = "http://api.weatherapi.com/v1/current.json";
const API_KEY = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", async (req,res) => {
    const URL = `${API_URL}?key=${API_KEY}&q=London`;
    const response = await axios.get(URL).then(
        (response) => {
            if(response.ok){
                let data = response.data;
            }
        }
    ).catch(
        (error) => {
            let data = data.error.message;
        }
    );

    let locData = {
        data:data
    };

    res.render("index.ejs", locData);
});
    

app.listen(PORT, () => {
    console.log(`Server Running on port : ${PORT}`);
});