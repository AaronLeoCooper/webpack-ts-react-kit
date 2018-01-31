const path = require('path');
const createFile = require('create-file');

function createFiles(files = []) {
  const promises = files.map(
    ({ dir, filename, content }) =>
      new Promise((resolve, reject) => {
        createFile(path.join(dir, filename), content, function(err) {
          if (err) {
            reject(err);
          }

          resolve();
        });
      })
  );

  return Promise.all(promises);
}

module.exports = createFiles;
