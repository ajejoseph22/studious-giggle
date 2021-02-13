const { writeFile } = require("fs");
const { promisify } = require("util");

const { pathToMatchingPartners } = require("./util/constants");
const {
  sortPartnersByNameAscending,
  getMatchingPartners,
} = require("./util/methods");

/** Reads data from data/partners.json and writes
 * a sorted array of the matching partners (with offices
 * within 100km of central London) to data/matching-partners.json
 */
async function app() {
  // Get the matching partners
  const matchingPartners = getMatchingPartners();

  // Sort the partners by name in ascending order
  const sortedMatchingPartnersData = JSON.stringify(
    sortPartnersByNameAscending(matchingPartners)
  );

  // Write the result to data/matching-partners.json
  const writeFilePromise = promisify(writeFile);
  await writeFilePromise(pathToMatchingPartners, sortedMatchingPartnersData);
}

module.exports = app;
