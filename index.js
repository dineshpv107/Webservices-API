import employee from "./model/student.js";
import express from 'express';
import mongoose from "mongoose";
import router from './things.js';

var app = express();
var CONNECTION_URL = "mongodb://127.0.0.1:27017/Dummy?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4"

app.use(express.json())
app.use('/try', function (req, res) {
    var a = req.body.a;
    var b = req.body.b;
    res.status(200).json({ message: a + " " + b })
});

// app.use('/', (req, res) => {
//     res.send("Vanakkamda maple localhost la irunthu!!!")
// })

app.use('/createDataBase', async (req, res) => {
    try {
        var data = await employee.create({
            name: "dinesh",
            age: 21,
            gender: "male"
        });
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

app.get('/:id([0-9]{4})', (req, res) => {
    console.log(req.params.id);
    // debugger;
    res.send("the number you typed is :" + req.params.id);
})

app.get('/things/:name/:id', (req, res) => {
    res.send('id:' + req.params.id + " And Name:" + req.params.name)
})

app.use('/insertData', async (req, res) => {
    var name = req.body.name;
    console.log(name);
    try {
        var data = await employee.create({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
        })
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.use('/getData', async (req, res) => {
    try {
        var data = await employee.find();
        res.send(data);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.use('/getSingleData', async (req, res) => {
    try {
        var data = await employee.find({
            name: req.body.name,
            age: req.body.age
        });
        res.send(data);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.use('/update/:id', async (req, res) => {
    try {
        await employee.update({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender
            }
        })
        var update = await employee.find({ _id: req.params.id })
        res.send(update);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.use('/removeData/:id', async (req, res) => {
    await employee.findByIdAndDelete({ _id: req.params.id }).then(res.send(`deleted successfully`))
})

// app.use('/getSingleData', async (req, res) => {
//     try {
//         var data = await employee.findOne({ projection: { name: req.body.name } });
//         res.send(data);
//     } catch (error) {
//         res.status(400).json(error.message);
//     }
// })

app.get('*', function (req, res) {
    res.send('Sorry, this is an invalid URL.');
});

app.use('/router', router);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5223, () => (console.log("app is listenting in port 5223")));
    })