import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FlowCards from "../features/Flow/getPosts/FlowCards";
import { posts } from "src/__mocks__/mockedPosts";
import "src/__mocks__/intersectionObserver";
import Card from "src/features/Flow/getPosts/Card";

// jest.mock("react", () => {
//   const { useRef, useEffect } = jest.requireActual("react");

//   return {
//     ...jest.requireActual("react"),
//     useRef: jest.fn(),
//     useEffect: jest.fn(),
//   };
// });

test("should render a loader if there is no post", () => {
  render(
    <FlowCards
      posts={[]}
      userConnectedId={1}
      newLimit={() => console.log("noPost")}
    />
  );
  expect(
    screen.getByText("Publications en cours de chargement...")
  ).toBeInTheDocument();
});

describe("should render a card if there is a post", () => {
  it("should render a card if there is a post", () => {
    render(<Card post={posts[0]} userConnectedId={1} displayAvatar />);
    expect(screen.getByText("Quand je pense bien patiner")).toBeInTheDocument();
    expect(screen.queryByTestId("price")).not.toBeInTheDocument();
  });
  it("should render a price if it is a SALE post", () => {
    render(<Card post={posts[1]} userConnectedId={1} displayAvatar />);
    expect(screen.getByTestId("price")).toBeInTheDocument();
  });
});
