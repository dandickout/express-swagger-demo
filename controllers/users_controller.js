const { MongoClient } = require('mongodb');


// --------------------------------------------
// GET Handler
exports.getHandler = (req, res) => {
    const collection = req.app.locals.db.collection('users');
    collection.find().toArray((err, users) => {
        if (err) {
            console.error('Error retrieving users:', err);
            res.status(500).send('Error retrieving users');
            return;
        }
        res.json(users);
    });
};

// --------------------------------------------
// POST Handler
exports.postHandler = (req, res) => {
    const user = req.body;
    const collection = req.app.locals.db.collection('users');
    collection.insertOne(user, (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).send('Error creating user');
            return;
        }
        res.json(result.ops[0]);
    });
};

// --------------------------------------------
// PUT Handler
exports.putHandler = (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const collection = req.app.locals.db.collection('users');
    collection.findOneAndUpdate({ _id: id }, { $set: user }, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Error updating user');
            return;
        }
        res.json(result.value);
    });
};

// --------------------------------------------
// DELETE Handler
exports.delHandler = (req, res) => {
    const { id } = req.params;
    const collection = req.app.locals.db.collection('users');
    collection.findOneAndDelete({ _id: id }, (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Error deleting user');
            return;
        }
        res.json(result.value);
    });
};

