const Users = require('../users/users-model')
const bcrypt = require('bcryptjs')

const checkUserRegistered = async (req, res, next) => {
    
    let { username, password } = req.body
    
    try {

        let validUser = await Users.findBy({ username: username })

        console.log(validUser)
        if(!validUser) {
            next({message: "invalid credentials"})
        } else {
            if(validUser && bcrypt.compareSync(password, validUser.password)) {
                req.funny = 'is this working'
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
    checkUserRegistered
}