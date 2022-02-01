const User = require("../models/user");
class ContainerUsers{

    async getDataUser(id){
        try {
            const data = await User.findById(id)
            return data;
        } catch (error) {
            throw { message: `Something have gone wrong. ${error}` };
        }
    }
}
module.exports = ContainerUsers;