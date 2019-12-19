const server = require("./server.js");

const EYEOFSAURON = process.env.EYEOFSAURON || 4000;

server.listen(EYEOFSAURON, () => {
  console.log(`Listening on Barad-dûr, Eye of Sauron ${EYEOFSAURON}...`);
});
