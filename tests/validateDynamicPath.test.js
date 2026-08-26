import { describe, expect, it } from "vitest";

import { validateDynamicPath } from "../src/lib/utils/validateDynamicPath";

describe("validateDynamicPath", () => {
  it("accepts static paths", () => {
    expect(() => validateDynamicPath("/users")).not.toThrow();
  });

  it("accepts the wildcard route", () => {
    expect(() => validateDynamicPath("*")).not.toThrow();
  });

  it("accepts a single dynamic parameter", () => {
    expect(() => validateDynamicPath("/users/:id")).not.toThrow();
  });

  it("accepts multiple dynamic parameters", () => {
    expect(() =>
      validateDynamicPath("/users/:userId/posts/:postId")
    ).not.toThrow();
  });

  it("accepts parameters starting with '_'", () => {
    expect(() =>
      validateDynamicPath("/users/:_id")
    ).not.toThrow();
  });

  it("accepts parameters starting with '$'", () => {
    expect(() =>
      validateDynamicPath("/users/:$id")
    ).not.toThrow();
  });

  it("accepts numbers after the first character", () => {
    expect(() =>
      validateDynamicPath("/users/:user123")
    ).not.toThrow();
  });

  it("throws when a parameter has no name", () => {
    expect(() =>
      validateDynamicPath("/users/:")
    ).toThrow(
      'Dynamic route parameter in path "/users/:" must have a name.'
    );
  });

  it("throws when the parameter starts with a number", () => {
    expect(() =>
      validateDynamicPath("/users/:123id")
    ).toThrow(
      'Invalid dynamic route parameter "123id" in path "/users/:123id".'
    );
  });

  it("throws when the parameter contains '-'", () => {
    expect(() =>
      validateDynamicPath("/users/:user-id")
    ).toThrow(
      'Invalid dynamic route parameter "user-id" in path "/users/:user-id".'
    );
  });

  it("throws when the parameter contains spaces", () => {
    expect(() =>
      validateDynamicPath("/users/:user id")
    ).toThrow(
      'Invalid dynamic route parameter "user id" in path "/users/:user id".'
    );
  });

  it("throws when the parameter contains '@'", () => {
    expect(() =>
      validateDynamicPath("/users/:@id")
    ).toThrow(
      'Invalid dynamic route parameter "@id" in path "/users/:@id".'
    );
  });

  it("throws when duplicate parameter names exist", () => {
    expect(() =>
      validateDynamicPath("/users/:id/posts/:id")
    ).toThrow(
      'Duplicate dynamic route parameter "id" in path "/users/:id/posts/:id".'
    );
  });

  it("treats parameter names as case-sensitive", () => {
    expect(() =>
      validateDynamicPath("/users/:id/posts/:Id")
    ).not.toThrow();
  });

  it("allows '_' as a parameter name", () => {
    expect(() =>
      validateDynamicPath("/users/:_")
    ).not.toThrow();
  });

  it("allows '$' as a parameter name", () => {
    expect(() =>
      validateDynamicPath("/users/:$")
    ).not.toThrow();
  });
});