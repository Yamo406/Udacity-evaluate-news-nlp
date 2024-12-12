import { checkUrl } from "../src/client/js/urlChecker";

test("check if url is valid", () => {
    expect(checkUrl("https://www.google.com")).toBe("https://www.google.com");
});

test("check if url is invalid", () => {
    expect(checkUrl("")).toBeNull();
});

descirbe("Testing the url checker functionality", () => {
    test("test the checkUrl() function", () => {
        expect(checkUrl).toBeDefined();
    });
});
