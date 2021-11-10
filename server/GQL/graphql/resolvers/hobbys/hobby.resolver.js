const mongoose = require('mongoose');
const Hobby = mongoose.model('Hobby');
// const Bar = require('../../../models').bar;

const resolvers = {
    Mutation: {
        newHobby: async(root, { newHobby }) => {
            console.log(newHobby);
            hobby = new Hobby(newHobby);
            await hobby.save();
            // console.log(hobby);
            return hobby;
        }
    }
};

module.exports = resolvers;