const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')



const post = sequelize.define("users", {  
  id: {
    type: DataTypes.STRING(100),
    allowNull: false,
    primaryKey: true
  },
    post_id: {
        type: DataTypes.UUID,
        allowNull: false,
      // unique: true,
      },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    //primaryKey: true,
  },
   post:{
    type: DataTypes.STRING(200),
    allowNull: false,
   }
})

module.exports = post