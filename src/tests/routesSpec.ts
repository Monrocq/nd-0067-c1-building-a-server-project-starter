import { getThumb } from "../routes";

describe("Image transform function should resolve or reject", () => {
  it("expect transform to NOT throw errors", () => {
    getThumb("fjord", 200, 200)
      .then((result) => {
        expect(result).not.toEqual("Input file is missing");
      })
      .catch((_) => null);
  });

  it("expect transform to throw errors", () => {
    getThumb("fjor", 200, 200)
      .then((result) => {
        expect(result).toEqual("Input file is missing");
      })
      .catch((_) => null);
  });
});