export const TIME_FRAME_OPTIONS = [
  { label: "This Month" },
  { label: "Past 1 Month" },
  { label: "Past 3 Months" },
  { label: "Past 6 Months" },
  { label: "Past 1 Year" },
  { label: "All Time" },
];

export function getISOString(timeFrame: string) {
  const currentDate = new Date();
  let startDate: Date;

  switch (timeFrame) {
    case "This Month": {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      break;
    }
    case "Past 1 Month": {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
      break;
    }
    case "Past 3 Months": {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
      break;
    }
    case "Past 6 Months": {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
      break;
    }
    case "Past 1 Year": {
      startDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
      break;
    }
    default: {
      startDate = new Date(1970, 0, 1);
    }
  }

  return startDate?.toISOString();
}