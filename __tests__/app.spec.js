const { exists, unlink, readFile } = require("fs");
const { promisify } = require("util");

const app = require("../src/app");
const { pathToMatchingPartners } = require("../src/util/constants");

let fileExistsPromise, unlinkPromise;

beforeAll(async () => {
  fileExistsPromise = promisify(exists);
  unlinkPromise = promisify(unlink);

  try {
    if (await fileExistsPromise(pathToMatchingPartners)) {
      await unlinkPromise(pathToMatchingPartners);
    }
  } catch (error) {
    console.log(error);
  }
});

describe("app", () => {
  it(`should create a file called matching-partners.json containing 
      an array of partners' data (limited to organization name and office addresses)`, async () => {
    // Act
    await app();

    // Assert
    expect(await fileExistsPromise(pathToMatchingPartners)).toBe(true);

    const readFilePromise = promisify(readFile);
    const matchingPartners = JSON.parse(
      await readFilePromise(pathToMatchingPartners)
    );

    expect(matchingPartners.length).toBe(2);
    expect(Object.keys(matchingPartners[0])).toEqual([
      "organization",
      "offices",
    ]);
    expect(matchingPartners[0].organization).toBe("Blue Square 360");
    expect(matchingPartners[1].organization).toBe("Gallus Consulting");
  });
});
