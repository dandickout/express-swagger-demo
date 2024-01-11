const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const org_controller = require('../controllers/org_controller');

/**
 * Middleware function to validate the request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const validateRequestBody = async (req, res, next) => {
    const validationRules = [
        body('name').exists().withMessage('name is required'),
        body('address').exists().withMessage('address is required')
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
        query('org_id').exists().withMessage('org_id is required')
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
 * /orgs:
 *   get:
 *     description: Get a user
 *     parameters:
 *       - name: org_id
 *         in: query
 *         required: true
 *         description: ID of the user to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', validateRequestParams, org_controller.getHandler);

/**
 * @swagger
 * /orgs:
 *   post:
 *     description: Create a new user
 *     parameters:
 *       - name: org_data
 *         in: body
 *         required: true
 *         description: The name and email address of the user to create
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             address:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', validateRequestBody, org_controller.postHandler);

/**
 * @swagger
 * /orgs:
 *   put:
 *     description: Update a user
 *     parameters:
 *       - name: org
 *         in: body
 *         required: true
 *         description: The org to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             address:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.put('/', validateRequestBody, org_controller.putHandler);

/**
 * @swagger
 * /orgs/{id}:
 *   delete:
 *     description: Delete an org
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the org to delete
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
router.delete('/:id', validateRequestParams, org_controller.delHandler);

module.exports = router;

