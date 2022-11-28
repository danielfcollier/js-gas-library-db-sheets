class Test {
  static ExpectToBeEqual(testName, expected, actual) {
    let isTrue = true;

    const expectedKeys = Object.keys(expected);
    const actualKeys = Object.keys(actual);

    if (expectedKeys.length === actualKeys.length) {
      for (let i = 0; i < expectedKeys.length; i++) {
        const key = expectedKeys[i];
        if (actual[key] !== expected[key]) {
          isTrue = false;
          break;
        }
      }

      if (isTrue) {
        return true;
      }
    }

    Test.Logger(testName, expected, actual);
    return false;
  }

  static HaveOwnProperty(testName, object, property) {
    const isTrue = Object.prototype.hasOwnProperty.call(object, property);

    if (isTrue) {
      return true;
    }

    Test.Logger(testName, property, object);
    return false;
  }

  static Logger(testName, expected, actual) {
    console.error({ testName, expected, actual });
  }
}
