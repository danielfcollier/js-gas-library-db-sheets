# [Library] DB Sheets

For small projects or MVPs, it is possible to use Google Sheets as a database (DB). This library is intended to be use as an ORM to connect with the sheet database and provide CRUD operations on the data.

The schema and operations are simplified. The data is returned as a JSON object where the properties are given in the provided schema. At least one field of the schema must be for the `id` property.

## Using the Library

There are two ways to import the library to your project:

- Set in your script project dashboard
- Add the configuration into your `appsscript.json`

1. Script Id:

```
13rzxngZvz-NzYQ0IDhAc-lThmAa_mkO-MaghUiix1kHXe875LG6gOZyF
```

2. Add the latest version: `2`
3. Use the identifier `DBSheets`

These actions will update your `appsscript.json`.

Or, you can update it directly adding to the `dependencies` object:

```json
"dependencies": {
    "libraries": [
      {
        "userSymbol": "DbSheets",
        "version": "2",
        "libraryId": "13rzxngZvz-NzYQ0IDhAc-lThmAa_mkO-MaghUiix1kHXe875LG6gOZyF"
      }
    ]
}
```

> The script runs in the timezone `Etc/GMT`.

## DbConnection

```javascript
const connection = DbSheets.Connect(sheetId, table, schema);
```

Where, for example, the data for connection is as follow:

```javascript
const sheetId = "1Q69HtnQ-DwqswYP4AMWBM5NXROXC8R2hdSg5a7aBaz0";
const table = "DATA";
const schema = ["id", "name", "gender"];
```

> At least one column must have an `id` field

## Methods

### Create

```javascript
const data = {
  id: 1,
  name: "Daniel",
  gender: "Male",
};
const { createdAt } = DbSheets.Create(connection, data);
```

### Read

```javascript
const id = 1;
const data = DbSheets.Read(connection, id);
```

### Read All

```javascript
const dataAll = DbSheets.ReadAll(connection);
```

### Update

The updated data must be have all object properties.

```javascript
const data = {
  id: 1,
  name: "Daniel Collier",
  gender: "Male",
};
const { updatedAt } = DbSheets.Update(connection, data);
```

### Delete

```javascript
const { deletedAt } = DbSheets.Delete(connection, id);
```

## Logging

If you want (not recommended), it is possible to disable logging by changing the function `isLoggingEnabled`to return `false`. This option might be useful to disable logging during tests.

The logging is simple, it show the table name, the performed CRUD action and the `id` of the data.
