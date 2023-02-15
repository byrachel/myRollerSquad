import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { cardColor } from "utils/colorManager";

// describe('Home', () => {
//   it('renders a heading', () => {
//     render(<Places />)

//     const heading = screen.getByRole('heading', {
//       name: /Places/i,
//     })

//     expect(heading).toBeInTheDocument()
//   })
// })

describe("color card when bad id passed", () => {
  it("color", () => {
    const result = cardColor(null);

    expect(result).toBe("dark");
  });
});
