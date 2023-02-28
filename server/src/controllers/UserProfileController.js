const UserProfile = require('../models/UserProfileModel');

class UserProfileController{

      static async user(req, res){
          const user = UserProfile.findAll()
      }

}

module.exports = UserProfileController;