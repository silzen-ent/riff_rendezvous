// This is essentially my mini server that will serve the static files & also handle API requests.
// This is my mini backend where I'LL be writing all my backend code.
// I'm using the package nodemon to listen out for any changes on this file.

const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://silzenent:mypassword@cluster0.9txy6nn.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0'

const app = express()

app.get('/', (req, res) => {
    res.json('Hello to my app!')
})

app.post('/signup', (req, res) => {
    res.json('Hello to my app!')
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } finally {
        await client.close()
    }
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT)) 