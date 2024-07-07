const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


 //desativando o cors
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
        app.options('*', (req, res) => {
                res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
                res.send();
            }
        );
    });

let sql = ""
const con =  mysql.createConnection({
            host : "localhost",
            user : "root",
            database : "Coast",
            password :""
})
con.connect((error)=>{
    if(error){
        console.log("Error a tentar se connectar ao banco de dados")
    }else{
        console.log("connectado")
    }
})


app.get("/login",(req,res)=>{

    sql = "select status from UserAdim where id = 1;"
    con.query(sql,(err,result)=>{
        if(result[0].status == 1){
            res.json({
                status : "logado"
            })
        }else{
            res.json({
                status : "deslogado"
            })
        }
    })

})
app.get("/entrar/:email/:senha",(req,res)=>{
    let {email , senha} = req.params
    sql = "select * from UserAdim where id = 1;"
    con.query(sql,(err,result)=>{
        if(err){
            res.json({
                msg : err.sqlMessage
            })
        }else{
            if( email == result[0].email && senha == result[0].senha){
                sql = "update UserAdim  set status = 1 where id = 1;"
                con.query(sql,(err,result)=>{
                if(err){
                    res.json({
                        msg : err.sqlMessage
                })
        }       else{
                    res.json({
                        data : "logado"
                    })
        }
    })
                
            }else{
                res.json({
                    msg : "not Admin"
                })
            }
            
        }
    })

})

app.get("/sair",(req,res)=>{
    sql = "update UserAdim  set status = 0 where id = 1;"
    con.query(sql,(err,result)=>{
        if(err){
            res.json({
                msg : err.sqlMessage
            })
        }else{
            res.json({
                data : "deslogado"
            })
        }
    })

})




app.get("/",(req,res)=>{
    sql = "select * from projets;"
    con.query(sql,(err,result)=>{
        if(err){
            res.json({
                msg : err.sqlMessage
            })
            
        }else{
            res.json({
                msg : "sucess",
                data : result
            })
        }
    })
})

app.delete("/:id",(req,res)=>{
    let id = req.params.id
    sql = "delete  from projets where id = ?;"
    con.query(sql,[id],(err,result)=>{
        if(err){
            res.json({
                msg : err.sqlMessage
            })
            
        }else{
            res.json({
                msg : "sucess",
                data : result
            })
        }
    })
})

app.put("/:nome/:categoria/:orcamento/:id",(req,res)=>{
    let {nome , categoria , orcamento , id} = req.params
    if(!nome || !categoria || !orcamento || !id){
        res.json({
            msg : "Envie Todos os dados"
        })

        return
    }else{
        sql = "select * from projets where id = ?;"
        con.query(sql,[id],(err,result)=>{
        if(result.length === 0){
            res.json({
                msg : "Not found"
            })
        }else{
            //Update Nomee 
            sql = "Update projets set nome = ? where id = ? limit 1;"
            con.query(sql,[nome,id],(err,result)=>{
                if(err){
                    res.json({
                        msg : err.sqlMessage
                    })
                }else{

                    //update categoria
                    sql = "Update projets set ategoria = ? where id = ? limit 1;"
                    con.query(sql,[categoria,id],(err,result)=>{
                        if(err){
                            res.json({
                                msg :  err.sqlMessage
                            })
                        
                    }else{

                        //upadete orcamento 
                        sql = "Update projets set orcamento = ? where id = ? limit 1;"
                        con.query(sql,[orcamento,id],(err,result)=>{
                            if(err){
                            res.json({
                                msg :  err.sqlMessage
                            })
                        
                        }else{
                            res.json({
                                msg : "Updated"
                            })
                        }
                    })
                    }

                })
                }
            })

        }
    })
    }
})

app.get("/:categoria",(req,res)=>{
    let categoria = req.params.categoria
    sql = "select * from projets where ategoria = ?;"
    con.query(sql,[categoria],(err,result)=>{
        if(err){
            res.json({
                msg : err.sqlMessage
            })
            
        }else{
            
            if(result.length === 0){
                res.json({
                    msg : "sucess",
                    data : "not found"
                })

            } else{
                res.json({
                    msg : "sucess",
                    data : result
                })
            }     
        }
    })
})



app.post("/",(req,res)=>{
    let {nome,orcamento,categoria} = req.body
    let values = [nome,orcamento,categoria]
    let i 
    values.find((iten)=>{
        if(!iten){
            i= true
        }
    })
    if(!i){
        sql = "insert into projets (nome , orcamento ,ategoria) values (?);"
        con.query(sql,[values],(err,result)=>{
        if(err){
            res.json({
                msg : err.sqlMessage
            })
        }else{
            res.json({
                msg : "sucess"
            })
        }
    })
    }else{
        res.json({
            msg : "Envie Todos os Dados"
        })
    }
    
    
})


app.listen(8080,(err)=>{
    if(err){
        console.log("Error" + err)
        return
    }else{
        console.log("Servidor rodando com sucesso!")
    }
})