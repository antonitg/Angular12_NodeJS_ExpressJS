const ObjectId = require('mongoose').Types.ObjectId;
const BarValoration = require("../models/barValorationModel");
const User = require('../models').user;
const { validateValoration } = require("../utils/validate");

module.exports.create_valoration = async(req, res) => {
    try {

        var check_valoration = await BarValoration.findOne({
            id_bar: req.body.id_bar,
            "valorations.id_user": req.user.id
        })

        if (check_valoration) {
            res.status(401).json({ msg: "Ya has hecho una reseña en este bar" });
        } else {
            var new_rate = req.body.rate;
            if (new_rate > 5) {
                new_rate = 5;
            } else if (new_rate < 1) {
                new_rate = 1;
            }

            var valoration = {
                id_user: req.user.id,
                rate: new_rate,
                descr: req.body.descr,
                date: new Date()
            }

            await BarValoration.updateOne({ id_bar: req.body.id_bar }, { $push: { valorations: valoration } });

            res.json({ msg: "Valoracion creada correctamente" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}

module.exports.getBarValorations = async(req, res) => {
    try {

        if (req.user) {
            var user_valoration = await BarValoration.findOne({
                id_bar: req.params.id_bar,
                "valorations.id_user": req.user.id
            });
        }

        // var skip = req.params.limit - 10;

        var valorations = await BarValoration.aggregate([
            { "$match": { "id_bar": req.params.id_bar } },
            { "$unwind": "$valorations" },
            { "$sort": { "valorations.rate": -1 } },
            { "$project": { "_id": "$valorations._id", "id_user": "$valorations.id_user", "rate": "$valorations.rate", "descr": "$valorations.descr", "date": "$valorations.date" } },
            // { "$skip": skip },
            // { "$limit": 10 }
        ]);

        if (!valorations) {
            res.status(404).json({ msg: 'No existe el Bar' });
        }

        for (let i = 0; i < valorations.length; i++) {

            if (req.user && user_valoration) {

                if (req.user.id == valorations[i].id_user) {
                    this_user = await User.findOne({
                        where: {
                            id: req.user.id
                        }
                    });
                    user_valoration = valorations[i];

                    user_valoration.nom = this_user.nom;
                    user_valoration.propia = true;

                    valorations.splice(i, 1);

                    valorations.unshift(user_valoration);
                }

            } else {
                this_user = await User.findOne({
                    where: {
                        id: valorations[i].id_user
                    }
                });

                if (!this_user) {
                    this_user = { nom: "Usuario no encontrado" };
                }

                valorations[i].nom = this_user.nom;
            }
        }

        res.json(valorations);

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}

module.exports.updateValoration = async(req, res) => {
    try {
        var valoration = await BarValoration.aggregate([
            { "$unwind": "$valorations" },
            { "$match": { "valorations._id": new ObjectId(req.params.id_valoration) } }
        ]);

        if (!valoration[0]) {
            throw { status: 401, message: 'La valoracion no existe' };
        } else if (req.user.id != valoration[0].valorations.id_user) {
            throw { status: 403, message: 'La valoracion no pertenece al usuario' };
        }

        const { rate, descr } = req.body;

        var validate = validateValoration(rate, descr);
        if (validate != true) {
            throw { status: 500, message: "Parametros incorrectos", data: validate };
        }

        var new_valoration = valoration[0].valorations;

        new_valoration.rate = rate;
        new_valoration.descr = descr;
        new_valoration.date = new Date();

        if (new_valoration.rate > 5) {
            new_valoration.rate = 5;
        } else if (new_valoration.rate < 1) {
            new_valoration.rate = 1;
        }

        var update_valoration = await BarValoration.findOneAndUpdate({
            valorations: { $elemMatch: { _id: new ObjectId(req.params.id_valoration) } }
        }, {
            $set: { 'valorations.$': new_valoration }
        }, {
            'new': true,
            'safe': true,
            'upsert': true
        });

        res.json({ status: 200, message: "Valoracion modificada correctamente", data: new_valoration });
    } catch (error) {
        console.log(error);
        if (!error.status) error.status = 500;
        res.status(error.status).send(error);
    }
}