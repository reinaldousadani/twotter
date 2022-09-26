const yup = require('yup')

const sessionSchema = yup.object().shape({
    username: yup.string().required("Username is required."),
    password: yup.string().min(6, "Password needs to have at least 6 characters.")
})

module.exports = sessionSchema