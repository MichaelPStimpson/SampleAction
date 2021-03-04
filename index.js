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
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          if (file.startsWith("/home/runner/work/")) results.push(file);
          next();
        }
      });
    })();
  });
};

// most @actions toolkit packages have async methods
async function run() {
  const ms = core.getInput("milliseconds");
  console.log("repo path: " + ms);
  console.log("process env home: " + process.env.HOME);
  try {
    walk(ms, function(err, results) {
      if (err) throw err;
      console.log(results);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
