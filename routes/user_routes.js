/**
 * @file user_routes.js
 * @description Defines the user routes for the Express application.
 */

const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const user_controller = require('../controllers/users_controller');

/**
 * Middleware function to validate the request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const validateRequestBody = async (req, res, next) => {
    // Validation rules for the request body
    const validationRules = [
        body('name').exists().withMessage('name is required'),
        body('email').exists().withMessage('email is required')
    ];
    
    // Run the validation rules on the request body
    const validationPromises = validationRules.map(rule => rule.run(req));
    
    // Wait for all validation rules to finish
    await Promise.all(validationPromises);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Handle validation errors
        return res.status(400).json({ errors: errors.array() });
    }
    
    // If validation passes, proceed to the next middleware or route handler
    next();
};

/**
 * Middleware function to validate the request parameters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const validateRequestParams = async (req, res, next) => {
    // Validation rules for the request parameters
    const validationRules = [
        query('user_id').exists().withMessage('user_id is required')
    ];
    
    // Run the validation rules on the request parameters
    const validationPromises = validationRules.map(rule => rule.run(req));
    
    // Wait for all validation rules to finish
    await Promise.all(validationPromises);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Handle validation errors
        return res.status(400).json({ errors: errors.array() });
    }
    
    // If validation passes, proceed to the next middleware or route handler
    next();
};

router.use((req, res, next) => {
    console.log(`A ${req.method} request was made to ${req.originalUrl}`);
    next();
});

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get a user by their Mongo _id
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         description: ID of the user to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *      404:
 *        description: User not found
 *     500:
 *        description: Error retrieving user
 */
router.get('/', validateRequestParams, user_controller.getHandler);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     parameters:
 *       - name: user_data
 *         in: body
 *         required: true
 *         description: The name and email address of the user to create
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *      500:
 *         description: Error creating user
 */
router.post('/', validateRequestBody, user_controller.postHandler);

/**
 * @swagger
 * /users:
 *   put:
 *     description: Update a user
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         description: The user to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.put('/', validateRequestBody, user_controller.putHandler);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     description: Delete a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *       - name: user_id
 *         in: query
 *         required: true
 *         description: ID of the user who is performing the delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/:id', validateRequestParams, user_controller.delHandler);

module.exports = router;

