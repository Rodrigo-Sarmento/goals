const mongoose = require('mongoose');
const { Schema } = mongoose;

const meta = new Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    status:{
        type: String
    }
},{
    timestamps: true
})

mongoose.model('Meta',meta);