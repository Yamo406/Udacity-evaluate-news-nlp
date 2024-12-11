async function getApiResponse() {
    const req = await fetch('/api');
    return await req.json();
}

export { getApiResponse };