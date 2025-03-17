import mongoose from "mongoose";

const db_connect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(`Database connected==> ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(`Error connecting to db ===> ${err}`);
    });
};

export default db_connect;
