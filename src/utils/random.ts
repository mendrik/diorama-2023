export const randomInt = (min: number, max: number): number =>
  (min + Math.random() * (max - min + 1)) | 0
