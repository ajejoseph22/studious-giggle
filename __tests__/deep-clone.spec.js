const deepClone = require("../src/deep-clone");

describe("deepClone", () => {
  it("should return a deepClone of the argument object", () => {
    // Arrange
    const inputObject = {
      name: "Mike",
      data: { height: "2m", talents: ["singing", "dancing", "running"] },
      date: new Date(),
    };

    // Act
    const result = deepClone(inputObject);

    // Assert
    expect(result).toEqual(inputObject);
  });
});
