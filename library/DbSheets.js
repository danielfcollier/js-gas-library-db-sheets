const rowOffset_ = 1;
const columnOffset_ = 0;

function Connect(sheetId, table, schema) {
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(table);

  const row = {
    offset: rowOffset_,
    start: 1 + rowOffset_,
    end: sheet.getMaxRows() - rowOffset_,
  };
  const column = {
    offset: columnOffset_,
    start: 1 + columnOffset_,
    end: sheet.getMaxColumns() - columnOffset_,
  };
  const connection = { sheet, schema, row, column };

  return connection;
}

function Create(connection, data) {
  const dbData = Utils.DbConversion_(connection, data);
  connection.sheet.appendRow(dbData);

  return {
    createdAt: (new Date()).now(),
  };
}

function Read(connection, { row, id }) {
  const {
    sheet,
    column,
  } = connection;

  const rowTarget = id ? Utils.GetRowById(connection, id) : row;
  const dbData = sheet.getRange(rowTarget, column.start, 1, column.end).getValues();

  return Utils.JsonConversion_(connection, dbData);
}

function ReadAll(connection) {
  const {
    sheet,
    row,
    column,
  } = connection;

  const dbAll = sheet.getRange(row.start, column.start, row.end, column.end).getValues();
  const dataAll = dbAll.map(data => JsonConversion_(connection, data));

  return dataAll;
}

function Update(connection, { row, id }, data) {
  const {
    sheet,
    column,
  } = connection;

  const rowTarget = id ? Utils.GetRowById(connection, id) : row;
  const dbData = Utils.DbConversion_(connection, data);
  sheet.getRange(rowTarget, column.start, 1, column.end).setValues([dbData]);

  return {
    updatedAt: (new Date()).now(),
  };
}

function Delete(connection, { row, id }) {
  const {
    sheet,
  } = connection;

  const rowTarget = id ? Utils.GetRowById(connection, id) : row;
  sheet.deleteRow(rowTarget);

  return {
    deletedAt: (new Date()).now(),
  };
}

