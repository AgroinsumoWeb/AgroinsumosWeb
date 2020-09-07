"use strict";require("dotenv").config();var express=require("express"),cors=require("cors"),morgan=require("morgan"),app=express(),database=require("./config/database"),PORT=process.env.PORT;app.use(cors()),app.use(express.urlencoded({extended:!1})),app.use(express.json()),app.use(morgan("dev")),app.use("/auth",require("./routers/authConnection")),app.use("/passage",require("./routers/dataPassage")),app.listen(PORT,function(){console.log("Server on port ".concat(PORT))});