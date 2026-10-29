//import mysql2 from "mysql2";

//const db = mysql2.createConnection({
 // host: "localhost",
 // user: "root",
//  password: "password",
 // database: "teta",
//});
//export default db;

import mongoose from "mongoose";


const connectDB = mongoose.connect({
    username:{type:string , require:true}
});
export default connectDB;
