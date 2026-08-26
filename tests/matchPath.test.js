import { describe, expect, it } from "vitest";

import { matchPath } from "../src/lib/utils/matchPath";

describe("matchPath", () => {
  it("matches identical static paths", () => {
    expect(matchPath("/about", "/about")).toEqual({});
  });

  it("returns null when static paths do not match", () => {
    expect(matchPath("/about", "/contact")).toBeNull();
  });

  it("matches the root path", () => {
    expect(matchPath("/", "/")).toEqual({});
  });

  it("returns null when the route has more segments", () => {
    expect(matchPath("/users/:id", "/users")).toBeNull();
  });

  it("returns null when the pathname has more segments", () => {
    expect(matchPath("/users", "/users/12")).toBeNull();
  });

  it("extracts a single dynamic parameter", () => {
    expect(matchPath("/users/:id", "/users/12")).toEqual({
      id: "12",
    });
  });

  it("extracts multiple dynamic parameters", () => {
    expect(
      matchPath(
        "/users/:userId/posts/:postId",
        "/users/15/posts/88"
      )
    ).toEqual({
      userId: "15",
      postId: "88",
    });
  });

  it("supports text values inside dynamic parameters", () => {
    expect(matchPath("/products/:slug", "/products/red-shoes")).toEqual({
      slug: "red-shoes",
    });
  });

  it("decodes encoded parameter values", () => {
    expect(matchPath("/search/:query", "/search/hello%20world")).toEqual({
      query: "hello world",
    });
  });

  it("keeps the original value when decoding fails", () => {
    expect(matchPath("/search/:query", "/search/%E0%A4%A")).toEqual({
      query: "%E0%A4%A",
    });
  });

  it("ignores trailing slashes in the route path", () => {
    expect(matchPath("/users/:id/", "/users/12")).toEqual({
      id: "12",
    });
  });

  it("ignores trailing slashes in the pathname", () => {
    expect(matchPath("/users/:id", "/users/12/")).toEqual({
      id: "12",
    });
  });

  it("ignores trailing slashes in both paths", () => {
    expect(matchPath("/users/:id/", "/users/12/")).toEqual({
      id: "12",
    });
  });

  it("returns null when a static segment does not match", () => {
    expect(matchPath("/users/:id/edit", "/users/12/delete")).toBeNull();
  });

  it("returns null when a dynamic parameter has no value", () => {
    expect(matchPath("/users/:id", "/users/")).toBeNull();
  });

  it("is case-sensitive", () => {
    expect(matchPath("/Users/:id", "/users/12")).toBeNull();
  });

  it("does not partially match a pathname", () => {
    expect(matchPath("/users/:id", "/users/12/profile")).toBeNull();
  });
});