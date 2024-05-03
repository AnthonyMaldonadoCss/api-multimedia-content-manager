const express = require('express');
const router = express.Router();

const contentController = require('../../controllers/content/content.controller');

/**
 * @swagger
 * tags:
 *  name: Content
 *  description: Content Endpoints
 */

router.post('/add_content', contentController.addContent);
router.get('/get_content', contentController.getContent);
router.put('/update_content', contentController.updateContent);
router.delete('/delete_content', contentController.deleteContent);

module.exports = router