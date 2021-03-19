const List = require('../models/List.model');
const Activity = require('../models/Activity.model');

exports.createList = async (req, res) => {
  try {
    const data = req.body;
    const { activities, listname } = data;

    const allActivities = await Promise.all(
      activities.map(async (e) => {
        const activity = await Activity.create({ ...e });
        return activity._id;
      })
    );

    data.activities = allActivities;
    const list = await List.create({ ...data });

    res.status(201).json(list);
  } catch (e) {
    const code = e.errorCode || 500;
    console.log(e);
    return res.status(code).json({ errors: [{ msg: e.message }] });
  }
};

exports.allList = async (req, res) => {
  try {
    const lists = await List.find().populate('activities');
    console.log(lists);
    res.status(201).json(lists);
  } catch (e) {
    const code = e.errorCode || 500;
    console.log(e);
    return res.status(code).json({ errors: [{ msg: e.message }] });
  }
};

exports.updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);

    activity.isItDone
      ? (activity.isItDone = false)
      : (activity.isItDone = true);
    activity.save();

    res.status(201).json(activity);
  } catch (e) {
    const code = e.errorCode || 500;
    console.log(e);
    return res.status(code).json({ errors: [{ msg: e.message }] });
  }
};
