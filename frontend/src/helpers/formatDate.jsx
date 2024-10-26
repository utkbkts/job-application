import moment from "moment/moment";

export function FormatDate(date) {
  return moment(date).fromNow();
}
