
// --------------------------------------------
// GET Handler
exports.getHandler = (req, res) => {
    let body = req.body;
    console.log(JSON.stringify(body, null, 4));

    let query = req.query;
    console.log(JSON.stringify(query, null, 4));

    res.send('Received a users GET request');
};

// --------------------------------------------
// POST Handler
exports.postHandler = (req, res) => {
    let body = req.body;
    console.log(JSON.stringify(body, null, 4));

    let query = req.query;
    console.log(JSON.stringify(query, null, 4));

    res.send('Received a users POST request');
};

// --------------------------------------------
// PUT Handler
exports.putHandler = (req, res) => {
    let body = req.body;
    console.log(JSON.stringify(body, null, 4));

    let query = req.query;
    console.log(JSON.stringify(query, null, 4));

    res.send('Received a users PUT request');
};

// --------------------------------------------
// DELETE Handler
exports.delHandler = (req, res) => {
    let body = req.body;
    console.log(JSON.stringify(body, null, 4));

    let query = req.query;
    console.log(JSON.stringify(query, null, 4));

    res.send('Received a users DELETE request');
};
