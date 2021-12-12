const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const Datastore = require('nedb');
const { response } = require('express');
const req = require('express/lib/request');

//const pathToData = path.resolve(__dirname, "db/db")
//const db = new Datastore({ filename: pathToData});
//db.loadDatabase();

const database = new Datastore('database.db');
database.loadDatabase();
//database.insert({name: 'glen', status: 'good'});
//database.insert({name: 'nova', status: 'bad'});

const app = express()

app.use(express.static('src'))

app.use(express.json());

app.set('trust proxy', 1)

/* app.get("/api", (req, res) => {    
    db.find({}, function (err, docs) {
        if(err){
            return err;
        } 
        res.json(docs);
    });
});

app.post("/api", (req, res) => {
    // our unix timestamp
    const unixTimeCreated = new Date().getTime();
    // add our unix time as a "created" property and add it to our request.body
    const newData = Object.assign({"created": unixTimeCreated}, req.body)

    // add in our data object to our database using .insert()
    db.insert(newData, (err, docs) =>{
        if(err){
            return err;
        }
        res.json(docs);
    });
}) */


app.post('/tester', (request, response) => {
    console.log('Saving text + giving out id');
    const data = request.body;
    database.insert(data);
    //console.log('------------------');
    //console.log(request.body);
    //console.log('------------------');
    //console.log(request.body.textfromclient);
    //console.log('------------------');
    database.find({textfromclient: `${request.body.textfromclient}`}, (err, spData) => {
        if(err) {
            console.log("Error: + " + request.body);
            response.end();
            return;
        }
        //console.log("we are in");
        //console.log(spData);
        response.json(spData);
    })
    //console.log(database);
    //response.json(data);
});

app.post('/getTester', (request, response) => {
    console.log("taking in id + giving out text");
    //console.log(request.body);
    database.find({_id: `${request.body._id}`}, (err, data) => {
        if(err) {
            console.log("Error: + " + request.body);
            response.end();
            return;
        }
        response.json(data);
    })
    
})



/* app.post('/tester', (request, response) => {
    console.log('I have a request');
    console.log(request.body);
    const data = request.body;
    database.push(data);
    console.log(database);
    response.json({
        status: 'success',
        text: data.string
    });
}); */



   

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