import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js"


const app = express();
dotenv.config();

const connect = () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    } catch (error) {
        throw error
    }
};

const options = {
    definition: {
        openapi : '3.0.0',
        info : {
            title : 'Node JS CRUD Project',
            version : '1.0.0'
        },
        servers : [
            {
                url : 'http://localhost:8000/'
            }
        ]
    },
    apis : ['./routes/*.js']
}


const swaggerSpecs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//middleware

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", productRoute);


app.listen(8000, () => {
    connect();
    console.log("Connected to backend.");
})

