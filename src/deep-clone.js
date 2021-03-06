/**
 * Returns a deep clone of the argument object passed in
 * @param {Object} inputObject - the object to be deep cloned
 */
function deepClone(inputObject) {
  // Return the value if 'inputObject' is
  // either not an object, null or a date
  if (
    typeof inputObject !== "object" ||
    inputObject === null ||
    inputObject instanceof Date
  )
    return inputObject;

  // Create an array or object to hold the cloned values
  const output = Array.isArray(inputObject) ? [] : {};

  // Recursively copy nested objects and arrays
  for (const key in inputObject) {
    output[key] = deepClone(inputObject[key]);
  }

  return output;
}

module.exports = deepClone;
