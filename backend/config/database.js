import mongoose from 'mongoose';

export const connectDB = (mongoString) => {
  mongoose.connect(mongoString);
  const database = mongoose.connection;

  database.on('error', (error) => {
    console.log(error);
  });

  database.once('connected', () => {
    console.log('Database Connected');
  });
};