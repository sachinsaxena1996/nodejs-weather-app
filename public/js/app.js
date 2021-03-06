const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')

    const url = '/weather?address=' + location

    messageOne.textContent = 'loading the weather'

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error                
            }
            else {
                messageOne.textContent = data.location + data.forecast
            }
        })
    })    
})