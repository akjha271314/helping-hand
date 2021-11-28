import express from 'express';
//import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb://akjha271314:helloworld99@cluster0-shard-00-00.wkojm.mongodb.net:27017,cluster0-shard-00-01.wkojm.mongodb.net:27017,cluster0-shard-00-02.wkojm.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-c57m7o-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((e) => console.log(e.message));

//mongoose.set('useFindAndModify', false);