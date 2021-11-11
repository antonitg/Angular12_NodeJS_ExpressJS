var mongoose = require('mongoose');

var HobbySchema = new mongoose.Schema({
    nom: String,
    descr: String,
    id_user: String
}, { timestamps: false });

module.exports = mongoose.model('Hobby', HobbySchema);