import moment from "moment";

export default function convertDate(isoDate) {
  const formattedDate = moment(isoDate).format("DD-MM-YYYY HH:mm");

  return formattedDate;
}
