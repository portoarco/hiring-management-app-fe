export function convertDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0"); // 01, 02, 03...
  const month = date.toLocaleString("en-US", { month: "short" }); // Jan, Feb, Mar...
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
