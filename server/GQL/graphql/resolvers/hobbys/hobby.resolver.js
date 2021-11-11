// const mongoose = require('mongoose');
// const Hobby = mongoose.model('Hobby');
const Hobby = require('../../../models/hobby');
const ObjectId = require('mongoose').Types.ObjectId;

const resolvers = {
    Query: {
        getYourHobbys: async(root, {}, context) => {

            var hobbys = await Hobby.find({ id_user: context.user.user.id });

            return hobbys;
        },
        deleteHobby: async(root, { idInput }, context) => {

            var ok = Boolean(idInput.id);
            var hobby = await Hobby.find({ _id: new ObjectId(idInput.id) });

            if (hobby[0]) {
                if (hobby[0]._doc) {
                    var id_user = hobby[0]._doc.id_user;
                    if (id_user === context.user.user.id) {
                        Hobby.find({ _id: new ObjectId(idInput.id) }).remove().exec();
                        return { ok };
                    }
                }
            }

            ok = false;

            return { ok };
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