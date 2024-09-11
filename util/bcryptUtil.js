const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.createBcrypt = (password) =>{
    return bcrypt.hashSync(password,salt);
}

exports.compareBcrypt = async (password,encodePassword)=>{
    return await bcrypt.compare(password,encodePassword);
}
