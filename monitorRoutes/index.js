const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const { json } = require('express')

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

router.get('/', async (req, res) => {

    
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })

        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
        data = apiRes.body
        


        //logging request to the console
        if(process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }

        //if
        if(data.answer == 12)
        {
            if(data.string == "Contains 12 words")
            {
                if(data.error == false)
                {
                    data = "URL 1 for WordCount working as expected"
                }
                else{
                    dataError = data.error
                    data = "error expected was: false received: " + dataError
                }
            }
            else{
                dataString = data.string
                data = "String expected was: Contains 12 words received: " + dataString
            }
        }
        else{
            dataAnswer = data.answer
            data = "Answer expected was 12 received: " + dataAnswer
        }
        //console.log(data)
        res.status(200).json(data)
        //else - same as catch (error)

    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router