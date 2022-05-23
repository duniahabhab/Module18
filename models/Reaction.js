const { User, Thoughts } = require("../models");

const ThoughtsController = {
  
  addThoughts({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thoughts for user!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },


  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { ThoughtId: params.ThoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thoughts for user!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  
  removeThought({ params }, res) {
    Thoughts.findOneAndDelete({ thoughtId: params.ThoughtId })
      .then((deleteThought) => {
        if (!deleteThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndUpdate(
          { userId: params.userId },
          { $pull: { thoughts: params.thoughtsId } },
          { new: true }
        );
      })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

 
  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { ThoughtId: params.ThoughtId },
      { $pull: { reactions: { reactionsId: params.reactionsId } } },
      { new: true }
    )
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => res.json(err));
  },

 
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },


  getThoughtById({ params, body }, res) {
    Thoughts.findOne({ thoughtId: params.id })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thought found!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ ThoughtId: params.id }, body, {
      new: true,
    })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = ThoughtsController;