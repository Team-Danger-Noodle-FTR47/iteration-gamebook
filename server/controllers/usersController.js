const Users = require('../models/usersModel');
const ApiGames = require('../models/gamesModel');

require('dotenv').config();
const bcrypt = require('bcryptjs');

usersController = {};

// get data from db and store to user.likedGames
usersController.likeGame = async (req, res, next) => {
  try {
    // get game data from frontend and store to likedGames
    // req.body should be something like { username: String, gameName: "game name" }
    const gameName = req.body.gameName;
    const username = req.body.userName;
    // find game in apiGames collection
    const game = await ApiGames.findOne({
      name: gameName,
    });
    // check if game has been already liked by user
    const userData = await Users.findOne({ username: username });
    // if it hasn't been liked add to likedGames under that user
    if (
      !userData.likedGames.find((likedGame) => likedGame.name === game.name)
    ) {
      await Users.updateOne(
        { username: username },
        { $push: { likedGames: game } }
      );
      res.locals.gameLiked = game;
    } else {
      res.locals.gameLiked = 'Game already liked!';
    }
    next();
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};

// delete game from likedGames
usersController.unlikeGame = async (req, res, next) => {
  try {
    const gameName = req.body.gameName;
    const username = req.body.username;
    const game = await ApiGames.findOne({
      name: gameName,
    });
    await Users.updateOne(
      { username: username },
      { $pull: { likedGames: { id: game.id } } }
    );
    const user = await Users.findOne({ username: username });
    res.locals.likedGames = user.likedGames;
    next();
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};

// get liked games from user likedGames and send to frontend
usersController.loadLikes = async (req, res, next) => {
  console.log('We made it')
  try {
    const username = req.query.username;
    console.log(username);
    const userData = await Users.findOne({ username: username });
    const likedGamesList = userData.likedGames;
    res.locals.likedGames = likedGamesList;
    next();
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};

// create user
usersController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = await Users.findOne({ username: username });
    if (!userData) {
      const user = await Users.create({
        username,
        password,
        likedGames: [],
      });
      // if user is created successfully send username back to client
      res.locals.user = user.username;
    }
    next();
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};

usersController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // some password comaparing logic using bcrypt
    const userData = await Users.findOne({
      username: username,
    });
    if (userData) {
      const match = await bcrypt.compare(password, userData.password);
      if (match) res.locals.user = userData.username;
      next();
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next({
      message: error,
    });
  }
};

module.exports = usersController;

/*
const Users = require('../models/usersModel');
const ApiGames = require('../models/gamesModel');
const bcrypt = require('bcryptjs');

usersController = {};

usersController.likeGame = async (req, res, next) => {
  try {
    const { gameName, userName } = req.body;
    const game = await ApiGames.findOne({ name: gameName });
    const userData = await Users.findOne({ username: userName });
    
    if (!userData.likedGames.find(likedGame => likedGame.name === game.name)) {
      await Users.updateOne(
        { username: userName },
        { $push: { likedGames: game } }
      );
      res.locals.gameLiked = game;
    } else {
      res.locals.gameLiked = 'Game already liked!';
    }
    next();
  } catch (error) {
    console.log(error);
    next({ message: error });
  }
};

usersController.unlikeGame = async (req, res, next) => {
  try {
    const { gameName, username } = req.body;
    const game = await ApiGames.findOne({ name: gameName });
    await Users.updateOne(
      { username: username },
      { $pull: { likedGames: { id: game.id } } }
    );
    const user = await Users.findOne({ username: username });
    res.locals.likedGames = user.likedGames;
    next();
  } catch (error) {
    console.log(error);
    next({ message: error });
  }
};

usersController.loadLikes = async (req, res, next) => {
  try {
    const { username } = req.body;
    const userData = await Users.findOne({ username: username });
    res.locals.likedGames = userData.likedGames;
    next();
  } catch (error) {
    console.log(error);
    next({ message: error });
  }
};

usersController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = await Users.findOne({ username: username });
    if (!userData) {
      const hash = await bcrypt.hash(password, 10);
      const user = await Users.create({
        username,
        password: hash,
        likedGames: [],
      });
      res.locals.user = user.username;
    }
    next();
  } catch (error) {
    console.log(error);
    next({ message: error });
  }
};

usersController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = await Users.findOne({ username: username });
    if (userData) {
      const match = await bcrypt.compare(password, userData.password);
      if (match) res.locals.user = userData.username;
    }
    next();
  } catch (error) {
    console.log(error);
    next({ message: error });
  }
};

module.exports = usersController;

*/
