import uuid4 from "./uuidv4";

const filterByDate = (data) => {
  let itemsArray = [];
  let date = "";

  for (let item of data) {
    if (!date || date === "" || !date.length) {
      date = item.createdAt_day;
      itemsArray.push({
        _id: uuid4(),
        type: "timeline",
        date: item.createdAt_day,
      });
      itemsArray.push(item);
    } else if (date && date === item.createdAt_day) {
      itemsArray.push(item);
    } else if (date && date !== item.createdAt_day) {
      date = item.createdAt_day;
      itemsArray.push({
        _id: uuid4(),
        type: "timeline",
        date: item.createdAt_day,
      });
      itemsArray.push(item);
    }
  }

  return itemsArray;
};

export default filterByDate;
