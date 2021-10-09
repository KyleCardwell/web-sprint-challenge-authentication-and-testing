const Users = require('../users/users-model')
const bcrypt = require('bcryptjs')

const checkCredentials = (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        res.json({ message: "username and password required"})
    } else {

        next()
    }
}

const checkUsernameAvailable = async (req, res, next) => {
    const { username } = req.body

    try {
        let validUser = await Users.findBy({ username: username })

        if(validUser) {
            res.json({ message: "username taken" })
        } else {            
            next()
        }
    } catch(err) {

        next(err)
    }
}

const checkUserRegistered = async (req, res, next) => {
    
    let { username, password } = req.body
    
    try {

        let validUser = await Users.findBy({ username: username })

        if(!validUser) {
            next({message: "invalid credentials"})
        } else {
            if(validUser && bcrypt.compareSync(password, validUser.password)) {
                next()
            } else {
                next({message: "invalid credentials"})
            }
        }
    } 
    catch(err) {
        next(err)
    }
}

module.exports = {
    checkCredentials,
    checkUsernameAvailable,
    checkUserRegistered
}