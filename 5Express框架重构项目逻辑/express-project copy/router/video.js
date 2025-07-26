const express = require('express')

const router = express.Router()

router.get('/list',(req,res)=>{
    console.log(req.method);
    res.send('/list')
})

router.get('/users',(req,res)=>{
    console.log(req.method);
    res.send('/users')
})

module.exports = router;