const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const firstText = document.querySelector('#text-one');
const secondText = document.querySelector('#text-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    firstText.textContent = 'loading..'
    secondText.textContent = '';
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                firstText.textContent = data.error;
            }else{
                firstText.textContent = data.location;
                secondText.textContent = data.forecast;
            }
            
        })
    })
})