const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

const API_BASE_URL = process.env.API_AND_URL
const API_KEY_NAME = process.env.API_KEY_NAMEA
const API_KEY_VALUE = process.env.API_KEY_VALUE

router.get('/', async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })

        newMessage = params.toString()
        newerMessage = newMessage.replace(/\+/g, '%20');

        const apiRes = await needle('get', `${API_BASE_URL}/${newerMessage}`)
        const data = apiRes.body

        //logging request to the console
        if(process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${API_BASE_URL}/${newerMessage}`)
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router