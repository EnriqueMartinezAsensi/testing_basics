const canReconfigure = (from, to) => {
  if (typeof from !== "string") throw new Error("From is required or not a string");
  if (typeof to !== "string") throw new Error("From is required or not a string");

  const isDifferentLength = from.length !== to.length;
  if (isDifferentLength) return false;

  const isDifferentUniqueLetters = new Set(from).size !== new Set(to).size;
  if (isDifferentUniqueLetters) return false;

  const transformations = {};
  for (let i = 0; i <= from.length; i++) {
    const fromLetter = from[i];
    const toLetter = to[i];

    const storedLetter = transformations[fromLetter];
    if (storedLetter && storedLetter !== toLetter) return false;

    transformations[fromLetter] = toLetter;
  }

  return true;
};

export default canReconfigure;
