import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({ message: 'Hello from the backend!'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});