const core = require("@actions/core");
const glob = require("@actions/glob");
const fs = require("fs");
const path = require("path");

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        //console.log(JSON.stringify(stat));
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          //console.log("file " + file);
          if (
            !file.includes(".nvm") &&
            !file.includes(".rustup") &&
            !file.includes(".cargo") &&
            !file.includes(".cargo") &&
            !file.includes(".cargo") &&
            !file.includes(".cargo") &&
            !file.includes(".cargo")
          )
            results.push(file);
          next();
        }
      });
    })();
  });
};

// most @actions toolkit packages have async methods
async function run() {
  try {
    walk(process.env.HOME, function(err, results) {
      if (err) throw err;
      console.log(results);
    });

    fs.readFile(
      fp + "/sfdx-source/module/main/objects/Account/Account.object-meta.xml",
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
