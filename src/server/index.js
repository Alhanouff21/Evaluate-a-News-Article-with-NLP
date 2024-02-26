// dotenv package 
const dotenv = require('dotenv');
dotenv.config();

// path module 
const path = require("path");

// express module 
const express = require("express");

// cors module 
const cors = require("cors");

// axios module for making HTTP requests
const axios = require("axios");

// Create an instance of the express application
const app = express();

/* Start Of Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cors for cross origin allowance
app.use(cors());
/* End Of Middleware*/

app.use(express.static("dist"));

console.log(__dirname);


app.get("/", function (req, res) {
  res.sendFile("dist/index.html", { root: __dirname + "/.." });
});

const API_KEY = process.env.API_KEY;

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})



// Route to handle form submission
app.post("/analyze", analyzeArticle);

async function analyzeArticle(req, res) {
  try {
    const { userInput} = req.body;

    // Validate the URL input
    if (!userInput) {
      return res.status(400).json({ error: "Input cannot be blank." });
    }

    // Make the API request and get the analysis result
    const analysisResult = await performSentimentAnalysis(userInput);

    return res.status(200).json(analysisResult);
  } catch (error) {
    console.error("Error during API request:", error);
    return res.status(500).json({ error: "Failed to analyze the URL." });
  }
}

async function performSentimentAnalysis(userInput) {
  try {
    // Make a request to the meaningcloud Sentiment Analysis API
    const response = await axios.post(
      `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&txt=${userInput}&lang=en`
    );

    return response.data;
  } catch (error) {
    console.error("Error during sentiment analysis:", error);
    throw new Error("Failed to perform sentiment analysis.");
  }
}