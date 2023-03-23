//menu-mobile
const menu_mobile = document.querySelector('.menu_mobile');
const iconMenuMobile = document.querySelector('.menu_mobile_icon');
const character_container = document.querySelector('.character_container');
const btnAfter = document.querySelector('.after-page');
const btnBefore = document.querySelector('.before-page');
const navPage = document.querySelectorAll('.navPage');
const backgroundImg = document.querySelector('#background-img');
const listBackgroundImg = [
    'https://live.staticflickr.com/7903/46446265205_cfe81d35a0_h.jpg', 
    'https://live.staticflickr.com/65535/52766846681_9d89901ef0_h.jpg',
    'https://live.staticflickr.com/65535/52767260260_72324ac053_h.jpg',
    'https://live.staticflickr.com/65535/52766308912_bdb90c841c_h.jpg',
    'https://live.staticflickr.com/65535/52767100244_8b31f3c604_h.jpg',
    'https://live.staticflickr.com/65535/52767100304_42129ff55a_h.jpg',
    'https://live.staticflickr.com/65535/52766846701_d96c11da32_h.jpg',
    'https://live.staticflickr.com/65535/52766308982_50910dab07_h.jpg'
];
//background
let inter = 0;
function changeBackgound(){
    
    if(inter >= listBackgroundImg.length){
        inter=0;
    } 
    backgroundImg.setAttribute('src', listBackgroundImg[inter]);
    inter++;
}

function showBackgrond(){
    setInterval(changeBackgound, 5000);
}
showBackgrond();
//menu-mobile
function toggleMenuMobile(){
    console.log('hola');
    menu_mobile.classList.toggle('inactive');
}
//Llama a api
const API = 'https://rickandmortyapi.com/api';

async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json()
    return data;
}
async function getData(urlApi, page){
    try{
        const data = await fetchData(`${urlApi}/character?page=${page}`);
        const arrData = data.results;
        createCards(arrData);        
    }
    catch (err){
        console.log(err);
    }
};
const createCards = (arrData) =>{
    for (const character of arrData) {
        const cards = document.createElement('div');
        cards.classList.add('cards');
        
        const cardsImage = document.createElement('img');
        cardsImage.setAttribute('src', character.image);
        
        const info = document.createElement('div');
        info.classList.add ('info');
        
        const infospan1 = document.createElement('span');
        infospan1.innerText = 'Name: ';
        const infospan2 = document.createElement('span');
        infospan2.innerText = 'Status: ';
        const infospan3 = document.createElement('span');
        infospan3.innerText = 'Species: ';
        const infospan4 = document.createElement('span');
        infospan4.innerText = 'Gender: ';
        
        const infop1 = document.createElement('p');
        infop1.appendChild(infospan1);
        infop1.innerHTML += character.name;
        
        const infop2 = document.createElement('p');
        infop2.appendChild(infospan2);
        infop2.innerHTML += character.status;
        
        const infop3 = document.createElement('p');
        infop3.appendChild(infospan3);        
        infop3.innerHTML += character.species;
        
        const infop4 = document.createElement('p');
        infop4.appendChild(infospan4);        
        infop4.innerHTML += character.gender;
        
        info.append(infop1,infop2,infop3,infop4);
        
        cards.append(cardsImage, info);
        character_container.append(cards);
        
        
    }
}
const removeAllCards = (nodeParent) => {
    while(nodeParent.firstChild){
        nodeParent.removeChild(nodeParent.firstChild);
    }
}

function putPage(cont){
    removeAllCards(character_container);
    getData(API,cont);
}

function createNavDown(){
    navPage.forEach(element => {
        element.setAttribute('data-id', element.textContent);
        addClick(element);
    });
    
}

function addClick(element){
    element.addEventListener('click', ()=>{
        let newId = refreshNavDown(element.textContent);
        putPage(newId);
    });
}

function refreshNavDown(nPage){
    let num = nPage;
    let mid = (navPage.length)/2-1;
    let i = mid
    //posición media
    navPage[mid].setAttribute('data-id', num);
    navPage[mid].innerText = num;
    //aumento numeros nav
    while (i < navPage.length){
        if(num > 42){
            num = 1;
        }
        navPage[i].setAttribute('data-id', num);
        navPage[i].innerText = num;
        num++;
        i++;
    }
    //retroceso numeros nav
    i = mid-1;
    num = navPage[mid].textContent-1;
    while(i >= 0){
        if(num < 1){
            num = 42;
        }
        navPage[i].setAttribute('data-id', num);
        navPage[i].innerText = num;
        num--;
        i--;
    }
    return navPage[mid].textContent;
}

let cont = 0;
getData(API,1);
createNavDown();
btnAfter.addEventListener('click', ()=>{
    cont+=10;
    if(cont > 42){
        cont = 1;
    }
    refreshNavDown(cont);
    putPage(cont)
});
btnBefore.addEventListener('click', ()=>{
    cont-=10;
    if(cont < 1){
        cont = 42;
    }
    refreshNavDown(cont);
    putPage(cont)
});
iconMenuMobile.addEventListener('click', toggleMenuMobile);



