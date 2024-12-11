const projectData = {}
var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);

// Designates what port the app will listen to for incoming requests
const PORT = 9000;

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

// Variables for url and api key
const API_URL = `https://api.meaningcloud.com/sentiment-2.1?`;

const meaningcloudAPI = {
    url: `${API_URL}`,
    key: `${process.env.API_KEY}`,
};

app.get("/", function (request, response) {
    response.sendFile("dist/index.html");
});

// POST Route
app.post("/api", async function (request, response) {
    try {
        let requestURL = request.body.url;  // Note the .url here
        const apiData = await getSentimentAnalysis(requestURL);

        const apiResponse = {
            polarity: apiData.score_tag,
            subjectivity: apiData.subjectivity,
            text: apiData.sentence_list[0].text,
        };

        if (apiResponse.polarity == 'P' || apiResponse.polarity == 'P+') {
            apiResponse.polarity = "Positive";
        } else if (apiResponse.polarity == 'N' || apiResponse.polarity == 'N+') {
            apiResponse.polarity = "Negative";
        }

        if (apiResponse.subjectivity == "SUBJECTIVE") {
            apiResponse.subjectivity = "subjective";
        } else if (apiResponse.subjectivity == "OBJECTIVE") {
            apiResponse.subjectivity = "factual";
        }

        projectData.polarity = apiResponse.polarity;
        projectData.subjectivity = apiResponse.subjectivity;
        projectData.text = apiResponse.text;

        response.status(200).send(projectData);

    } catch (error) {
        console.error("MeaningCloud API Error: ", error);
        response.status(500).send({ error: "Failed to process URL" });
    }
});

app.get('/api', (request, response) => {
    response.send(projectData);
})

const getSentimentAnalysis = async (formURL) => {
    try {
        const formData = new FormData();
        formData.append("key", meaningcloudAPI.key);
        formData.append("url", formURL);

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow",
        };

        const response = await fetch(meaningcloudAPI.url, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiData = await response.json();
        return apiData;

    } catch (error) {
        console.error("MeaningCloud API Error: ", error);
        throw error;
    }
};
