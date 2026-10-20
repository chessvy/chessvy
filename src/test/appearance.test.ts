import { describe, expect, it } from "vitest";
import { readAppearance } from "@/lib/chess/appearance";

describe("Board customization", () => {
  it("restores a selected board color", () => {
    expect(readAppearance({ board: "walnut" }).board).toBe("walnut");
  });
  it("restores a selected piece set", () => {
    expect(readAppearance({ pieces: "merida" }).pieces).toBe("merida");
  });
  it("rejects unavailable appearance choices", () => {
    expect(readAppearance({ board: "missing", pieces: "missing" })).toEqual({ board: "stone", pieces: "classic" });
  });
});