// js files
import { handleSubmit } from "./js/formHandler";
import { getApiResponse } from "./js/getApiResponse";

// sass files
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

// service worker
 if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/service-worker.js').then(registration => {
       console.log('SW registered: ', registration);
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
 }

async function updateResults() {
    try {
        const apiResponse = await getApiResponse();

        const results = document.querySelector("#results");
        results.innerHTML = '';

        const resultsFragment = new DocumentFragment();

        const subjectivity = document.createElement("div");
        const polarity = document.createElement("div");
        const text = document.createElement("div");

        subjectivity.textContent = `Subjectivity: ${apiResponse.subjectivity}`;
        polarity.textContent = `Polarity: ${apiResponse.polarity}`;
        text.textContent = `Text: ${apiResponse.text}`;

        resultsFragment.appendChild(subjectivity);
        resultsFragment.appendChild(polarity);
        resultsFragment.appendChild(text);

        results.appendChild(resultsFragment);

    } catch (error) {
        console.error("Error fetching API response: ", error);
    }
}

document.querySelector("#urlForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleSubmit(event);
    await updateResults();
})