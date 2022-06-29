const fs = require("fs");
const path = require("path");
const pathToData = path.resolve(
  __dirname,
  "../../../public/locales/ar/translation.json"
);

fs.readFile(pathToData, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
