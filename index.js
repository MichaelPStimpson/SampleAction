const core = require("@actions/core");
const glob = require("@actions/glob");
const fs = require("fs");
const path = require("path");

// most @actions toolkit packages have async methods
async function run() {
  const ms = core.getInput("milliseconds");
  console.log(ms);
  try {
    fs.readFile(
      ms + "/sfdx-source/module/main/objects/Account/Account.object-meta.xml",
      "utf8",
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      }
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
