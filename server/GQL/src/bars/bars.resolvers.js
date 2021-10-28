const Bar = require("./bars.model");

const insertBar = (_, { bar }) => {

}

const deleteBar = (_, { id, id_user }) => {

}

const getBars = (_, { id, id_user }) => {

}

const chefResolvers = {
    Query: {
        getYourBars: getBars
    },
    Mutation: {
        newBar: insertBar,
        deleteBar: deleteBar
    },
    Bar: {
        async bar(barInfo) {
            console.log(barInfo)
            const recipes = await Recipe.find({ chef: chefInfo.id }).exec()
            return recipes
        }
    }
};