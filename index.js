const express = require('express')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('OOK')
})

app.get('*',(req,res)=>{
    res.send('BAD REQUEST')
})

const port = config.get('port')

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})