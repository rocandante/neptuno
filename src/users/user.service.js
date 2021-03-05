
const bcrypt = require('bcryptjs')

module.exports = {
    basicInfo,
    hash
}

function basicInfo(user) {
    const { id, username, name, email, rol, isActive, createdOn } = user
    return { id, username, name, email, rol, isActive, createdOn }
}


function hash(password) {
    return bcrypt.hashSync(password, 10);
}

/*
function generateJwtToken(account) {
    // create a jwt token containing the account id that expires in 15 minutes
    return jwt.sign({ sub: account.id, id: account.id }, config.secret, { expiresIn: '15m' });
}
*/