const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let votes = { gitops: 0, devops: 0 };

app.get('/api/results', (req, res) => { res.json(votes); });
app.post('/api/vote', (req, res) => {
    const { team } = req.body;
    if (votes[team] !== undefined) {
        votes[team]++;
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ error: 'Invalid selection' });
    }
});
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });
app.listen(PORT, () => { console.log(`Voting app running at http://localhost:${PORT}`); });
