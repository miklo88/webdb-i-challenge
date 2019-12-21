// require("dotenv/types").config();
// SERVER FROM API FOLDER
const server = require("./api/server.js");
// PULLING INFO FRO .ENV FILE
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening on Barad-dûr, Eye of Sauron ${port}`);
});
