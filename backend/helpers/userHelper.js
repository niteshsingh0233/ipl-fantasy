const bcrypt = require('bcrypt')

exports.hashPassword = async (password) => {
    const saltRounds = 10;
console.log(saltRounds)
const salt = await bcrypt.genSalt(saltRounds);
console.log(saltRounds)
console.log(salt)
const hash = await bcrypt.hash(password, salt);
console.log(saltRounds)
console.log(hash)
return hash;
}

exports.comparePassword = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword);
}