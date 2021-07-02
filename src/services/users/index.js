import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import { validationResult } from "express-validator";

import { getUsers, getBooks, writeUsers } from "../../lib/fs-tools.js";

const usersRouter = express.Router();

// get - all
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
// get - single
usersRouter.get("/:id", async (req, res, next) => {
  try {
    const users = await getUsers();
    const user = users.find((u) => u.id === req.params.id);
    if (user) {
      res.send(user);
    } else {
      next(createError(404, `User with an id of ${req.params.id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
// post - create
usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = { ...req.body, id: uniqid(), createdAt: new Date() };
    const users = await getUsers();
    users.push(newUser);
    await writeUsers(newUser);
    res.send(newUser);
    res.status(201).send({ id: newUser.id });
  } catch (error) {
    next(error);
  }
});
// put - edit
usersRouter.put("/:id", async (req, res, next) => {
  try {
    const users = await getUsers();
    const remainingUsers = users.filter((user) => user.id !== req.params.id);
    const updatedUser = { ...req.body, id: req.params.id };
    remainingUsers.push(updatedUser);
    await writeUsers(updatedUser);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});
// delete
usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const users = await getUsers();
    const remainingUsers = users.filter((user) => user.id !== req.params.id);

    await writeUsers(updatedUser);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
