const express = require('express');//npm install express
const bodyParser = require('body-parser') //npm install body-parser
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors')

const app = express();

// to use body parser middleware
app.use(bodyParser.json())

//to use the cors middleware
app.use(cors())


const database = {
	users: [
		{
			id: '123',
			name:'john',
			email:'john@gmail.com',
			password:'john',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'mahi',
			email: 'mahi@gmail.com',
			password: 'mahi',
			entries: 0,
			joined: new Date()
		}

	],
	/*login: [
		{
			id: '987',
			hash:'',
			email: 'john@gmail.com'
		}
	]*/
}

app.get('/', (req, res)=>{
	res.send(database.users)
	
})
app.post('/signin', (req, res)=>{

	/*bcrypt.compare("abebe", '$2a$10$Q.pnlxh12WroqyBzc.IuqOT5u1.n2NnfdsXZkkS6QbD.VHquG2a7W', function(err, res){
		//res == true
		console.log("first guess:" ,res)
	})

	//Load hash from your password DB
	bcrypt.compare("veggies",'$2a$10$Q.pnlxh12WroqyBzc.IuqOT5u1.n2NnfdsXZkkS6QbD.VHquG2a7W', function(err, res){
		// res == false
		console.log("second guess:", res)
	})*/
	 
	if(req.body.email === database.users[0].email &&
	   req.body.password === database.users[0].password){
		res.json('success');
	}else{
		res.status(400).json('error logging in')
	}
})
app.post('/register', (req, res)=>{
	const {email, name, password} = req.body;
	bcrypt.hash(password, null, null, function(err, hash){
	//Store hash in your password DB
	console.log(hash)
});
	database.users.push({
			id: '125',
			name:name,
			email:email,
			entries: 0,
			joined: new Date()
		}  )
	res.json(database.users[database.users.length-1])
})


app.get('/profile/:id', (req, res)=>{
	
	const {id} = req.params;
	let found = false;

	database.users.forEach(user=>{
		if(user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(400).json('not found')
	}
})

app.put('/image', (req, res)=>{
	const {id} = req.body;
	let found = false;

	database.users.forEach(user=>{
		if(user.id === id){
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(400).json('not found')
	}
})

/*bcrypt.hash("bacon", null, null, function(err, hash){
	//Store hash in your password DB
});

bcrypt.compare("bacon", hash, function(err, res){
	//res == true
})

//Load hash from your password DB
bcrypt.compare("veggies", hash, function(err, res){
	// res == false
})
*/
app.listen(4000, ()=>{
	console.log('app is running on port 4000')
});

/*
	/ --> res = this is working 
	/signin ---POST = success or fail
	/register ---POST = user
	/profile/:id --- GET = user
	/image --- PUT = user
*/