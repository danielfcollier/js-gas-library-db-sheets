function DbConversion_(connection, data) {
  const { schema } = connection;
  const dbData = [];
  schema.forEach((property) => {
    dbData.push(data[property]);
  });

  return dbData;
}
