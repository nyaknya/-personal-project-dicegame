export default function calculator(slider: number, dice: number): number[] {
  const results = [];
  for (let i = 0; i < slider; i++) {
    results.push(Math.floor(Math.random() * dice) + 1);
  }
  return results;
}
