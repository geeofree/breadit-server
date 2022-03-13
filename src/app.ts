import server from "./server";
const PORT = process.env.PORT || 8000;
server.listen(PORT, () =>
  console.log(`⚡️️[server]: Server is running at https://localhost:${PORT}`)
);
