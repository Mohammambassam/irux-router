import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { useParams } from "../src/lib/hooks/useParams";
import { ParamsContext } from "../src/lib/context/ParamsContext";

function TestComponent() {
  const params = useParams();

  return (
    <div>
      {JSON.stringify(params)}
    </div>
  );
}

describe("useParams", () => {
  it("returns route params from ParamsContext", () => {
    render(
      <ParamsContext.Provider
        value={{
          id: "15",
          postId: "99",
        }}
      >
        <TestComponent />
      </ParamsContext.Provider>
    );

    expect(screen.getByText('{"id":"15","postId":"99"}')).toBeInTheDocument();
  });

  it("returns an empty object when there are no params", () => {
    render(
      <ParamsContext.Provider value={{}}>
        <TestComponent />
      </ParamsContext.Provider>
    );

    expect(screen.getByText("{}")).toBeInTheDocument();
  });

  it("throws when used outside ParamsContext", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useParams() must be used inside a matched Route."
    );
  });
});