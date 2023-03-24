export const throwError = (message: string): never => {
  // eslint-disable-next-line functional/no-throw-statements
  throw new Error(message)
}
