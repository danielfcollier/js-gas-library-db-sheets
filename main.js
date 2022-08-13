function myFunction() {
  const dbConnection = Connect(sheetId, table, schema);
  const dataAll = ReadAll(dbConnection);
  for (let i = 0; i <= 4; i++) {
    console.log(dataAll[i]);
  }
}
