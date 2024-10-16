const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    firstName:{
type:String
    },
    surName:{
        type:String
            },
    email:{
        type:String
    },
    department:{
        type:String
    }

})

module.exports = mongoose.model("Faculty", facultySchema);