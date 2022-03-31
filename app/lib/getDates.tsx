export function getDates(startDate: Date, endDate: Date) {
  const dates = [];

  for (
    let i = 0;
    startDate <= endDate;
    startDate.setDate(startDate.getDate() + 1), i++
  ) {
    dates.push(new Date(startDate));
  }
  return dates;
}
