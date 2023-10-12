export const currencyFormatter = (number) => {
   return new Intl.NumberFormat({
      style: "currency",
      currency: "IDR",
   }).format(number);
};
