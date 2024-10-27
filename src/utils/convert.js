export const convertNumbersToPersian = (enNumber) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return enNumber.toString().replace(/\d/g, (digit) => persianDigits[digit]);
};
