const express = require('express');
const models = require('../models');

const RequestController = {
  registerRouter() {
    const router = express.Router();
    router.get('/', this.getRequests);

    return router;
  },

  getRequests(req, res) {
    models.Request.findAll({
      
    });
  }
}