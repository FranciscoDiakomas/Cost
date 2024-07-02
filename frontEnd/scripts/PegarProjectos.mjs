import { ListarProjectos } from "./listarProjectos.mjs"
import { ActualizarProjecto } from "./actualizarProjecto.mjs"
export async function PegarProjectos() {

    const BuscarprojetoInput = document.getElementById("BuscarprojetoInput")
    let aside = document.querySelector("aside")
    aside.innerHTML = ""

    if(!BuscarprojetoInput.value){
        alert("Seleione uma Categoria")
        ListarProjectos()
        return
    }
    else{
        let category = BuscarprojetoInput.options[BuscarprojetoInput.selectedIndex].value
        
        let API = await fetch(`http://localhost:8080/${category}`)
        let response = await API.json()
        if(response.data === "not found"){
            alert("Nenhum Projecto foi Cadastrado com essa Categoria")
            ListarProjectos()
        }else{
            let i = 0
            
            
            while(i < response.data.length){

                    let card = document.createElement("div")
                    card.className = "card"

                    let cardTitle = document.createElement("div")
                    cardTitle.className = "card-title"
                    let h2 = document.createElement("h2")
                    h2.textContent = response.data[i].nome

                    cardTitle.append(h2)

                    let description = document.createElement("div")
                    description.className = "description"

                    let span = document.createElement("span")
                    let span2 = document.createElement("span")
                    let h3 = document.createElement("h3")
                    let h31 = document.createElement("h3")
                    h3.textContent  = `Orçamento  : ${span.textContent = response.data[i].orcamento}`
                    h31.textContent  = `Categoria  : ${span2.textContent = response.data[i].ategoria}`

                    description.append(h3)
                    description.append(h31)


                    let RemoveBTN = document.createElement("button")
                    RemoveBTN.textContent = "Remover"
                    RemoveBTN.id = response.data[i].id
                    RemoveBTN.addEventListener("click",async(e)=>{
                        e.preventDefault()
                        let IDTODELL =  e.target.id
                        let deleteAPI = await fetch(`http://localhost:8080/${IDTODELL}`, {
                            method : "DELETE"
                        })
                        let response = await deleteAPI.json()
                        ListarProjectos()
                        
                    })
                    



                    let EditBTN = document.createElement("button")
                    EditBTN.textContent = "Editar"
                    EditBTN.id = response.data[i].id
                    EditBTN.addEventListener("click",(e)=>{
                        let IdToUpdate = e.target.id
                        let ModatEdit = document.getElementById("editProjectForm")
                        ModatEdit.style.visibility = "visible"
                        ActualizarProjecto(EditBTN.id)
                    })


                    let CardBTNs = document.createElement("div")
                    CardBTNs.id = "ProjectsBtn"

                    CardBTNs.append(RemoveBTN)
                    CardBTNs.append(EditBTN)

                    
                    card.append(cardTitle)
                    card.append(description)
                    card.append(CardBTNs)
                    aside.append(card)
                ++i
            }
        }
    }
    BuscarprojetoInput.innerHTML = `
                        <option value="">Selecione uma categoria</option>
                        <option value="FrontEnd">FrontEnd</option>
                        <option value="Backend">Backend</option>
                        <option value="Game">Game</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Desktop">Desktop</option>  
            
            `
}