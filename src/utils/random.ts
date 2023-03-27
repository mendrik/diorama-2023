export const randomInt = (min: number, max: number): number =>
  ((Math.random() * (max + 1)) | 0) + min
