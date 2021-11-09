var router = require('express').Router();

// console.log(user_utils);

router.get('/', async(req, res, next) => {
    console.log("Dentro del get de la ruta");
    try {
        return res.json({ msg: "Ye que aço ja va" });
    } catch (e) {
        next(e);
    }
});

module.exports = router;