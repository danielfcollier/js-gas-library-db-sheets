function GetRowById_(connection, id) {
  let row;

  const dbAll = ReadAll(connection);
  for (let i = 0; i < dbAll.length; i++) {
    const data = JsonConversion_(connection, dbData);
    if (data.id === id) {
      row = index + connection.row.offset;
      break;
    }
  }

  if (!row) {
    throw new Error();
  }

  return row;
}

function JsonConversion_(connection, dbData) {
  const { schema } = connection;
  const data = {};
  schema.forEach((property, index) => {
    data[property] = dbData[index];
  });

  return data;
}

function DbConversion_(connection, data) {
  const { schema } = connection;
  const dbData = [];
  schema.forEach((property) => {
    dbData.push(data[property]);
  });

  return dbData;
}
