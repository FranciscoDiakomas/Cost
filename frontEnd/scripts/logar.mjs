export async function Islogado(){
    let API  = await fetch("http://localhost:8080/login")
    let response = await API.json()
    if(response.status === "deslogado"){
        if(String(window.location).includes("login")){
            console.log(response.status)
            return
        }else{
            window.location = "../html/login.html"

        }
    }else if( response.status === "logado"){
        if(String(window.location).includes("index")){
            return
        }else{
            window.location = "../html/index.html"
        }
    }
}
const BTNEntrar = document.getElementById("EntrarBTN")

if(document.body.hasChildNodes(BTNEntrar)){
    BTNEntrar.addEventListener("click",async ()=>{
    const email = document.getElementById("email")
    const senha = document.getElementById("senha")
    let API  = await fetch(`http://localhost:8080/entrar/${email.value}/${senha.value}`)
    let response = await API.json()
    if(response.data == "logado"){
        window.location = "../html/index.html"
    }else{
        alert("Invalido")
    }
    email.value = ""
    senha.value = ""
})

}


