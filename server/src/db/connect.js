const Sequelize = require('sequelize'); 
const dbConfig = require('../config/db')

const User = require('../models/User')
const Service = require('../models/Service');
const Scheduling = require('../models/Scheduling');
const UserProfile = require('../models/UserProfile');

const dbConnect = new Sequelize(dbConfig);
User.init(dbConnect)
Service.init(dbConnect)
Scheduling.init(dbConnect)
UserProfile.init(dbConnect)


module.exports = dbConnect;
