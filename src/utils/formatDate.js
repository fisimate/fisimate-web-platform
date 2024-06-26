export default function formatDate(dateStr) {
  const [day, month, yearAndTime] = dateStr.split("/");
  const [year, time] = yearAndTime.split(" ");
  const [hour, minute] = time.split(":");
  const newDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

  return newDate.toISOString();
}
