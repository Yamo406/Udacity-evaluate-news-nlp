import { checkUrl } from "./urlChecker";

async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formURL = document.querySelector("#url").value;

    // Check if the URL is valid
    if (checkUrl(formURL)) {
        try {
            await postUrl(formURL);
        } catch (error) {
            console.error("error in sending url", error)
        }
    } else {
        console.error(`URL is invalid`);
    }
}

// Function to send data to the server
const postUrl = async (url) => {
    try {
        const response = await fetch('/api', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error sending URL:`, error);
        throw error;
    }
};

// Export the handleSubmit function
export { handleSubmit };