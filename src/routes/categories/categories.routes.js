const express = require('express');
const router = express.Router();

const categoriesController = require('../../controllers/ categories/categories.controller');

/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: Categories Endpoints
 * /books:
 *   get:
 *     summary: Lists all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/Categories'
 */

router.get('/', categoriesController.getCategories);
router.post('/add_categories', categoriesController.addCategories);
router.put('/update_categories', categoriesController.updateCategories);
router.delete('/delete_categories', categoriesController.deleteCategories);

module.exports = router