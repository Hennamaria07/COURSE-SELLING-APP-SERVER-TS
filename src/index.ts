import { app } from "./app";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect";

dotenv.config({path: "./.env"});
dbConnect()

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is up at port ${port}`)
})