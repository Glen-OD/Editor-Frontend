const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('src'))

app.set('trust proxy', 1)
   

app.use('/api', require('./routes'))

app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))