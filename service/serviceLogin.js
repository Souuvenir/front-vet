const login = async(e) => {
    e.preventDefault()
    const usuario = document.getElementById("usuario").value
    const password = document.getElementById("password").value
    const data = { usuario, password }
    const res = await fetch('http://localhost:3000/SV/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    const json = await res.json()
    console.log(json)
    if (json.status === 200) {
        window.location.href = "/dashboard"
    } else {
        alert(json.message)
    }
}