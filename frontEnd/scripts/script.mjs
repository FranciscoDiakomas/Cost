import { CadastrarProjecto } from "./criarProjecto.mjs"
import { ListarProjectos } from "./listarProjectos.mjs"
import { PegarProjectos } from "./PegarProjectos.mjs"
import { ActualizarProjecto } from "./actualizarProjecto.mjs"
import { Islogado } from "./logar.mjs"
import { Logout } from "./logout.mjs"



setInterval(Islogado, 100)
const CloseEditModalBTN = document.getElementById("closeModal").addEventListener("click",()=>{
    let EditModal = document.getElementById("editProjectForm")
    let spinner = document.getElementById("spinner1")
    spinner.style.display = "none"
    EditModal.style.visibility = "hidden"
})

const LogoutBTn = document.getElementById("OUt").addEventListener("click",Logout)
const links = document.querySelectorAll("li a")
const janelas  = document.querySelectorAll("article")
const footer = document.querySelector("footer")
const btncreateProject = document.querySelectorAll("#createProject")
const ListarProjectosBTN = document.getElementById("listProjects").addEventListener("click",ListarProjectos)
const cadasTrarBTN = document.getElementById("criarProjecto").addEventListener("click",CadastrarProjecto)
const BuscarprojetoBTn = document.getElementById("BuscarprojetoBTn").addEventListener("click",PegarProjectos)



btncreateProject.forEach(btn=>{
    btn.addEventListener("click",()=>{
    janelas.forEach(janela =>{
        janela.style.display = "none"
        footer.style.display = "flex"
        footer.style.position = "static"
    })
    janelas[1].style.display = "flex"
    
})
})


links.forEach(link =>{
    link.addEventListener("click",(e)=>{
        if(e.target.className === "Inicial"){
            janelas.forEach(janela =>{
                janela.style.display = "none"
                footer.style.display = "flex"
                footer.style.position = "fixed"
                footer.style.bottom = 0
            })
            janelas[0].style.display = "flex"
        }
        else if(e.target.className === "Projectos"){
            janelas.forEach(janela =>{
                janela.style.display = "none"
                footer.style.display = "none"
            })
            janelas[2].style.display = "flex"
        }
    })
})