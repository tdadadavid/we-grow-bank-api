
export const computeExpiryDate = (timeInSeconds: number) => {
  return new Date(Date.now() + timeInSeconds * 1000);
}
