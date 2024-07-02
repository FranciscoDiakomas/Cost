import { ListarProjectos } from "./listarProjectos.mjs"
export async function ActualizarProjecto(id) {

    const ActualizarProjectoBTN = document.getElementById("SalvarProecto").addEventListener("click", async()=>{

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
            let nomeProjecto = document.getElementById("Nnome")
            let orcamento = document.getElementById("Norcamento")
            let categorias = document.getElementById("Ncategoria")
            let categoria = categorias.options[categorias.selectedIndex]
            let Warning = document.getElementById("Warning1")
            let spinner = document.getElementById("spinner1")
            let flash = document.getElementsByClassName("success1")[0]
        if(!categoria.value || !nomeProjecto.value  || !orcamento.value  || !isNaN(nomeProjecto.value) ||isNaN(orcamento.value) ){
            Warning.textContent = "Preencha Todos os Campos com dados válidos!"
            Warning.style.color = "red"
            return
        }
        else{
                    spinner.style.display = "flex"
                    spinner.style.visibility = "visible"
                    let API = await fetch(`http://localhost:8080/${nomeProjecto.value}/${categoria.value}/${orcamento.value}/${id}`, {
                        method : "PUT",
                        headers : {
                            'Content-type' : 'application/json'
                        }
                    })
                    

                    let response = await API.json()
                    setTimeout(()=>{
                        spinner.style.visibility = "hidden"
                        spinner.style.display = "none"
                        nomeProjecto.value =""
                        categorias.innerHTML = `<option value="">Selecione uma categoria</option>
                        <option value="FrontEnd">FrontEnd</option>
                        <option value="Backend">Backend</option>
                        <option value="Game">Game</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Desktop">Desktop</option> `
                        orcamento.value = ""
                        if(response.msg == "Updated"){
                            flash.style.display = "flex"
                        }
                    },2000)

                    setTimeout(()=>{
                        flash.style.display = "none"
                        let ModatEdit = document.getElementById("editProjectForm")
                        ModatEdit.style.visibility = "hidden"
                        ListarProjectos()
                    },5000)
        }

                    
        }
    )

    
    
}