export const formatSalaryToRupiah = (amount: string | number) => {
  if (!amount) return "";
  const numericValue = Number(String(amount).replace(/[^\d]/g, ""));

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(numericValue)
    .replace(/\u00A0/g, "");
};
