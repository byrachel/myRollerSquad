// import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { cardColor } from "src/utils/colorManager";

describe("display the right categorie color > flow", () => {
  it("dark color if bad category is passed", () => {
    expect(cardColor(0)).toBe("grey");
  });
  it("green color if selected category is 1", () => {
    expect(cardColor(1)).toBe("green");
  });
});
