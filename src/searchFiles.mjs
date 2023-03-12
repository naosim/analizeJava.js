import fs from "fs";
import path from "path";

export function searchFiles(dir, searchString, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      searchFiles(filePath, searchString, fileList);
    } else if (file.endsWith(searchString)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}