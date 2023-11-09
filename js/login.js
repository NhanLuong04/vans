const email = document.getElementById('email')
const ho = document.getElementById('ho')
const ten = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById(`error`)

form.addEventListener('submit', (e) => {
    let.messages= []
    if(ten.value === '' || ten.value ==null){
        messages.push(`name is required`)
    }

    if(ho.value === '' || ho.value ==null){
        messages.push(`name is required`)
    }
     
    if(password.value.lenght <=8){
        messages.push(`Mật khẩu phải nhiều hơn 8 chữ sô`)
    }



    if(messages.lenght >0){
        e.preventDefault()
        errorElement.innerText = messages.join(`, `)
    }
})