const mongoose = require('mongoose');
const Hobby = mongoose.model('Hobby');

const resolvers = {
    Mutation: {
        newHobby: async(root, { newHobby }, context) => {
            // console.log(newHobby);
            // console.log(context.user);

            newHobby.id_user = context.user.user.id;

            hobby = new Hobby(newHobby);
            await hobby.save();

            return hobby;
        }
    }
};

module.exports = resolvers;