export const transformFullEventDate = (eventDate: string) => {
  const date = new Date(eventDate);

  const optionsDate: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format
  };

  const datePart = new Intl.DateTimeFormat('en-GB', optionsDate).format(date);
  const timePart = new Intl.DateTimeFormat('en-GB', optionsTime).format(date);

  return `${datePart} ${timePart}`;
};
