const Joi = require("joi")

const addSinUpValidation = async (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().required().error(new Error('userName is required!')),
        email: Joi.string().required().error(new Error('email is required!')),
        password: Joi.string().required().error(new Error('password is required!')),


    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(200).send(error.message);
    } else {
        return next()
    }
}

const addLoginValidation = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required().error(new Error('email is required!')),
        password: Joi.string().required().error(new Error('password is required!')),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(200).send(error.message);
    } else {
        return next()
    }
}

module.exports = { addSinUpValidation, addLoginValidation }