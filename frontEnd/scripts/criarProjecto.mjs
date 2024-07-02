export  async function CadastrarProjecto(){

    let inputs = document.querySelectorAll("input")
    inputs.forEach(input=>{
        input.addEventListener("input",()=>{
            Warning.textContent = ""
            spinner.style.visibility = "hidden"
        })
    })
    
    let selects = document.querySelectorAll("select")
    selects.forEach(select=>{
        select.addEventListener("change",()=>{
            Warning.textContent = ""
            spinner.style.visibility = "hidden"
        })
    })
    let nomeProjecto = document.getElementById("nome")
    let orcamento = document.getElementById("orcamento")
    let categorias = document.getElementById("categoria")
    let categoria = categorias.options[categorias.selectedIndex]
    let Warning = document.getElementById("Warning")
    let spinner = document.getElementById("spinner")
    let flash = document.getElementById("sucess")
    if(!categoria.value || !nomeProjecto.value  || !orcamento.value  || !isNaN(nomeProjecto.value) ||isNaN(orcamento.value) ){
        Warning.textContent = "Preencha Todos os Campos com dados válidos!"
        return
    }else{
        spinner.style.display = "flex"
        spinner.style.visibility = "visible"
        let dados = {
            "nome" : nomeProjecto.value,
            "orcamento" : orcamento.value,
            "categoria" :  categoria.value
        }
        let pedido = await fetch("http://localhost:8080/", {
            method : "Post",
            body : JSON.stringify(dados),
            headers : {
                'Content-type' : 'application/json'
            }
        })
        let res = await pedido.json()
        setTimeout(()=>{
            spinner.style.visibility = "hidden"
            spinner.style.display = "none"
            nomeProjecto.value = ""
            orcamento.value = ""
            categorias.innerHTML = `
                        <option value="">Selecione uma categoria</option>
                        <option value="FrontEnd">FrontEnd</option>
                        <option value="Backend">Backend</option>
                        <option value="Game">Game</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Desktop">Desktop</option>  
            
            `
            if(res.msg == "sucess"){
                flash.style.display = "flex"
            }
        },2000)
        setTimeout(()=>{
            flash.style.display = "none"
        },6000)
        
    }
    
    

}