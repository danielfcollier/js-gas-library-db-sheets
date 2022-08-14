function ServiceLogger_(connection, action, id) {
  console.log(`### Table: ${connection.table.toUpperCase()} <> Action: ${action.toUpperCase()} for Id: ${id}`);
}
