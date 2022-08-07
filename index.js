import { router } from './routes/router.js'
import cors from 'cors'
import express from 'express';
import bodyParser from 'body-parser';


const PORT = process.env.PORT || 3001;



const app = express();


app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use('/api', router);



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});