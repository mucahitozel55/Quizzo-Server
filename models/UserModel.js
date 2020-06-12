const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        id: {
            type: String,
            unique: true
        },
        username: {
            type: String,
            required: "username required"
        },
        imageURL: String,
        email: {
            type: String,
            required: "email required"
        },
        history: {
            type: [{}]
        },
    },
    {
        collection: 'USERS'
    }
)

module.exports = mongoose.model("User", UserSchema)