const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('src'))

app.set('trust proxy', 1)
   

app.use('/api', require('./routes/index'))
app.use('/api2', require('./routes/indexv2'))

app.use('/char', require('./routes/index2'))
app.use('/char2', require('./routes/index2v2'))

app.use('/comma', require('./routes/iComma'))
app.use('/comma2', require('./routes/iComma2'))

app.use('/and', require('./routes/iAnd'))
app.use('/and2', require('./routes/iAnd2'))

app.use('/vowel', require('./routes/iVowel'))
app.use('/vowel2', require('./routes/iVowel2'))

app.use('/avgword', require('./routes/iAvg'))
app.use('/avgword2', require('./routes/iAvg2'))



app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))