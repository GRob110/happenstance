import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL,
}));

const checkJwt = auth({
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
    tokenSigningAlg: 'RS256',
});

app.get('/api/public', (req, res) => {
    res.status(200).send('Public API');
});

app.get('/api/private', checkJwt, (req, res) => {
    res.status(200).send('Private API');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});