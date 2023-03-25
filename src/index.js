const menu_mobile = document.querySelector('.menu_mobile');
const iconMenuMobile = document.querySelector('.menu_mobile_icon');
const opcionPageArr = document.querySelectorAll('.navbar_btn');
const character_container = document.querySelector('.character_container');
const btnAfter = document.querySelector('.after-page');
const btnBefore = document.querySelector('.before-page');
const btnUp = document.querySelector('.up-btn');
const navPageArr = document.querySelectorAll('.navPage');

//menu-mobile
function toggleMenuMobile(){
    menu_mobile.classList.toggle('inactive');
}

//menu de paginas principal. Si hace click se pinta
function addClickOptionPage(){
    opcionPageArr.forEach(element => {
        element.addEventListener('click', ()=>{
            isClicked(element);
        });
    });
}
function isClicked(elementNow){
    let cont = 0;
    while(cont<opcionPageArr.length){
        (elementNow.dataset.id == opcionPageArr[cont].dataset.id)
        ?   opcionPageArr[cont].classList.add('clicked') 
        :   opcionPageArr[cont].classList.remove('clicked');   
        cont++;
    }
}
//Subir a la principio de la página
function upPage(){
    window.location = '#';
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

function setPage(cont){
    removeAllCards(character_container);
    getData(API,cont);
}

function createNavPage(){
    navPageArr.forEach(element => {
        element.setAttribute('data-id', element.textContent);
        addClick(element);
    });
    
}

function addClick(element){
    element.addEventListener('click', ()=>{
        let newId = refreshNavPage(element.textContent);
        setPage(newId);
    });
}
function refreshNavPage(nPage){
    let num = nPage;
    let mid = (navPageArr.length)/2-1;
    let i = mid
    //posición media
    navPageArr[mid].setAttribute('data-id', num);
    navPageArr[mid].innerText = num;
    //aumento numeros nav
    while (i < navPageArr.length){
        if(num > 42){
            num = 1;
        }
        navPageArr[i].setAttribute('data-id', num);
        navPageArr[i].innerText = num;
        num++;
        i++;
    }
    //retroceso numeros nav
    i = mid-1;
    num = navPageArr[mid].textContent-1;
    while(i >= 0){
        if(num < 1){
            num = 42;
        }
        navPageArr[i].setAttribute('data-id', num);
        navPageArr[i].innerText = num;
        num--;
        i--;
    }
    return navPageArr[mid].textContent;
}
function afterBeforeAction(cont,flag){   
    (flag) ? cont+=10
    : cont-=10; 
    
    if(cont < 1){
        if(cont == 0) cont = 1;
        else cont = 40;
    }
    if(cont > 42){
        cont = 1;
    }
    
    refreshNavPage(cont);
    setPage(cont);
}

// showBackgrond();
createNavPage();
addClickOptionPage();
getData(API,1);
btnAfter.addEventListener('click', ()=>{
    let cont = Number(navPageArr[4].dataset.id);
    if (cont === 1) {
        cont = 0;
    }
    afterBeforeAction(cont,true);
});
btnBefore.addEventListener('click', ()=>{
    let cont = Number(navPageArr[4].dataset.id);
    afterBeforeAction(cont,false);
});
iconMenuMobile.addEventListener('click', toggleMenuMobile);
btnUp.addEventListener('click', upPage);