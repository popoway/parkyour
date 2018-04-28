const express = require('express');
const models = require('../models');

const RequestController = {
  registerRouter() {
    const router = express.Router();
    router.get('/', this.getRequests);
    router.post('/', this.createRequest);
    router.put('/:id', this.fulfillRequest);

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
    const inputDate = new Date(req.body.date);
    models.Request.create({
      email: req.body.email,
      parkName: req.body.parkName,
      numberOfPeople: req.body.numberOfPeople,
      date: inputDate,
      type: req.body.type,
      fulfilled: false
    })
    .then(request => {
      res.send('Request created successfully');
    })
    .catch(console.error);
  },

  fulfillRequest(req, res) {
    models.Request.findById(req.params.id)
      .then(request => {
        request.update({
          fulfilled: true
        });
      })
      .then(() => {
        res.send(`Request with id ${req.params.id} updated successfully`)
      })
      .catch(console.error);
  }
}

module.exports = RequestController.registerRouter();