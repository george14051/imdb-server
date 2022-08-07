import { router } from './routes/router.js'
import cors from 'cors'
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';


const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));

app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use('/api', router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});