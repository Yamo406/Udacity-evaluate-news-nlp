import { getApiResponse } from "../src/client/js/getApiResponse";

test("getApiResponse should return expected data", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    polarity: "Positive",
                    subjectivity: "factual",
                    text: "Some text",
                }),
        })
    );

    const response = await getApiResponse();
    expect(response).toEqual({
        polarity: "Positive",
        subjectivity: "factual",
        text: "Some text",
    });
});

descirbe("Testing the getApiResponse functionality", () => {
    test("test the getApiResponse() function", () => {
        expect(getApiResponse).toBeDefined();
    });
});