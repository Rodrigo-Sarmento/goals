const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('./models/Metas')
const Meta = mongoose.model('Meta')

const app = express()

app.use(express.json())

app.use((req, res, next)=>{
    res.header("Acess-Control-Allow-Origin","*")
    res.header("Acess-Control-Allow-Methods","GET, PUT, POST, DELETE")
    res.header("Acess-Control-Headers","X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
})

mongoose.connect('mongodb://localhost/goals', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Conexão com banco de dados realizado com sucesso')
}).catch((err)=>{
    console.log('ERRO: Conexão com banco de dados não realizado com sucesso'+err)
});

app.get('/metas', async(req, res)=>{
    await Meta.find({}).then((metas)=>{
        return res.json({
            error: false,
            metas
        })
    }).catch((err)=>{
        return res.status(400).json({
            error: true,
            message: "Nenhuma meta encontrada!"
        })
    })
})

app.post('/metas', async(req, res)=>{
    await Meta.create(req.body, (err)=>{
        if(err) return status(400).json({
            error: true,
            message: "ERRO: Meta não cadastrada com sucesso"
        })
    })
    return res.json({
        error: false,
        message: "Meta cadastrada com sucesso"
    })
})

app.listen(3000, ()=>{
    console.log('servidor iniciado na porta 3000')
})