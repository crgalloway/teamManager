//Definitions ==>
const express = require('express')
const app = express()

const port = 1337;

const path = require('path')

const bp = require('body-parser')
app.use(bp.json())

app.use(express.static(__dirname+'/client/dist'))

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/persons')
//<== end definitions

//Schemas ==>
var PersonSchema = new mongoose.Schema({
	name: {type:String, minlength:2},
	position: {type:String},
	status: {
		game1: {
			playing: {type:Boolean, default: false},
			notPlaying:{type:Boolean, default: false},
			undecided:{type:Boolean, default: true},
		},
		game2: {
			playing: {type:Boolean, default: false},
			notPlaying:{type:Boolean, default: false},
			undecided:{type:Boolean, default: true},
		},
		game3: {
			playing: {type:Boolean, default: false},
			notPlaying:{type:Boolean, default: false},
			undecided:{type:Boolean, default: true},
		},
	}
}, {timestamps:true})
mongoose.model('Person', PersonSchema)
var Person = mongoose.model('Person')
//<== end schemas

//Routes ==>
app.get('/persons', function(req,res){
	Person.find({}, function(err, persons){
		if(err){
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: persons})
		}
	})
})
app.get('/persons/:id', function(req,res){
	Person.findOne({_id: req.params.id}, function(err, person){
		if(err){
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: person})
		}
	})
})
app.post('/persons', function(req,res){
	var person = new Person({name:req.body.name, position:req.body.position})
	person.save(function(err){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message: "Success"})
		}
	})
})
app.put('/persons/:id', function(req,res){
	var person = Person.update({_id: req.params.id}, {name:req.body.name, position:req.body.position}, { runValidators: true }, function(err){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message: "Success"})
		}
	})
})
app.delete('/persons/:id', function(req,res){
	Person.remove({_id: req.params.id}, function(err){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message: "Success"})
		}
	})
})
app.put('/persons/status/:id', function(req,res){
	// console.log("got to server",req.params.id, req.body)
	Person.findOne({_id: req.params.id}, function(err, person){
		// console.log(person)
		if(err){
			res.json({message:"Error", error:err})
		}
		else{
			for(let key in person['status'][req.body.gameKey]){
				if(key == req.body.status){
					person['status'][req.body.gameKey][key] = true
				}
				else{
					if(typeof person['status'][req.body.gameKey][key] == "boolean"){
						person['status'][req.body.gameKey][key] = false
					}
				}
			}
			person.save(function(err){
				if(err){
					res.json({message:"Error", error:err})
				}
				else{
					res.json({message:"Success"})
				}
			})
		}
	})
})
app.all("*", (req,res,next)=>{
	res.sendFile(path.resolve("./client/dist/index.html"))
})
//<== end routes

//Listening ==>
app.listen(port, function(){
	console.log('Listening on port:',port)
})