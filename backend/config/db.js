import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const CONNECTION = process.env.CONNECTION_STRING ||3000

const CONECTDB = async() => {
  try {
    await mongoose.connect(CONNECTION)
    console.log("connected to the database");
  } catch (error) {
    console.log("not connected to the database",error);
  }
}


export default CONECTDB