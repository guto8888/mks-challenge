import Home from "../src/app/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";


global.fetch = jest.fn(() =>
Promise.resolve({
  json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
})
);

beforeEach(() => {
fetch.mockClear();
});

describe("ToCart", () => {
    it("renders a cart", async() => {
        render(<Home />);
        expect(screen.findByTestId("addCart")).toBeDefined();
        expect(screen.findByTestId("removeCart")).toBeDefined();
        expect(screen.findByTestId("less")).toBeDefined();
        expect(screen.findByTestId("more")).toBeDefined();
    });
  });