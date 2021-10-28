'use strict';
const {
    Model
} = require('sequelize');
const sha256 = require('crypto-js/sha256');
const hmacSHA512 = require('crypto-js/hmac-sha512');
// require('dotenv').config({ path: 'config/variables.env' });

const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequelize, DataTypes) => {
    class bar extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    bar.init({
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
        },
        nom: DataTypes.STRING,
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        descr: DataTypes.STRING,
        direcc: DataTypes.STRING,
        city: DataTypes.STRING,
        coords: DataTypes.STRING,
        horari: DataTypes.STRING,
        owner: DataTypes.STRING,
        foto: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'bar',
    });

    SequelizeSlugify.slugifyModel(bar, { source: ['nom'], slugOptions: { lower: true } });

    var datetime = new Date();
    var id = datetime.getTime() + (Math.random() * Math.pow(36, 6) | 0).toString(36);
    var hashDigest = sha256(id);
    var myid = hmacSHA512(hashDigest, process.env.SECRET_ID).toString();
    bar.id = myid;

    return bar;
};