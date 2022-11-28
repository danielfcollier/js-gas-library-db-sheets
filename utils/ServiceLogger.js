function ServiceLogger_(connection, action, id) {
  if (isLoggingEnabled()) {
    console.log(`### Table: ${connection.table.toUpperCase()} <> Action: ${action.toUpperCase()} for Id: ${id}`);
  }
}
