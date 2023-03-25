export const normalize = (arr: number[]): number[] => {
  const max = Math.max(...arr)
  return arr.map(n => n / max)
}
