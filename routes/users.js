const express = require('express');
const app = express();
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('Список пользователей')
});

router.get('/:id',(req,res)=>{
    res.send(`Пользователь ${req.params.id}`)
});
module.exports=router;