const mongoose = require('mongoose');

const conectarDB = async() => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('BBDD MongoDB conectada');

    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = conectarDB;