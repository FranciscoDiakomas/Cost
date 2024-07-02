  import { ActualizarProjecto } from "./actualizarProjecto.mjs" 
   export async function ListarProjectos() {

        let res = await fetch("http://localhost:8080/")
        const data = await res.json()
        
        let i = 0
        let aside = document.querySelector("aside")
        aside.innerHTML = ""
        while( i < data.data.length){
            let card = document.createElement("div")
            card.className = "card"

            let cardTitle = document.createElement("div")
            cardTitle.className = "card-title"
            let h2 = document.createElement("h2")
            h2.textContent = data.data[i].nome

            cardTitle.append(h2)

            let description = document.createElement("div")
            description.className = "description"

            let span = document.createElement("span")
            let span2 = document.createElement("span")
            let h3 = document.createElement("h3")
            let h31 = document.createElement("h3")
            h3.textContent  = `Orçamento  : ${span.textContent = data.data[i].orcamento}`
            h31.textContent  = `Categoria  : ${span2.textContent = data.data[i].ategoria}`

            description.append(h3)
            description.append(h31)


            let RemoveBTN = document.createElement("button")
            RemoveBTN.textContent = "Remover"
            RemoveBTN.id = data.data[i].id
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
                    EditBTN.id = data.data[i].id
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