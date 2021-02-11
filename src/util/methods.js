const { earthRadiusInKm, piRadian } = require("./constants");

/**
 * Returns the distance between 2 coordinates (in KM)
 * @constructor
 * @param {Array.<number>} arrayOfCoordinates - the first latitude coordinate
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

/**
 * Returns the radian equivalent of a degree value
 * @constructor
 * @param {number} degree - the degree value
 */
function degreeToRadian(degree) {
  return degree * piRadian;
}

/** Returns an array of 2 coordinate values of type 'number'
 * @constructor
 * @param {string} coordinateString - the first latitude coordinate
 */
function getCoordinatesFromString(coordinateString) {
  return coordinateString.split(",").map((value) => +value);
}

module.exports = {
  getDistanceBetweenCoordinates,
  getCoordinatesFromString,
};
