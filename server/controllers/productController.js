const Product = require("../models/productModel.js");


exports.crearProduct = async(req, res) => {
    try {
        let product = new Product;
        product.nom = req.body.nom;
        product.id_bar = req.body.id_bar;
        product.descr = req.body.descr;
        product.id_cat = req.body.id_cat;
        product.foto = req.body.foto;

        for (let i = 0; i < req.body.types.length; i++) {
            product.types.push({
                nom: req.body.types[i].nom,
                descr: req.body.types[i].descr,
                preu: req.body.types[i].preu,
                stock: req.body.types[i].stock
            });
        }

        for (let i = 0; i < req.body.extras.length; i++) {
            product.extras.push({
                nom: req.body.extras[i].nom,
                descr: req.body.extras[i].descr,
                preu: req.body.extras[i].preu,
                foto: req.body.extras[i].foto,
                solo: req.body.extras[i].solo
            });
        }

        await product.save();
        res.send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}

exports.obtenerProducts = async(req, res) => {
    try {
        const Products = await Product.find({ "id_bar": req.params.id_bar });
        res.json(Products);
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}

exports.actualizarProduct = async(req, res) => {
    try {
        const { nom, id_bar, descr, id_cat, preu, stock, foto } = req.body;
        let actPrd = new Product;
        actPrd = await Product.findById(req.params.id);

        if (!actPrd) {
            res.status(404).json({ msg: 'No existe el Producto' })
        }

        actPrd.nom = nom;
        actPrd.id_bar = id_bar;
        actPrd.descr = descr;
        actPrd.id_cat = id_cat;
        actPrd.preu = preu;
        actPrd.stock = stock;
        actPrd.foto = foto;

        actPrd = await Product.findOneAndUpdate({ _id: req.params.id }, actPrd, { new: true })
        res.json(actPrd)
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}

exports.obtenerProduct = async(req, res) => {
    try {
        let nouPrd = new Product;
        nouPrd = await Product.findById(req.params.id);
        if (!nouPrd) {
            console.log(req);
            res.status(404).json({ msg: 'No existe el Product' })
        } else {
            res.json(nouPrd);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}

exports.eliminarProduct = async(req, res) => {
    try {
        let elmPrd = new Product;
        elmPrd = await Product.findById(req.params.id);
        if (!elmPrd) {
            res.status(404).json({ msg: 'No existe el Product' })
        }
        await Product.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Product eliminado con éxito!' })
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR 500');
    }
}