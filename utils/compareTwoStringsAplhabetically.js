function concatenateStringsInAscendingOrder(string1, string2) {
  // Sort strings alphabetically
  const sortedStrings = [string1, string2].sort();

  // Concatenate strings in ascending order
  const result = sortedStrings[0] + sortedStrings[1];

  return result;
}

module.exports = concatenateStringsInAscendingOrder;
