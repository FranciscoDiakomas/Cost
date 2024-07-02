export async function Logout() {
    const API = await fetch("http://localhost:8080/sair")
    const Response = await API.json()
    
}