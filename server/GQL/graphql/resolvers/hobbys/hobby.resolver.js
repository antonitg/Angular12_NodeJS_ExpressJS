const mongoose = require('mongoose');
const Hobby = mongoose.model('Hobby');
// const Bar = require('../../../models').bar;

const resolvers = {
    Mutation: {
        newHobby: async(root, { newHobby }) => {
            let hobby = new Hobby(newHobby);
            await hobby.save();
            return hobby;
        }
    }
};

module.exports = resolvers;