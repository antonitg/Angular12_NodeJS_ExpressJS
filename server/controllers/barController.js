const { QueryTypes } = require('sequelize');
const Bar = require('../models').bar;
const BarCatego = require('../models').bar_catego_in;
const { generateId } = require('../utils/generateIds');
const db = require('../models/index');

module.exports.createBar = async(req, res) => {
    try {
        var c_bar = await Bar.create({
            id: generateId(),
            nom: req.body.nom,
            descr: req.body.descr,
            direcc: req.body.direcc,
            city: req.body.city,
            coords: req.body.coords,
            horari: req.body.horari,
            owner: req.body.owner,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        if (req.body.id_catego.length == 2) {
            for (let i = 0; i < req.body.id_catego.length; i++) {
                await BarCatego.create({
                    id_catego: req.body.id_catego[i],
                    id_bar: c_bar.id,
                });
            }
        } else if (req.body.id_catego.length == 1) {
            await BarCatego.create({
                id_catego: req.body.id_catego[0],
                id_bar: c_bar.id,
            });
        }

        res.json(c_bar);
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}
module.exports.getBars = async(req, res) => {
    try {
        var catego = req.params.catego;
        var search = req.params.search;
        var city = req.params.city;
        var limit = req.params.limit;

        if (catego == "no-param") {
            catego = "";
        }
        if (search == "no-param") {
            search = "";
        }
        if (city == "no-param") {
            city = "";
        }
        if (limit == "no-param") {
            limit = 10;
        }

        var g_bars = await db.sequelize.query('SELECT b.*, bc.nom as catego, bc.id as id_catego FROM bars b, bar_categos bc, bar_catego_ins bci WHERE b.id = bci.id_bar AND bci.id_catego = bc.id AND b.nom LIKE "%' + search + '%" AND b.city LIKE "%' + city + '%" AND bc.nom LIKE "%' + catego + '%" LIMIT ' + limit, { type: QueryTypes.SELECT });
        res.json(g_bars);
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}
module.exports.updateBarInfo = async(req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}
module.exports.deleteBar = async(req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}