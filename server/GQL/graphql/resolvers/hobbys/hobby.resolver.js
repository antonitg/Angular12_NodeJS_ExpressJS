const mongoose = require('mongoose');
const Hobby = mongoose.model('Hobby');

const resolvers = {
    Query: {
        getYourHobbys: async(root, {}, context) => {

            var hobbys = await Hobby.find({ id_user: context.user.user.id });

            return hobbys;
        }
    },
    Mutation: {
        newHobby: async(root, { newHobby }, context) => {
            newHobby.id_user = context.user.user.id;

            hobby = new Hobby(newHobby);
            await hobby.save();

            return hobby;
        }
    }
};

module.exports = resolvers;