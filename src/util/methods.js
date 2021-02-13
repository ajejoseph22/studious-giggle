const {
  earthRadiusInKm,
  piRadian,
  centralLondonCoordinates,
} = require("./constants");
const data = require("../../data/partners.json");

/**
 * Returns the radian equivalent of a degree value
 * @param {number} degree - the degree value
 */
function degreeToRadian(degree) {
  return degree * piRadian;
}

/**
 * Returns the distance between 2 coordinates (in KM)
 * @param {Array.<number>} arrayOfCoordinates - an array of 2 sets of
 * coordinates in the form [latitude1, longitude1, latitude2, longitude2]
 */
function getDistanceBetweenCoordinates(arrayOfCoordinates) {
  const { cos, sin, abs, acos } = Math;
  const [
    latitude1InRadians,
    longitude1InRadians,
    latitude2InRadians,
    longitude2InRadians,
  ] = arrayOfCoordinates.map(degreeToRadian);
  const differenceInLongitude = abs(longitude2InRadians - longitude1InRadians);
  const centralAngle =
    sin(latitude1InRadians) * sin(latitude2InRadians) +
    cos(latitude1InRadians) *
      cos(latitude2InRadians) *
      cos(differenceInLongitude);

  return acos(centralAngle) * earthRadiusInKm;
}

/** Returns an array of 2 coordinate values of type 'number'
 * from a coordinate string
 * @param {string} coordinateString - the stringified coordinate
 */
function getCoordinatesFromString(coordinateString) {
  return coordinateString.split(",").map((value) => +value);
}

/** Returns a method for sorting a json array by a given property
 * in ascending order
 * @param {string} property - the property by which to be sorted
 */
function getCompareFunction(property) {
  return (a, b) => {
    if (a[property] > b[property]) {
      return 1;
    } else if (a[property] < b[property]) {
      return -1;
    }

    return 0;
  };
}

/**
 * Returns the matching partners (partners that have offices within
 * 100KM of central London), limiting their information to organization
 * name and offices, as a JSON array
 */
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

/** Returns a a list of partners, sorted by organization name in ascending order
 * @param {Array} partners - the array of partners to be sorted
 */
function sortPartnersByNameAscending(partners) {
  return partners.sort(getCompareFunction("organization"));
}

module.exports = {
  getMatchingPartners,
  sortPartnersByNameAscending,
  getDistanceBetweenCoordinates,
  degreeToRadian,
  getCoordinatesFromString,
  getCompareFunction
};
