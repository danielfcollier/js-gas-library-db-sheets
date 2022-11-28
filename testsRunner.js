function testsRunner() {
  console.log("### Starting Tests!");

  const results = integrationE2ETest();

  const data = Object.values(results);

  const passingTests = data.filter((element) => element === true).length;
  const notPassingTests = data.filter((element) => element === false).length;

  console.log(`Total: ${data.length}, Passing: ${passingTests}, Not passing: ${notPassingTests}`);
}
