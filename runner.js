const fs = require('fs');
const path = require('path');

class Runner {
  constructor() {
    this.testFiles = [];
  }

  // Breadth First Search
  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (const file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filepath });
      } else if (stats.isDirectory()) {
        const childFiles = await fs.promises.readdir(filepath);

        // spread files from array
        files.push(
          ...childFiles.map((childFile) => path.join(file, childFile))
        );
      }
    }
  }
}

module.exports = Runner;