const express = require('express');
const router = express.Router();

const  {
  getTopics,
  addTopic,
  updateTopic,
  deleteTopic
} = require('../../controllers/topics/topics.controller');

/**
 * @swagger
 * tags:
 *  name: Topics
 *  description: Topics Endpoints
 */


router.get('/', getTopics);
router.post('/add_topic', addTopic);
router.put('/update_topic', updateTopic);
router.delete('/delete_topic', deleteTopic);

module.exports = router