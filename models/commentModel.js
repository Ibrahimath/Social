const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')



const comment = sequelize.define("comments", {  
    comment_id: {
        type: DataTypes.UUID,
        allowNull: false,
      // unique: true,
      },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    //primaryKey: true,
  },
  post_id: {
    type: DataTypes.UUID,
    allowNull: false,
    //primaryKey: true,
  },
   comment:{
    type: DataTypes.STRING(200),
    allowNull: false,
   }
})
 
module.exports = comment