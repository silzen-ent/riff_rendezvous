// This is essentially my mini server that will serve the static files & also handle API requests.
// This is my mini backend where I'll be writing all backend code.
// Using the package nodemon to listen out for any changes on this file.

const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
require('dotenv').config()

const uri = process.env.URI

const app = express()
app.use(cors())
app.use(express.json())


// This route is for the root of the app
app.get('/', (req, res) => {
    res.json('Hello to my app!')
})


// This route handles the signup request from the client & how we pass data from FE to BE.
app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const generatedUserId = uuidv4() // This generates a unique user id
    const hashedPassword = await bcrypt.hash(password, 10) // This returns a hashed password 

    try {
        await client.connect() 
        const database = client.db('app-data') 
        const users = database.collection('users') 
        
        const existingUser = await users.findOne({email}) 
 
        if (existingUser) {
            return res.status(409).send('User already exists. Please log in.') 
        }

        const sanitizedEmail = email.toLowerCase() 

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }
        const insertedUser = await users.insertOne(data) 

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
        })
        res.status(201).json({token, userId: generatedUserId}) 

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

// This route was giving me issues with Invalid Credentials. 
// The route is for Logging In
// app.post('/login', async (req, res) => {
//     const client = new MongoClient(uri)
//     const {email, password} = req.body

//     try {
//         await client.connect()
//         const database = client.db('app-data')
//         const users = database.collection('users')

//         const user = await users.findOne({email})

//         const correctPassword = await bcrypt.compare(password, user.hashed_password)

//         if (user && correctPassword) {
//             const token = jwt.sign(user, email, {
//                 expiresIn: 60 * 24
//             })
//             res.status(201).json({token, userId: user.user_id})
//         }
//         res.status(400).json('Invalid Credentials') 
//     } catch (err) {
//         console.log(err)
//     } finally {
//         await client.close()
//     }
// })


// This route was giving me issues with Invalid Credentials. 
// The route is for Logging In
app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({email})

        if (!user) {
            return res.status(400).json('User not found')
        }

        const correctPassword = await bcrypt.compare(password, user.hashed_password)

        if (correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })
            return res.status(201).json({token, userId: user.user_id})
        }
        return res.status(400).json('Invalid Credentials') 
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})


// This route is for getting one user by their user id
app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId
    
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const user = await users.findOne(query)
        res.send(user)

    } finally {
        await client.close()
    }
})


// Update User with a match
app.put('/addmatch', async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, matchedUserId} = req.body

    try {
        await client.connect()
        const database = client.db('app-data') 
        const users = database.collection('users') 

        const query = {user_id: userId}
        const updateDocument = {
            $push: {matches: {user_id: matchedUserId}},
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
})


// This route is to get all Users by userIds in the Database 
app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    const userIds = JSON.parse(req.query.userIds)

    try {
        await client.connect() // connect to the database
        const database = client.db('app-data') // select the database
        const users = database.collection('users') // select the collection

        const pipeline = 
            [
                {
                    '$match': {
                        'user_id': {
                            '$in': userIds
                        }
                    }
                }
            ]
        const foundUsers = await users.aggregate(pipeline).toArray()
        res.json(foundUsers)

    } finally {
        await client.close()
    }
})


// This route is to get all the Gendered Users in the Database
app.get('/gendered-users', async (req, res) => { 
    const client = new MongoClient(uri) // create a new client
    const gender = req.query.gender

    try {
        await client.connect() // connect to the database
        const database = client.db('app-data') // select the database
        const users = database.collection('users') // select the collection
        const query = {gender_identity: {$eq: gender}}
        const foundUsers = await users.find(query).toArray() // get all the users in the collection
        res.json(foundUsers) // send the users to the client

    } finally {
        await client.close() // close the connection
    }
})


// Update a User in the Database
// This route is for updating user's info with the Onboarding Form Data from the client
// app.put('/user', async (req, res) => {
//     const client = new MongoClient(uri)
//     const formData = req.body.formData
    
//     try {
//         await client.connect()
//         const database = client.db('app-data') 
//         const users = database.collection('users') 

//         const query = {user_id: formData.user_id}

//         const updateDocument = {
//             $set: {
//                 first_name: formData.first_name,
//                 dob_month: formData.dob_month,
//                 dob_day: formData.dob_day,
//                 dob_year: formData.dob_year,
//                 show_gender: formData.show_gender,
//                 gender_identity: formData.gender_identity,
//                 gender_interest: formData.gender_interest,
//                 url: formData.url,
//                 about: formData.about,
//                 matches: formData.matches
//             },
//         }

//         const insertedUser = await users.updateOne(query, updateDocument)

//         res.json(insertedUser)

//     } finally {
//         await client.close()
//     }
// })


app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData
    
    // Extract "dob_month", "dob_day", and "dob_year" from formData
    const { dob_month, dob_day, dob_year } = formData;

    // Convert these values to integers
    const month = parseInt(dob_month, 10);
    const day = parseInt(dob_day, 10);
    const year = parseInt(dob_year, 10);
    
    try {
        await client.connect()
        const database = client.db('app-data') 
        const users = database.collection('users') 

        const query = {user_id: formData.user_id}

        // Include the converted values in your updateDocument
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_month: month,
                dob_day: day,
                dob_year: year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            },
        }

        const insertedUser = await users.updateOne(query, updateDocument)

        res.json(insertedUser)

    } finally {
        await client.close()
    }
})




// Get Messages by from_userId and to_userId
app.get('/messages', async (req, res) => {
    const {userId, correspondingUserId} = req.query
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')
    
        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }
        const foundMessages = await messages.find(query).toArray()
        res.send(foundMessages)
    } finally {
        await client.close()
    }
})

// Add a Message to our Database
app.post('/message', async (req, res) => {
    const client = new MongoClient(uri)
    const message = req.body.message
    
    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')

        const insertedMessage = await messages.insertOne(message)
        res.send(insertedMessage)    
    } finally {
        await client.close()
    }
})

// Deletes User from Database
app.delete('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const { userId } = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const result = await users.deleteOne({ user_id: userId })

        if (result.deletedCount === 1) {
            res.status(200).json('User deleted successfully')
        } else {
            res.status(404).json('User not found')
        }
    } catch (err) {
        console.log(err)
        res.status(500).json('Server error')
    } finally {
        await client.close()
    }
})


app.listen(PORT, () => console.log('Server running on PORT ' + PORT)) 

