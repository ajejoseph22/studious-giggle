const { writeFile } = require("fs");
const { promisify } = require("util");

const { pathToMatchingPartners } = require("./util/constants");
const {
  sortPartnersByNameAscending,
  getMatchingPartners,
} = require("./util/methods");

async function app() {
  const sortedMatchingPartnersData = JSON.stringify(
    sortPartnersByNameAscending(getMatchingPartners())
  );
  const writeFilePromise = promisify(writeFile);

  await writeFilePromise(pathToMatchingPartners, sortedMatchingPartnersData);
}

module.exports = app;
