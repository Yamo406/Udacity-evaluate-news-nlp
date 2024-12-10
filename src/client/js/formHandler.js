// Replace checkForName with a function that checks the URL
import { checkForName } from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = `https://localhost:9000/api`

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formURL = document.getElementById('name').value;

    // This is an example code that checks the submitted name. You may remove it from your code
    checkForName(formURL);

    // Check if the URL is valid
    if (URL.canParse(formURL)) {
        postURL(formURL)
            .catch(error => console.error("error in sending url", error))
        ;
    }

        // If the URL is valid, send it to the server using the serverURL constant above


}

// Function to send data to the server
const postURL = async (url) => {
    const res = await fetch(serverURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'applications/json'
        },
        body: JSON.stringify(data),
    });

}

// Export the handleSubmit function
export { handleSubmit };

