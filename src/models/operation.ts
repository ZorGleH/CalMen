import { range, random } from "lodash";

const OPERANDS = [...range(0, 10) /*, 20, 25, 50, 75, 100, 250, 500, 1000*/];

const OPERATORS = ["+", "−", "×" /*, "∕", "÷"*/];

const pickOneFrom = <T>(lots: T[]): T => lots[random(0, lots.length - 1)];

export type Operation = {
  operand1: number;
  operand2: number;
  operator: string;
};

export const createOperation = (): Operation => ({
  operand1: pickOneFrom(OPERANDS),
  operand2: pickOneFrom(OPERANDS),
  operator: pickOneFrom(OPERATORS),
});

export const solveOperation = ({
  operand1,
  operand2,
  operator,
}: Operation): number => {
  let result: number = 0;
  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "−":
      result = operand1 - operand2;
      break;
    case "×":
      result = operand1 * operand2;
      break;
    case "∕":
      result = operand1 / operand2;
      break;
  }
  return result;
};
