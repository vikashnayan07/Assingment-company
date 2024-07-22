const List = require("../model/listModel");

const saveList = async (req, res) => {
  try {
    const { name, responseCodes, imageLinks } = req.body;
    const newList = new List({
      userId: req.user._id,
      name,
      responseCodes,
      imageLinks,
      createdAt: new Date(),
    });
    await newList.save();
    return res.status(201).json({ status: "Success", data: newList });
  } catch (error) {
    return res.status(500).json({ status: "Failed", msg: "Server Error" });
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user._id });
    return res.status(200).json({ status: "Success", data: lists });
  } catch (error) {
    return res.status(500).json({ status: "Failed", msg: "Server Error" });
  }
};

const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, responseCodes, imageLinks } = req.body;
    const updatedList = await List.findByIdAndUpdate(
      id,
      { name, responseCodes, imageLinks },
      { new: true }
    );
    return res.status(200).json({ status: "Success", data: updatedList });
  } catch (error) {
    return res.status(500).json({ status: "Failed", msg: "Server Error" });
  }
};

const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await List.findByIdAndDelete(id);
    return res.status(200).json({ status: "Success", msg: "List Deleted" });
  } catch (error) {
    return res.status(500).json({ status: "Failed", msg: "Server Error" });
  }
};

module.exports = { saveList, getLists, updateList, deleteList };
