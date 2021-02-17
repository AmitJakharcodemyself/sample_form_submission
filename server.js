const express = require('express')
const app = express()
const db=require('./db')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set("view engine", "hbs")

app.get('/',function(req,res){
    db.getAllPersons().then(function(persons){
        res.render('persons_show',{
            persons
        })
    }).catch(function(err){
        res.send(err)
    })
})
// below will take to the add_perwsons frontend file/htmls file
app.get('/add',function(req,res){
res.render('add_person')
})


//below is post request for add and it'll send all values of forms to req.body 
// in below post request it'll add data sing mysql2 and nodejs so "persons" table 'll get updated and then using get('/) we can
// show updated data in hbs file 'peersons+show' using person data which was obtained forn running the person from db.js

app.post('/add',function(req,res){
    db.addNewPerson(req.body.name,req.body.age,req.body.city)
    .then(function(){
        res.redirect('/')
    })
    .catch(function(err){
        res.send(err)
    })
})
app.listen(4444, () => {
    console.log("Server started on http://localhost:4444/")
})