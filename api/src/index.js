import express from "express";
import cors from "cors";

const app = express();

// Middlewares...
app.use(express.json());
app.use(cors());

app.listen(3001, () => {
    console.log("App running - Port 3001");
});