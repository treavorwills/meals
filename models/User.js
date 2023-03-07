const { Schema, model } = require('mongoose');
// import isEmail from 'validator/lib/isEmail';
const validator = require('validator');


// validation resource: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax

// Schema to create User model
const userSchema = new Schema(
    {
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        username: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, 'invalid email'],
        },
    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
        },
        id:false,
    }
);

// Virtual to retreive friend count
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;