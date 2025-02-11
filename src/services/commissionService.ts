export const calculateCommission = (amount: number, level: number) => {
  const rates = [0.1, 0.05, 0.03, 0.02]; // 10%, 5%, 3%, 2%
  return level <= rates.length ? amount * rates[level - 1] : 0;
}; 