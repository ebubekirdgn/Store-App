const fs = require("node:fs/promises");

const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");

async function readData() {
  const data = await fs.readFile("db.json", "utf8");
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile("db.json", JSON.stringify(data));
}

async function get(username) {
  const data = await readData();

  const user = data.users.find((p) => p.username === username);

  return user;
}

async function add(user) {
  const data = await readData();
  data.users.unshift({
    id: generateId(),
    ...user,
  });
  await writeData(data);
}

async function update(username, updates) {
  const data = await readData();
  const userIndex = data.users.findIndex((p) => p.username === username);

  if (userIndex === -1) {
    throw new NotFoundError("User not found");
  }

  // Sadece username güncellensin
  if (updates.username) {
    data.users[userIndex].username = updates.username;
  }

  await writeData(data);
  return data.users[userIndex];
}

exports.get = get;
exports.add = add;
exports.update = update;