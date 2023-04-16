const mongoose = require("mongoose");

const ENV = require("../constants/ENV");

const logger = require("./Logger");

class Repository {
  constructor() {
    this.connect();
  }

  response = (data, error = null) =>
    Object({
      error,
      data,
    });

  connect = async () => {
    console.log(ENV.MONGODB_URI);
    await mongoose
      .connect(ENV.MONGODB_URI)
      .then(() => logger.info(`MongoDb Connected: ${ENV.MONGODB_URI}`))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });
  };

  get = async (Schema, filter = {}) =>
    await Schema.find(filter)
      .then((data) => this.response(data))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });

  add = async (Schema, data) =>
    await new Schema(data)
      .save()
      .then((added) => this.response(added))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });

  modify = async (Schema, id, data) =>
    await Schema.findByIdAndUpdate(id, data, { new: true })
      .then((modified) => this.response(modified))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });

  remove = async (Schema, id) =>
    await Schema.findByIdAndRemove(id)
      .then((modified) => this.response(modified))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });
}

module.exports = new Repository();
