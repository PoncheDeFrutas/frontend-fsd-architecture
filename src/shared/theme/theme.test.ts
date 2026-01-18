import { describe, expect, it } from "vitest";
import { resolveDark } from "./theme";

describe("resolveDark", () => {
    it("forces dark mode when mode is dark", () => {
        expect(resolveDark("dark", false)).toBe(true);
    });

    it("forces light mode when mode is light", () => {
        expect(resolveDark("light", true)).toBe(false);
    });

    it("uses system preference when mode is system", () => {
        expect(resolveDark("system", true)).toBe(true);
        expect(resolveDark("system", false)).toBe(false);
    });
});
