function getDate(selectedDate = new Date()) {
  const newDate = new Date(selectedDate);

  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
}

export default getDate;
