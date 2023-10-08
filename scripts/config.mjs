// File: config.mjs
// Author: Clara D. & Maxime S.
// Description: Classes to create the objects used in the mapping and evaluation scripts

// Dependencies
import mysql from 'mysql';
import { config } from 'dotenv';
config(); // Load the .env file

// Connection to the database (using .env file)
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

const FILEPATH = './data/data.json';
const WEIGHTS = {
  'connections': 1,
  'displays': 1,
  'posts': 1,
  'activities': 1
};

const TITLES = Object.keys(WEIGHTS);

export { connection, FILEPATH, WEIGHTS, TITLES };