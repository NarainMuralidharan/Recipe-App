const express = require("express");
const cors = require("cors")
const mongodb = require("mongodb")
const mongoose = require("mongoose")
const app = express();
const dotenv = require("dotenv").config();

const URL = process.env.DB || "mongodb://localhost:27017";
mongoose.connect(URL);

const { Recipe } = require("./model/recipe");

app.use(express.json());
app.use(cors({ origin: "*", }));

app.get("/getrecipes", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(404).json({ message: "Recipe not found", error });
    }
});

app.post("/postrecipes", async (req, res) => {
    try {
        await Recipe.insertMany(req.body); 
        res.status(200).json({ message: "Recipes added successfully"});
    } catch (error) {
        res.status(400).json({ message: "Recipe not added" });
    }
});

app.get("/getrecipes/:id", async (req, res) => {
    try {
        let recipe = await Recipe.findOne({ _id: req.params.id });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(404).json({ message: "Recipe not found" });
    }
});

app.put("/updaterecipes/:id", async (req, res) => {
    try{
        let recipe = await Recipe.findOneAndUpdate({ _id: req.params.id }, req.body);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({ message: "Recipes updated successfully"});
    } catch(error){
        res.status(404).json({ message: "Recipe not found" });
    }
})

app.delete("/deleterecipes/:id", async (req, res) => {
    try {
        await Recipe.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        res.status(404).json({ message: "Recipe not found" });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})