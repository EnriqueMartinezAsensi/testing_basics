import { describe, expect, it } from "vitest";
import canReconfigure from "../src/canReconfigure";

describe("canReconfigure", () => {
  /* it("should be a function", () => {
    expect(canReconfigure).toBeTypeOf("function");
  }); */
  it("should throw if the first parameter is missing or not a string", () => {
    expect(() => canReconfigure()).toThrow();
  });
  it("should throw if the second parameter is missing or not a string", () => {
    expect(() => canReconfigure("a", 1)).toThrow();
  });
  it("should return a boolean", () => {
    expect(canReconfigure("a", "b")).toBeTypeOf("boolean");
  });
  it("should returen false if first and seccond parameters length are different", () => {
    expect(canReconfigure("abc", "de")).toBe(false);
  });
  it("should return false if parameters have a different number of unique letters", () => {
    expect(canReconfigure("abc", "dee")).toBe(false);
  });
  it("should return false if strings convert applies different transformations", () => {
    expect(canReconfigure("XBOX", "XXBO")).toBe(false);
  });
});
