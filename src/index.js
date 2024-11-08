const express = require('express') 
//require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json()); 

// routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port} 🚀`)
})