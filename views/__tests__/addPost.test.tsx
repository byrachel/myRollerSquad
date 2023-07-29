import "@testing-library/jest-dom";
import { NewPostFactory } from "views/features/Flow/addPost/utils/NewPostFactory";
import {
  newFactoryPostByPlace,
  newFactorySalePost,
  newFactoryStoryPost,
  newPostByPlace,
  newSalePost,
  newStoryPost,
} from "views/__mocks__/mockedNewPost";

describe("NewPostFactory", () => {
  it("should return a story post", () => {
    const newPostFactory = new NewPostFactory();
    const newPostToSave = newPostFactory.create(newStoryPost);
    expect(newPostToSave).toEqual(newFactoryStoryPost);
  });

  it("should return a Sale post", () => {
    const newPostFactory = new NewPostFactory();
    const newPostToSave = newPostFactory.create(newSalePost);
    expect(newPostToSave).toEqual(newFactorySalePost);
  });

  it("should return a post with place as author", () => {
    const newPostFactory = new NewPostFactory();
    const newPostToSave = newPostFactory.create(newPostByPlace);
    expect(newPostToSave).toEqual(newFactoryPostByPlace);
  });
});
