
import dns from 'node:dns/promises';
dns.setServers(['1.1.1.1', '8.8.8.8']);

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");
}

export default main;
