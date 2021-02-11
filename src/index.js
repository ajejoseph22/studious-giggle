const fs = require("fs");

const { centralLondonCoordinates } = require("./util/constants");
const data = require("../data/partners.json");
const {
  getDistanceBetweenCoordinates,
  getCoordinatesFromString,
} = require("./util/methods");

function getMatchingPartners() {
  return data.reduce((acc, { organization, offices }) => {
    if (
      offices.find(
        ({ coordinates }) =>
          getDistanceBetweenCoordinates(
            centralLondonCoordinates.concat(
              getCoordinatesFromString(coordinates)
            )
          ) <= 100
      )
    ) {
      acc.push({ organization, offices });
    }
    return acc;
  }, []);
}

const matchingPartnersData = JSON.stringify(getMatchingPartners());
fs.writeFile("data/matching-partners.json", matchingPartnersData, (error) => {
  if (error) console.error(error);
});
