const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const controller = require('./controller');

/**
 * Middleware function to validate the request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const validateRequestBody = async (req, res, next) => {
    const validationRules = [
        body('field1').exists().withMessage('field1 is required'),
        body('field2').exists().withMessage('field2 is required')
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
    const validationRules = [
        query('cust_id').exists().withMessage('cust_id is required')
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

/**
 * @swagger
 * /:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     description: Create a new user
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     description: Update an existing user
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     description: Delete a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */

router.get('/', validateRequestParams, controller.getHandler);

router.post('/', validateRequestBody, controller.postHandler);

router.put('/', validateRequestBody, controller.putHandler);

router.delete('/:id', validateRequestParams, controller.delHandler);

module.exports = router;

