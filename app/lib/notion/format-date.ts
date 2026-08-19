export const formatDate = (input: string | number, { month = "short" }: { month?: "long" | "short" } = {}) => {
  const date = new Date(input);
  const monthLocale = date.toLocaleString("en-US", { month });
  return `${monthLocale} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};

export interface NotionDateTime {
  type: "datetime";
  start_date: string;
  start_time?: string;
  time_zone?: string;
}

export const formatNotionDateTime = (datetime: NotionDateTime) => {
  // Adding +00:00 preserve the time in UTC.
  const dateString = `${datetime.start_date}T${datetime.start_time || "00:00"}+00:00`;
  return formatDate(dateString);
};
