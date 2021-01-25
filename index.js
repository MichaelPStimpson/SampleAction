const core = require("@actions/core");
const wait = require("./wait");
const glob = require("@actions/glob");

// most @actions toolkit packages have async methods
async function run() {
  try {
    const globber = await glob.create("**");
    for await (const file of globber.globGenerator()) {
      console.log(file);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
