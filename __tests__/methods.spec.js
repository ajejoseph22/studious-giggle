const { centralLondonCoordinates } = require("../src/util/constants");
const {
  sortPartnersByNameAscending,
  getMatchingPartners,
  getDistanceBetweenCoordinates,
  degreeToRadian,
  getCoordinatesFromString,
  getCompareFunction,
} = require("../src/util/methods");

describe("getDistanceBetweenCoordinates", () => {
  it("should return the correct distance between 2 coordinates", () => {
    // Arrange
    const dummyCoordinates = [51.5021767, -0.0713608451999451];

    // Act
    const result = getDistanceBetweenCoordinates([
      ...centralLondonCoordinates,
      ...dummyCoordinates,
    ]);

    // Assert
    const expectedResult = 5.046;
    expect(+result.toFixed(4)).toBe(expectedResult);
  });
});

describe("getMatchingPartners", () => {
  it("should return the correct list of matching partners", () => {
    // Act
    const result = getMatchingPartners();

    // Assert
    expect(result.length).toBe(2);
    expect(result[0].organization).toBe("Blue Square 360");
    expect(result[1].organization).toBe("Gallus Consulting");
  });
});

describe("sortPartnersByNameAscending", () => {
  it("should sort a list of partners by organization name in ascending order", () => {
    // Arrange
    const unsortedPartners = [
      {
        organization: "Gallus Consulting",
        offices: [
          {
            location: "Northampton",
            address:
              "Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG",
            coordinates: "52.277409,-0.877935999999977",
          },
          {
            location: "London",
            address: "No1 Royal Exchange, London, EC3V 3DG",
            coordinates: "51.5136102,-0.08757919999993646",
          },
          {
            location: "Manchester",
            address: "3 Hardman Square, Spinningfields, Manchester, M3 3EB",
            coordinates: "53.47990859999999,-2.2510892999999896",
          },
        ],
      },
      {
        organization: "Blue Square 360",
        offices: [
          {
            location: "Singapore",
            address:
              "Ocean Financial Centre, Level 40, 10 Collyer Quay, Singapore, 049315",
            coordinates: "1.28304,103.85199319999992",
          },
          {
            location: "London, UK",
            address: "St Saviours Wharf, London SE1 2BE",
            coordinates: "51.5014767,-0.0713608999999451",
          },
        ],
      },
    ];

    // Act
    const sortedPartners = sortPartnersByNameAscending(unsortedPartners);

    // Assert
    expect(sortedPartners[0].organization).toBe("Blue Square 360");
    expect(sortedPartners[1].organization).toBe("Gallus Consulting");
  });
});

describe("degreeToRadian", () => {
  it("should return the radian equivalent of a degree value", () => {
    // Arrange
    const degree = 90;

    // Act
    const radian = degreeToRadian(degree);

    // Assert
    const expectedRadian = 1.5708;
    expect(+radian.toFixed(4)).toBe(expectedRadian);
  });
});

describe("getCompareFunction", () => {
  it("should return the correct compare function", () => {
    // Arrange
    const items = [
      { name: "Phil", age: 25 },
      { name: "Adrian", age: 25 },
      { name: "Adrian", age: 19 },
    ];

    // Act
    const compareFn = getCompareFunction("name");
    const itemsSortedByNameAscending = items.sort(compareFn);

    // Assert
    const expectedResult = [
      { name: "Adrian", age: 25 },
      { name: "Adrian", age: 19 },
      { name: "Phil", age: 25 },
    ];
    expect(itemsSortedByNameAscending).toEqual(expectedResult);
  });
});

describe("getCoordinatesFromString", () => {
  it("should return the correct array of number coordinates from a comma-separated string value of coordinates", () => {
    // Arrange
    const stringCoordinates = "52.277409,-0.877935999999977";

    // Act
    const numberCoordinates = getCoordinatesFromString(stringCoordinates);

    // Assert
    expect(numberCoordinates).toEqual([52.277409, -0.877935999999977]);
  });
});
