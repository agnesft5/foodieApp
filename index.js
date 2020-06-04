//VARIABLES
let code;

// VIEWS
let first = document.querySelector('#first__view');
let second = document.querySelector('#second__view');
let third = document.querySelector('#third__view');
let fourth = document.querySelector('#fourth__view');
let fifth = document.querySelector('#fifth__view');
let sixth = document.querySelector('#sixth__view');

//COMPONENTS
let display = document.querySelector('#display');
let loading = document.querySelector('#loading');
let resultContainer = document.querySelector('#result__container');
let result = document.querySelector('#result');
let codeInput = document.querySelector('.code__input')

// BUTTONS
let firstBullet = document.querySelectorAll('.bullet__point')[0];
let secondBullet = document.querySelectorAll('.bullet__point')[1];
let thirdBullet = document.querySelectorAll('.bullet__point')[2];
let startButton = document.querySelector('.start__button');
let sendButton = document.querySelector('.send__button');
let okButton = document.querySelector('.ok__icon');
let tryAgainButton = document.querySelector('.no__icon');
let notWorking = document.querySelector('#notWorking');

firstBullet.addEventListener('click', () => {
    third.classList.add('d-none');
    second.classList.add('d-none');
    fourth.classList.add('d-none');
    fifth.classList.add('d-none');
    sixth.classList.add('d-none');
    first.classList.remove('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.remove('bullet__active');
    })
    firstBullet.classList.add('bullet__active');
})
secondBullet.addEventListener('click', () => {
    first.classList.add('d-none');
    third.classList.add('d-none');
    fourth.classList.add('d-none');
    fifth.classList.add('d-none');
    sixth.classList.add('d-none');
    second.classList.remove('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.remove('bullet__active');
    })
    secondBullet.classList.add('bullet__active');
})
thirdBullet.addEventListener('click', () => {
    first.classList.add('d-none');
    second.classList.add('d-none');
    fourth.classList.add('d-none');
    fifth.classList.add('d-none');
    sixth.classList.add('d-none');
    third.classList.remove('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.remove('bullet__active');
    })
    thirdBullet.classList.add('bullet__active');
})
startButton.addEventListener('click', () => {
    first.classList.add('d-none');
    second.classList.add('d-none');
    third.classList.add('d-none');
    fifth.classList.add('d-none');
    sixth.classList.add('d-none');
    fourth.classList.remove('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.add('d-none');
    })
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#camera')
        },
        decoder: {
            readers: ["code_128_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
})
Quagga.onDetected((data) => {
    console.log(data['codeResult']['code']);
    display.classList.remove('d-none');
    loading.classList.remove('d-none');
    Quagga.stop();
    setTimeout(() => {
        loading.classList.add('d-none');
        result.textContent = data['codeResult']['code'];
        resultContainer.classList.remove('d-none');
    }, 3000);

})
tryAgainButton.addEventListener('click', () => {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#camera')
        },
        decoder: {
            readers: ["code_128_reader", "ean_5_reader", "ean_8_reader", "ean_2_reader", "code_39_reader", "code_93_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
    setTimeout(() => {
        display.classList.add('d-none');
        loading.classList.add('d-none');
        resultContainer.classList.add('d-none');
    }, 3000);
})
okButton.addEventListener('click', () => {
    setTimeout(() => {
        display.classList.add('d-none');
        loading.classList.add('d-none');
        resultContainer.classList.add('d-none');
        code = result.innerHTML;
        first.classList.add('d-none');
        second.classList.add('d-none');
        third.classList.add('d-none');
        fourth.classList.add('d-none');
        fifth.classList.add('d-none');
        sixth.classList.remove('d-none');
        setTimeout(() => {
            sixth.classList.add('d-none');
        }, 3000);
    }, 1000);
})
notWorking.addEventListener('click', () => {
    first.classList.add('d-none');
    second.classList.add('d-none');
    third.classList.add('d-none');
    fourth.classList.add('d-none');
    fifth.classList.remove('d-none');
    sixth.classList.add('d-none');
})
sendButton.addEventListener('click', () => {
    code = codeInput.value;
    first.classList.add('d-none');
    second.classList.add('d-none');
    third.classList.add('d-none');
    fourth.classList.add('d-none');
    fifth.classList.add('d-none');
    sixth.classList.remove('d-none');
    setTimeout(() => {
        sixth.classList.add('d-none');
    }, 3000);
})
