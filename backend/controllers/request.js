const express = require('express');
const models = require('../models');

const RequestController = {
  registerRouter() {
    const router = express.Router();
    router.get('/', this.getRequests);
    router.post('/', this.createRequest);

    return router;
  },

  getRequests(req, res) {
    models.Request.findAll({
      where: {
        fulfilled: false
      }
    })
      .then(allRequests => {
        res.json(allRequests);
      })
      .catch(console.error);
  },

  createRequest(req, res) {
    models.Request.create({
      email: req.body.email,
      parkName: req.body.parkName,
      fulfilled: req.body.fulfilled
    })
    .then(request => {
      res.send('Request created successfully');
    })
    .catch(console.error);
  }
}

module.exports = RequestController.registerRouter();