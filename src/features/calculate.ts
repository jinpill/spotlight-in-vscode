const run = (input: string): string => {
  const normalized = normalize(input);
  const calculated = eval(normalized).toString();
  return calculated;
};

const check = (input: string) => {
  const normalized = normalize(input);

  // 사칙연산을 제외한 문자가 포함되어 있는지 확인.
  const hasInvalidCharacter = /[^0-9+\-*/().]/g.test(normalized);
  // 숫자와 사칙연산 기호가 연속으로 2번 이상 나오는지 확인.
  const hasInvalidExpression = /[+\-*/]{2}/.test(normalized);
  // 괄호의 짝이 맞는지 확인.
  const hasInvalidBracket = !checkBrackets(normalized);

  return !hasInvalidCharacter && !hasInvalidExpression && !hasInvalidBracket;
};

const normalize = (input: string) => input.replace(/\s/g, "");

const checkBrackets = (input: string) => {
  const stack = [];

  for (const char of input) {
    if (char === "(") {
      stack.push(char);
      continue;
    }

    if (char === ")") {
      const openBracket = stack.pop();
      if (!openBracket) return false;
    }
  }

  return stack.length === 0;
};

export default {
  run,
  check,
};
