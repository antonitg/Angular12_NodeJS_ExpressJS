const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-beautiful-unique-validation');
const slug = require('slug');

const ProdSchema = mongoose.Schema({
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    nom: {
        type: String,
        required: true
    },
    id_bar: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    id_cat: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: false
    },
    types: [{
        nom: {
            type: String,
            required: true
        },
        descr: {
            type: String,
            required: true
        },
        preu: {
            type: Number,
            required: true
        },
        stock: {
            type: Boolean,
            required: true
        }
    }],
    extras: [{
        nom: {
            type: String,
            required: true
        },
        descr: {
            type: String,
            required: true
        },
        preu: {
            type: Number,
            required: true
        },
        foto: {
            type: String,
            required: false
        },
        solo: {
            type: Boolean,
            required: true
        }
    }]
}, {
    timestamps: true
});

ProdSchema.plugin(uniqueValidator, { message: 'is already taken' });

ProdSchema.pre('validate', function(next) {
    if (!this.slug) {
        this.slugify();
    }

    next();
});

ProdSchema.methods.slugify = function() {
    this.slug = slug(this.nom) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);

};


module.exports = mongoose.model('Product', ProdSchema);