require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const displayRoutes = require('express-routemap');
const sequelize = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const adminRoutes = require('./routes/adminRoutes')
app.use(bodyParser.json())



app.use('/social/v1/user', userRoutes)
app.use('/social/v1/user/post', postRoutes)
app.use('/social/v1/user/comment', commentRoutes)
//app.use('/social/v1/admin', adminRoutes)

sequelize.authenticate()
  .then(() => {
   console.log('Connection has been established successfully.');
    app.listen(port, () => {
      displayRoutes(app);
    })
  })
  .catch(err => console.log('Error: ' + err))