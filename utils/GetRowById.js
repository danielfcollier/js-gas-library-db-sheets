function GetRowById_(connection, id) {
  let row;

  const dbAll = ReadAll(connection);
  for (let index = 0; index < dbAll.length; index++) {
    const data = dbAll[index];
    if (data.id === id) {
      row = index + 1;
      break;
    }
  }

  if (!row) {
    throw new Error();
  }

  return row + connection.row.offset;
}
