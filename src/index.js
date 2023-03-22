//menu-mobile
const menu_mobile = document.querySelector('.menu_mobile');
const iconMenuMobile = document.querySelector('.menu_mobile_icon');
const character_container = document.querySelector('.character_container');

function toggleMenuMobile(){
    console.log('hola');
    menu_mobile.classList.toggle('inactive');
}

iconMenuMobile.addEventListener('click', toggleMenuMobile);

//Llama a api
const API = 'https://rickandmortyapi.com/api';
let myData = [];
async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json()
    return data;
}
async function getData(urlApi){
    try{
        const data = await fetchData(`${urlApi}/character`);
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

getData(API);
