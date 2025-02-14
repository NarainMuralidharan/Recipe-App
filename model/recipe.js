const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema({
    title: String,
    cookingtime: String,
    servings: Number,
    ingredients: [{
        type: String,
        required: true
    }],
    instructions: [{
        type: String,
        required: true
    }],
});

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = {Recipe}