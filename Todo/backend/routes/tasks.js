const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Tasks = require("../models/Tasks");
const { body, validationResult } = require("express-validator");

router.get("/fetchalltasks", fetchuser, async (req, res) => {
  try {
    const tasks = await Tasks.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

router.post(
  "/addtask",
  fetchuser,
  [
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body(
      "description",
      "description must be atleast contain 5 character "
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // cheacking errors in input
    console.log("Ok");
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;

      const task = new Tasks({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveTask= await task.save();
      res.json(saveTask);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

router.put(
  "/updatetask/:id",
  fetchuser,
  [
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body(
      "description",
      "description must be atleast contain 5 character "
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const newTask = {};
    if (title) {
      newTask.title = title;
    }
    if (description) {
      newTask.description = description;
    }
    if (tag) {
      newTask.tag = tag;
    }

    try {
      let task = await Tasks.findById(req.params.id);
      if (!task) {
        return res.status(404).send("Not Found");
      }

      if (task.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      // res.json(newTask);
      task = await Tasks.findByIdAndUpdate(
        req.params.id,
        { $set: newTask },
        { new: true }
      );
      res.json({ task });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

router.delete("/deletetask/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    let task = await Tasks.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not Found");
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    // res.json(newtask);
    task = await Tasks.findByIdAndDelete(req.params.id);
    res.json({ success: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }

  // const task=Tasks.findByIdAndUpdate({})
});

module.exports = router;
