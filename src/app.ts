import express, {Express} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes"

export const app: Express = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "16kb", extended: true}));
app.use(cookieParser());

app.use('/api/v1/user', userRoute);
