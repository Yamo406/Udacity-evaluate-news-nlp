// js files
import { handleSubmit } from './js/formHandler';
import { checkForName } from './js/nameChecker';

// sass files
import './styles/resets.scss';
import './styles/base.scss';
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

const analyzeSentiment = async (url) => {
    try {
        const formData = new FormData();
        formData.append("key", meaningcloudAPI.key);
        formData.append("url", url);

        const requestOptions = {
            method: "POST",
            body: formData,
            redirect: "follow",
        };

        const response = await fetch(meaningcloudAPI.url, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("MeaningCloud API Error: ", error);
        throw error;
    }
};