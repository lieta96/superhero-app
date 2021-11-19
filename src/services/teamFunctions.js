function checkNullValue(value) {
  if (value === "null") return 0;
  else return parseFloat(value);
}

function getArrayAppearence(value, team) {
  let array;
  return (array = team.map((superhero) =>
    checkNullValue(parseInt(superhero.appearance[value][1]))
  ));
}

function getArrayPowerstat(value, team) {
  let array;
  return (array = team.map((superhero) =>
    checkNullValue(superhero.powerstats[value])
  ));
}

function getTotal(value, team) {
  let total = 0;
  if (value == "height" || value == "weight") {
    getArrayAppearence(value, team).forEach((value) => (total += value));
    total = total / team.length;
    return total;
  } else getArrayPowerstat(value, team).forEach((value) => (total += value));
  total = total / team.length;
  return total;
}

function orderValues(object) {
  let objectValues = Object.values(object);
  objectValues = objectValues.sort(function (a, b) {
    return a - b;
  });
  return (objectValues = objectValues.reverse());
}

export { getTotal, orderValues };
