interface Player {    
        _id?: string,
        playerName?: string,
        age?: number,
        position: string,
        twoPercent: number,
        threePercent: number,
        games?: 605,
        team?: "BOS",
        season?: [
            2019,
            2020,
            2017,
            2015,
            2014,
            2018,
            2021,
            2023,
            2022,
            2024
        ],
        points: number,
        __v?: 0
 }

const baseUrl:string = 'https://nbaserver-q21u.onrender.com/api/filter';   
   
const naeplayer:Player = {
    position: "C",
    twoPercent: 20,
    threePercent: 20,
    points:100 , 
}     
let arrplayers: Player[] = []  
const deleteAlltr =() :void => {
    const mainCard: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('.tr')!
    mainCard.forEach(e => e.innerHTML = "");
  
}        
const createNewReoInTable =  (arrplayers: Player[]) : void => {
    if(arrplayers.length > 0) {

        deleteAlltr()
    }
    
    for (let player of arrplayers) {
        createNewReo(player);
    }}
const addToTeam = (player: Player) : void => {
        
            console.log('Adding player'+player.position +'to team');
            let card: HTMLDivElement = document.querySelector(`#${player.position}`)!
            console.log('Removing player'+ card.id +'from table');
            card.remove();
            let newCard: HTMLDivElement = document.createElement('div')
            newCard.id = player.position
            newCard.classList.add('player')
            newCard.innerHTML = `
            <h2>${player.position}</h2>
            <p> <b>${player.playerName}</b></p>
            <p>Team: ${player.team}</p>
            <p>Three Percent: ${player.threePercent}%</p>
             <p>.two Percent: ${player.twoPercent}%</p>            `
            const mainCard: HTMLDivElement = document.querySelector('.main-player')!
            mainCard.appendChild(newCard);
        }
    
const createNewReo = (player: Player) : void => {
    if(player){
        let table: HTMLTableElement = document.querySelector('.div-table')!   
        let tablRoe:HTMLTableRowElement = document.createElement('tr'); 
        tablRoe.classList.add('tr')
        let dt1: HTMLTableCellElement = document.createElement('td')!        
        dt1.textContent = player.playerName ?? ''
        let dt2: HTMLTableCellElement = document.createElement('td')!        
        dt2.textContent = player.position ?? ''
        let dt3: HTMLTableCellElement = document.createElement('td')!        
        dt3.textContent = player.points.toString() ?? ''
        let dt4: HTMLTableCellElement = document.createElement('td')!        
        dt4.textContent = player.threePercent.toString() ?? ''
        let dt5: HTMLTableCellElement = document.createElement('td')!        
        dt5.textContent = player.threePercent.toString() ?? ''
        let btn: HTMLButtonElement = document.createElement("button")! 
        btn.textContent = `Add  ${player.playerName } to current team`;
        btn.classList.add('add-to-team-btn')        
        let dtbtn: HTMLTableCellElement = document.createElement('td')!  
        dtbtn.classList.add('dt-to-team-btn')     
        btn.addEventListener('click', () => {
            addToTeam(player);
        }) 
        dtbtn.appendChild(btn)
        tablRoe.append(dt1, dt2, dt3, dt4, dt5,dtbtn);
        table.append(tablRoe);
    }
}
const showRange = () => {
    const rangeInputpo :HTMLInputElement= document.querySelector("#points")!;
    const rangeValuepo = document.querySelector('#pointsDisplay') as HTMLSpanElement;
    
    
    rangeInputpo.addEventListener('input', () => {
        rangeValuepo.textContent = rangeInputpo.value;
    });
    const rangeInputtow :HTMLInputElement= document.querySelector("#twoPercent")!;
    const rangeValuetow = document.querySelector('#towDisplay') as HTMLSpanElement;
    
    
    rangeInputtow.addEventListener('input', () => {
        rangeValuetow.textContent = rangeInputtow.value;
    });
    const rangeInputtree :HTMLInputElement= document.querySelector("#threePercent")!;
    const rangeValuetree = document.querySelector('#treeDisplay') as HTMLSpanElement;
    
    
    rangeInputtree.addEventListener('input', () => {
        rangeValuetree.textContent = rangeInputtree.value;
    });
}    
const getPlayerFromApi = async (player:Player) :Promise<Player[]>  => {
    try {
        const response: Response = await fetch(`${baseUrl}`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({   
                position: player.position,
                twoPercent: player.twoPercent,
                threePercent: player.threePercent,
                points:player.points,                          
                                       
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Player[] = await response.json();
        if (data.length === 0) {
            alert('Failed to fetch player data, please try again later.');
        }
        console.log('Player data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error(`Error fetching player data: ${(error as Error).message}`);
        
        return [];
    }
}

const getDataToArray = async () :Promise<Player[]> => {
arrplayers = await getPlayerFromApi(naeplayer)
createNewReoInTable(arrplayers)
return arrplayers;
}
const getValuesFromInput = () : Player => {
    const valuePoints: HTMLInputElement = document.querySelector('#points')! 
    const valueTwoPercent: HTMLInputElement = document.querySelector('#twoPercent')!
    const valueThreePercent: HTMLInputElement = document.querySelector('#threePercent')!
    const valuefroom: HTMLSelectElement = document.querySelector('#select')!

    let obj:Player ={
        points: parseInt(valuePoints.value),
        twoPercent: parseInt(valueTwoPercent.value),
        threePercent: parseInt(valueThreePercent.value),
        position: valuefroom.options[valuefroom.selectedIndex].value
    }
    // if(( parseInt(valuePoints.value)) || (parseInt(valueTwoPercent.value)) || ( parseInt(valueThreePercent.value)))
    //     {
    //     alert('Please enter valid numbers for points, two percent and three percent')
        
    // }
    console.log('Player object:', obj);
    return obj;
}
showRange()

const bodyForApi:HTMLButtonElement = document.querySelector('.search-player')!
    bodyForApi.addEventListener('click', async () => {
        console.log('Search player button clicked');
        const newPlayer:Player = getValuesFromInput()
        arrplayers = await getPlayerFromApi(newPlayer)
        createNewReoInTable(arrplayers)

    })