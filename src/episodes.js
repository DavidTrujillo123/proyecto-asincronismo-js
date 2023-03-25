const API = 'https://rickandmortyapi.com/api';

async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json()
    return data;
}
async function getData(urlApi, page){
    try{
        const data1 = await fetchData(`${urlApi}/episode?page=${page}`);
        const data2 = await fetchData (data1.info.next);
        const data3 = await fetchData (data2.info.next);
        const arrData = data1.results;
        const arrData2 = data2.results;
        const arrData3 = data3.results;
        const totalData = [...arrData, ...arrData2, ...arrData3];
        viewData(totalData);        
    }
    catch (err){
        console.log(err);
    }
}
const viewData = (arrData) =>{
    const tem1 = arrData.filter((obj)=>{
        if(obj.episode.includes('S01')){
            return obj;
        }
    });
    const tem2 = arrData.filter((obj)=>{
        if(obj.episode.includes('S02')){
            return obj;
        }
    });
    const tem3 = arrData.filter((obj)=>{
        if(obj.episode.includes('S03')){
            return obj;
        }
    });
    console.log(tem1);
    console.log('-------------------------------------------------');
    console.log(tem2);
    console.log('-------------------------------------------------');
    console.log(tem3);
};

getData(API,1);