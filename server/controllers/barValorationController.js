const { json } = require("body-parser");
const BarValoration = require("../models/barValorationModel");

module.exports.create_valoration = async(req, res) => {
    try {
        var new_rate = req.body.rate;
        if (new_rate > 5) {
            new_rate = 5;
        } else if (new_rate < 1) {
            new_rate = 1;
        }

        var valoration = {
            id_user: req.body.id_user,
            rate: new_rate,
            descr: req.body.descr,
            date: new Date()
        }

        await BarValoration.updateOne({ id_bar: req.body.id_bar }, { $push: { valorations: valoration } });

        res.json("Valoracion creada correctamente");
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}

module.exports.getBarValorations = async(req, res) => {
    try {

        var skip = req.params.limit - 10;

        var valorations = await BarValoration.aggregate([
            { "$match": { "id_bar": req.params.id_bar } },
            { "$unwind": "$valorations" },
            { "$sort": { "valorations.rate": -1 } },
            { "$project": { "_id": 0, "id_user": "$valorations.id_user", "rate": "$valorations.rate", "descr": "$valorations.descr", "date": "$valorations.date" } },
            { "$skip": skip },
            { "$limit": 10 }
        ]);

        if (!valorations) {
            res.status(404).json({ msg: 'No existe el Bar' });
        }

        res.json(valorations);

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}