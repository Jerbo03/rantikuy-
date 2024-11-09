require('./db');
const express = require('express') 
const userRoutes = require('./routes/userRoutes');    
require('dotenv').config();
const morgan = require('morgan');



const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json()); 
app.use(morgan('dev'));
app.use('/api',userRoutes);
// routes
//app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port} 🚀`)
})