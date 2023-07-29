import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectAuthor from "views/features/Flow/addPost/SelectAuthor";

describe("new post > author selection", () => {
  it("should not render author selection (no place)", () => {
    render(
      <SelectAuthor userConnectedId={1} userPlaces={[]} userName="test" />
    );
    waitFor(() =>
      expect(screen.findByText("Publier en tant que :")).not.toBeInTheDocument()
    );
  });
  it("should not render author selection (inative place)", () => {
    render(
      <SelectAuthor
        userConnectedId={1}
        userPlaces={[{ active: false, id: 4, name: "myPlace" }]}
        userName="test"
      />
    );
    waitFor(() => expect(screen.findByText("myPlace")).not.toBeInTheDocument());
  });
  it("should render author selection", () => {
    render(
      <SelectAuthor
        userConnectedId={1}
        userPlaces={[{ active: true, id: 4, name: "myPlace" }]}
        userName="test"
      />
    );
    expect(screen.getByText("myPlace")).toBeInTheDocument();
  });
});
