export const formatRupiah = (value: string) => {
  const numberString = value.replace(/\D/g, "");

  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
