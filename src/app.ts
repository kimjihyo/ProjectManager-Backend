import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import rootRouter from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI!,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log('Failed to connect to the DB!');
    } else {
      console.log('Connected to the DB');
    }
  });

app.use(express.json());
app.use('/api', rootRouter);

app.listen(port, () => console.log(`server is listening on ${port}`));
