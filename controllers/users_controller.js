const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

// --------------------------------------------
// GET Handler
exports.getHandler = async (req, res) => {
    const { user_id } = req.query;
    console.log(user_id);
    const _id = new ObjectId(user_id);
    const collection = req.app.locals.db.collection('users');
    try {
        const user = await collection.findOne({ _id: _id });
        //log the result to make sure it's correct
        console.log(user);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ error: 'Error retrieving user' });
    }
};

// --------------------------------------------
// POST Handler
exports.postHandler = async (req, res) => {
    const user = req.body;
    const collection = req.app.locals.db.collection('users');
    try {
        const result = await collection.insertOne(user);
        //log the result to make sure it's correct
        console.log(result);
        res.status(201).json(result);
        console.log('User created successfully');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Error creating user');
    }
};

// --------------------------------------------
// PUT Handler
exports.putHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;
        const collection = req.app.locals.db.collection('users');
        const result = await collection.findOneAndUpdate({ _id: id }, { $set: user }, { returnOriginal: false });
        //log the result to make sure it's correct
        console.log(result);
        if (!result.value) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(result.value);
        }
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Error updating user' });
    }
};

// --------------------------------------------
// DELETE Handler
exports.delHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = req.app.locals.db.collection('users');
        const result = await collection.findOneAndDelete({ _id: id });
        //log the result to make sure it's correct
        console.log(result);
        if (!result.value) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(result.value);
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Error deleting user' });
    }
};

