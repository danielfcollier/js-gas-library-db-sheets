function JsonConversion_(connection, dbData) {
  const { schema } = connection;
  const data = {};
  schema.forEach((property, index) => {
    data[property] = dbData[index];
  });

  return data;
}
