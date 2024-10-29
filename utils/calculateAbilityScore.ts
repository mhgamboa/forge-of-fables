const calculateModifier = (n: number): number => {
  const modifier: number = Math.floor((n - 10) / 2);
  return modifier;
};

export default calculateModifier;
