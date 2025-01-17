const fizzbuzz = (number) => {
  if (typeof number !== "number") throw new Error("Parameter must be a number");
  if (Number.isNaN(number)) throw new Error("Parameter must be a number");

  const multiple = { 3: "fizz", 5: "buzz" };
  let output = "";

  Object.entries(multiple).forEach(([multiplier, word]) => {
    if (number % multiplier === 0) output += word;
  });

  return output || number;
};

export default fizzbuzz;
