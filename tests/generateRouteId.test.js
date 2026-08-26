import { describe, it, expect } from "vitest";
import { generateRouteId } from "../src/lib/utils/generateRouteId";

describe("generateRouteId", () => {
    it("returns 'root' for the root path", () => {
        expect(generateRouteId("/")).toBe("root");
    });

    it("returns 'not-found' for the wildcard route", () => {
        expect(generateRouteId("*")).toBe("not-found");
    });

    it("generates an id from a static path", () => {
        expect(generateRouteId("/users")).toBe("users");
    });

    it("generates an id from nested static paths", () => {
        expect(generateRouteId("/users/profile")).toBe("users-profile");
    });

    it("generates an id for a single dynamic parameter", () => {
        expect(generateRouteId("/users/:id")).toBe("users-param-id");
    });

    it("generates an id for multiple dynamic parameters", () => {
        expect(
            generateRouteId("/users/:userId/posts/:postId")
        ).toBe("users-param-userId-posts-param-postId");
    });

    it("removes leading and trailing slashes", () => {
        expect(generateRouteId("/users/profile/")).toBe("users-profile");
    });

    it("replaces unsupported characters with '-'", () => {
        expect(generateRouteId("/users/@admin")).toBe("users-admin");
    });

    it("collapses repeated hyphens into one", () => {
        expect(generateRouteId("/users/---admin")).toBe("users-admin");
    });

    it("preserves underscores", () => {
        expect(generateRouteId("/user_profile")).toBe("user_profile");
    });

    it("returns the same id for the same path", () => {
        expect(generateRouteId("/users/:id")).toBe(
            generateRouteId("/users/:id")
        );
    });

    it("does not return an empty string for valid paths", () => {
        expect(generateRouteId("/about")).not.toBe("");
    });
});