import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeFile } from "fs";

const { readJSON, writeJSON } = fs;

const usersJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/users.json"
);
const booksJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/books.json"
);
const usersPublicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/users"
);

export const getUsers = () => readJSON(usersJSONPath);
export const getBooks = () => readJSON(booksJSONPath);

export const writeUsers = (content) => writeJSON(usersJSONPath, content);
export const writeBooks = (content) => writeJSON(booksJSONPath, content);

export const getCurrentFolderPath = (currentFile) =>
  dirname(fileURLToPath(currentFile));

export const writeUsersPicture = (filename, content) =>
  writeFile(join(usersPublicFolderPath, filename), content);
