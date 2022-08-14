const rowOffset_ = 1;
const columnOffset_ = 0;

function Connect(sheetId, table, schema) {
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(table);

  const row = {
    offset: rowOffset_,
    start: 1 + rowOffset_,
  };
  const column = {
    offset: columnOffset_,
    start: 1 + columnOffset_,
    end: schema.length - columnOffset_,
  };
  const connection = { sheet, table, id: sheetId, schema, row, column };

  return connection;
}

function Create(connection, data) {
  const dbData = DbConversion_(connection, data);
  connection.sheet.appendRow(dbData);

  ServiceLogger_(connection, 'Create', data.id);
  return {
    createdAt: (new Date()).toISOString(),
  };
}

function Read(connection, id) {
  const {
    sheet,
    column,
  } = connection;

  const rowTarget = GetRowById_(connection, id);
  const [dbData] = sheet.getRange(rowTarget, column.start, 1, column.end).getValues();
  const data = JsonConversion_(connection, dbData);

  ServiceLogger_(connection, 'Read', id);
  return data;
}

function ReadAll(connection) {
  const {
    sheet,
    row,
    column,
  } = connection;

  const dbAll = sheet.getRange(row.start, column.start, sheet.getMaxRows() - row.offset, column.end).getValues();
  const dataAll = dbAll.map(data => JsonConversion_(connection, data));

  return dataAll;
}

function Update(connection, data) {
  const {
    sheet,
    column,
  } = connection;

  const rowTarget = GetRowById_(connection, data.id);
  const dbData = DbConversion_(connection, data);
  sheet.getRange(rowTarget, column.start, 1, column.end).setValues([dbData]);

  ServiceLogger_(connection, 'Update', data.id);
  return {
    updatedAt: (new Date()).toISOString(),
  };
}

function Delete(connection, id) {
  const {
    sheet,
  } = connection;

  const rowTarget = GetRowById_(connection, id);
  sheet.deleteRow(rowTarget);

  ServiceLogger_(connection, 'Delete', id);
  return {
    deletedAt: (new Date()).toISOString(),
  };
}

