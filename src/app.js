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
  await promisify(writeFile)(
    pathToMatchingPartners,
    sortedMatchingPartnersData
  );
}

module.exports = app;
