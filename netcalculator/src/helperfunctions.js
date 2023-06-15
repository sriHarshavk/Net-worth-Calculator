
const PRICE_REGEX = /^\d*\.?\d*$/;

// function to check if the input is a valid price
export function isValidPrice(e)
{
  return PRICE_REGEX.test(e);
}
