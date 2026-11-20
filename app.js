const express = require('express');
const app = express();
const usersRouter=require('./routes/users');
app.use('/users',usersRouter);
app.use(express.json());
const port=3000;

function authMiddleware(req,res,next){
    if (req.query.token === 'secret'){
        next();
    }else{
        res.status(401).send('Unauthorized');
    }
}
app.use('/protected',authMiddleware);

app.get('/protected',(req,res)=>{
    res.send('Вы успешно авторизовались!')
});

function mw1(req,res,next){
    console.log('Middleware 1');
    next();
}

function mw2(req,res,next){
    console.log('Middleware 2');
    next();
}

app.get('/path',mw1,mw2,(req,res)=>{
    res.send('Конец');
});

app.use((req,res,next)=>{
    console.log(`Запрос: ${req.method} ${req.url}`);
    next();
});

app.get('/',(req,res)=>{
    res.send('Hello World')
});

app.get('/',(req,res)=>{
    res.send('Главная страница')
});

app.post('/submit',(req,res)=>{
    res.send('Данные получены')
});

app.get('/user/id',(req,res)=>{
    res.send(`Пользователь ID: ${req.params.id}`)
});

app.use((req, res, next)=>{
    res.status(404).send('Страница не найдена');
});

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});
