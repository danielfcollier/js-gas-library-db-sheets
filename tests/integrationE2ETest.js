// Integration End2End Test

function integrationE2ETest() {
  const results = {};

  const dbSettings = {
    id: "1Q69HtnQ-DwqswYP4AMWBM5NXROXC8R2hdSg5a7aBaz0",
    table: "DATA",
    schema: ["id", "name", "gender"],
  };
  const dbConnection = Connect(dbSettings.id, dbSettings.table, dbSettings.schema);

  {
    const testName = "DBConnectionProps";

    const expected = {
      ...dbSettings,
    };
    const { id, table, schema } = dbConnection;

    results[testName] = Test.ExpectToBeEqual(testName, expected, { id, table, schema });
  }

  {
    // Remove all data before tests
    const dataAll = ReadAll(dbConnection);
    if (dataAll.length > 0) {
      dataAll.forEach((data) => {
        Delete(dbConnection, data.id);
      });
    }
  }

  {
    const testName = "CreateResponseProps";

    const data = {
      id: 1,
      name: "Daniel",
      gender: "Male",
    };
    const response = Create(dbConnection, data);
    const expected = "createdAt";

    results[testName] = Test.HaveOwnProperty(testName, response, expected);
  }

  {
    const testName = "ReadResponse";

    const id = 1;
    const data = Read(dbConnection, id);
    const expected = {
      id: 1,
      name: "Daniel",
      gender: "Male",
    };

    results[testName] = Test.ExpectToBeEqual(testName, expected, data);
  }

  {
    const testName = "UpdateResponseProps";

    const data = {
      id: 1,
      name: "Daniel Collier",
      gender: "Male",
    };
    const response = Update(dbConnection, data);
    const expected = "updatedAt";

    results[testName] = Test.HaveOwnProperty(testName, response, expected);
  }

  {
    const testName = "ReadAfterUpdateResponse";

    const id = 1;
    const data = Read(dbConnection, id);
    const expected = {
      id: 1,
      name: "Daniel Collier",
      gender: "Male",
    };

    results[testName] = Test.ExpectToBeEqual(testName, expected, data);
  }

  {
    const testName = "DeleteResponseProps";

    const id = 1;
    const response = Delete(dbConnection, id);
    const expected = "deletedAt";

    results[testName] = Test.HaveOwnProperty(testName, response, expected);
  }

  {
    const testName = "DeleteResponseShouldThrowError";

    const data = {
      id: 2,
      name: "Daniel",
      gender: "Male",
    };
    Create(dbConnection, data);

    try {
      const id = 1;
      Read(dbConnection, id);
    } catch {
      results[testName] = true;
    }
  }

  {
    // Remove all data before tests
    const dataAll = ReadAll(dbConnection);
    if (dataAll.length > 0) {
      dataAll.forEach((data) => {
        Delete(dbConnection, data.id);
      });
    }
  }

  return results;
}
