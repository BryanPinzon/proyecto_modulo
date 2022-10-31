const form = document.querySelector("#form_");
const coin = document.querySelector("#coin");
const crypto = document.querySelector("#cryptos");
const formContainer = document.querySelector(".form_container");
const containerAnswer = document.querySelector(".answer_container")
    // $fragment = document.createDocumentFragment();
const objSearch = {
    coin: '',
    crypto: ''
}

    document.addEventListener('DOMContentLoaded',()=>{
        consultarCrypto(); 

        form.addEventListener('submit', submitForm);
        coin.addEventListener('change', getValue);
        crypto.addEventListener('change', getValue);
        
    })

    function submitForm(e){
        e.preventDefault();
        const {coin,crypto} = objSearch;
        if (coin === '' || crypto === ''){
            showError('select both currencies..')
            return;
        }
        consultarAPI(coin,crypto);
        // console.log(coin);
        // console.log(crypto);

    }
    function consultarAPI(coin,crypto){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;
        fetch(url)
            .then(resultado => resultado.json())
            .then(resultadoJson => {
            mostrarCotizacion(resultadoJson.DISPLAY[crypto][coin]);
            // console.log(resultadoJson.DISPLAY[crypto][coin],Object);
        })
        // .catch(error => console.log(error));
    }
    function mostrarCotizacion(data){
        clearHTML();
        const {PRICE,HIGHDAY,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE} = data;
        const answer = document.createElement('div');
        answer.classList.add('info');
        answer.innerHTML = 
        `<p class="paragraph_price" >Price:<span id="price">${PRICE}</span></p>
        <p>Highest price of the day:<span id="price">${HIGHDAY}</span></p>
        <p>Lowest price of the day<span id="price">${LOWDAY}</span></p>
        <p>Variation last 24 hours:<span id="price">${CHANGEPCT24HOUR}%</span></p>
        <p>Last one update: <span id="price">${LASTUPDATE}</span></p>`
        containerAnswer.appendChild(answer);
    }

    function showError(message){
        const error = document.createElement('p'); 
        error.classList.add("error");
        error.textContent = message; 
        formContainer.appendChild(error);
        setTimeout(() => error.remove(), 3000);
    }

    function getValue(e){
        objSearch[e.target.name] = e.target.value;
    }
    function consultarCrypto(){
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

        fetch(url)
        .then(res => res.json())
        .then(respuestaJson=>{
            seleccionCrypto(respuestaJson.Data);
            // cl(respuestaJson.Data);
        })
        .catch(err => console.log(err));
}

function seleccionCrypto(coins){
    coins.forEach((cripto) => {
        const {FullName, Name} = cripto.CoinInfo;
        const option = document.createElement("option");
        option.value = Name;
        option.textContent= FullName;
        crypto.appendChild(option);
    });

}

function clearHTML(){
    containerAnswer.innerHTML= '';
}

