import calculate from "./calculate";

const run = (input: string) => {
  const expression = getExpression(input);
  if (expression === null) return input;

  const calculated = Number(calculate.run(expression)) * 16;
  const result = calculated + "px";
  return result;
};

const check = (input: string) => {
  const expression = getExpression(input);
  if (expression === null) return false;
  return calculate.check(expression);
};

const getExpression = (input: string) => {
  const lowerCased = input.toLowerCase();

  if (lowerCased.indexOf(" to px") !== -1) {
    const expression = lowerCased.split(" to px")[0];
    return expression;
  }

  if (lowerCased.indexOf(" topx") !== -1) {
    const expression = lowerCased.split(" topx")[0];
    return expression;
  }

  return null;
};

export default {
  run,
  check,
};
