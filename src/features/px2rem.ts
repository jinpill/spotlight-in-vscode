import calculate from "./calculate";

const run = (input: string) => {
  const expression = getExpression(input);
  if (expression === null) return input;

  const calculated = Number(calculate.run(expression)) / 16;
  const result = calculated + "rem";
  return result;
};

const check = (input: string) => {
  const expression = getExpression(input);
  if (expression === null) return false;
  return calculate.check(expression);
};

const getExpression = (input: string) => {
  const lowerCased = input.toLowerCase();

  if (lowerCased.indexOf(" to rem") !== -1) {
    const expression = lowerCased.split(" to rem")[0];
    return expression;
  }

  if (lowerCased.indexOf(" torem") !== -1) {
    const expression = lowerCased.split(" torem")[0];
    return expression;
  }

  return null;
};

export default {
  run,
  check,
};
