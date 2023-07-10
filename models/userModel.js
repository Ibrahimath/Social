const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db')



const user = sequelize.define("users", {
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  surname: {
    type: DataTypes.STRING(100),
    allowNull: false,
   }
   ,
  othernames: { type: DataTypes.STRING(100),
     allowNull: false,
      
    },
  username: { type: DataTypes.STRING(100),
     allowNull: false, unique: true 
    },
  email: { type: DataTypes.STRING(100),
     allowNull: true,
      
},
  occupation: { type: DataTypes.STRING(100), 
    allowNull: true, 
    
},
  about_me: { type: DataTypes.STRING(220), 
    allowNull: false },
  password_hash: { type: DataTypes.STRING(100),
     allowNull: true,
      
},
  password_salt: { type: DataTypes.STRING(100),
     allowNull: true
}
})

//user.sync()
module.exports = user
