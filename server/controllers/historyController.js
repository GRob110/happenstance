const userHistories = {}; //TODO: temporary in-memory storage

exports.addHistory = (req, res) => {
    const { username, history } = req.body;

    if (!history) {
        console.log('no history provided');
        return res.status(400).json({ message: 'No history provided' });
    }

    if (!userHistories[username]) {
        userHistories[username] = [];
    }

    userHistories[username].push(...history);
    console.log('saved history', userHistories[username]);

    res.status(200).json({ message: 'History saved' });
};

exports.getHistory = (req, res) => {
    const user = req.params.username;

    if (!userHistories[user]) {
        return res.status(404).json({ message: 'No history found' });
    }

    res.status(200).json({ history: userHistories[user] });
};