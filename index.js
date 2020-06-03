let first = document.querySelector('#first__view');
let second = document.querySelector('#second__view');
let third = document.querySelector('#third__view');

let firstBullet = document.querySelectorAll('.bullet__point')[0];
let secondBullet = document.querySelectorAll('.bullet__point')[1];
let thirdBullet = document.querySelectorAll('.bullet__point')[2];

firstBullet.addEventListener('click', ()=>{
    third.classList.add('d-none');
    second.classList.add('d-none');
    first.classList.remove('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.remove('bullet__active');
    })
    firstBullet.classList.add('bullet__active');
})
secondBullet.addEventListener('click', ()=>{
    first.classList.add('d-none');
    third.classList.add('d-none');
    second.classList.remove('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.remove('bullet__active');
    })
    secondBullet.classList.add('bullet__active');
})
thirdBullet.addEventListener('click', ()=>{
    first.classList.add('d-none');
    second.classList.add('d-none');
    third.classList.remove('d-none');
    document.querySelectorAll('.bullet__point').forEach(bullet => {
        bullet.classList.remove('bullet__active');
    })
    thirdBullet.classList.add('bullet__active');
})
