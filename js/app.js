"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = 'https://nbaserver-q21u.onrender.com/api/filter';
let arrplayers = [];
let myTeam = [];
const deleteAllRows = () => {
    const tbody = document.querySelector('.div-table tbody');
    if (tbody) {
        tbody.innerHTML = '';
    }
};
const createNewReoInTable = (arrplayers) => {
    if (arrplayers.length > 0) {
        deleteAllRows();
    }
    for (let player of arrplayers) {
        createNewReo(player);
    }
};
const addToTeam = (player) => {
    myTeam.push(player);
    let card = document.querySelector(`#${player.position}`);
    card.remove();
    let newCard = document.createElement('div');
    newCard.id = player.position;
    newCard.classList.add('player');
    newCard.innerHTML = `
    <h2>${player.position}</h2>
    <p> <b>${player.playerName}</b></p>
    <p>Team: ${player.team}</p>
    <p>Three Percent: ${player.threePercent}%</p>
        <p>.two Percent: ${player.twoPercent}%</p>`;
    const mainCard = document.querySelector('.main-player');
    mainCard.appendChild(newCard);
};
const createNewReo = (player) => {
    var _a, _b, _c, _d, _e;
    if (player) {
        let table = document.querySelector('.div-table');
        let tdbody = document.querySelector('tbody');
        let tablRoe = document.createElement('tr');
        tablRoe.classList.add('tr');
        let dt1 = document.createElement('td');
        dt1.textContent = (_a = player.playerName) !== null && _a !== void 0 ? _a : '';
        let dt2 = document.createElement('td');
        dt2.textContent = (_b = player.position) !== null && _b !== void 0 ? _b : '';
        let dt3 = document.createElement('td');
        dt3.textContent = (_c = player.points.toString()) !== null && _c !== void 0 ? _c : '';
        let dt4 = document.createElement('td');
        dt4.textContent = (_d = player.threePercent.toString()) !== null && _d !== void 0 ? _d : '';
        let dt5 = document.createElement('td');
        dt5.textContent = (_e = player.threePercent.toString()) !== null && _e !== void 0 ? _e : '';
        let btn = document.createElement("button");
        btn.textContent = `Add  ${player.playerName} to current team`;
        btn.classList.add('add-to-team-btn');
        let dtbtn = document.createElement('td');
        dtbtn.classList.add('dt-to-team-btn');
        btn.addEventListener('click', () => {
            addToTeam(player);
        });
        dtbtn.appendChild(btn);
        tablRoe.append(dt1, dt2, dt3, dt4, dt5, dtbtn);
        tdbody.appendChild(tablRoe);
        table.append(tdbody);
    }
};
const showRange = () => {
    const rangeInputpo = document.querySelector("#points");
    const rangeValuepo = document.querySelector('#pointsDisplay');
    rangeInputpo.addEventListener('input', () => {
        rangeValuepo.textContent = rangeInputpo.value;
    });
    const rangeInputtow = document.querySelector("#twoPercent");
    const rangeValuetow = document.querySelector('#towDisplay');
    rangeInputtow.addEventListener('input', () => {
        rangeValuetow.textContent = rangeInputtow.value;
    });
    const rangeInputtree = document.querySelector("#threePercent");
    const rangeValuetree = document.querySelector('#treeDisplay');
    rangeInputtree.addEventListener('input', () => {
        rangeValuetree.textContent = rangeInputtree.value;
    });
};
const getPlayerFromApi = (player) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseUrl}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                position: player.position,
                twoPercent: player.twoPercent,
                threePercent: player.threePercent,
                points: player.points,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (data.length === 0) {
            alert('Failed to fetch player data, please try again later.');
        }
        console.log('Player data fetched successfully:', data);
        return data;
    }
    catch (error) {
        console.error(`Error fetching player data: ${error.message}`);
        return [];
    }
});
const getValuesFromInput = () => {
    const valuePoints = document.querySelector('#points');
    const valueTwoPercent = document.querySelector('#twoPercent');
    const valueThreePercent = document.querySelector('#threePercent');
    const valuefroom = document.querySelector('#select');
    let obj = {
        points: parseInt(valuePoints.value),
        twoPercent: parseInt(valueTwoPercent.value),
        threePercent: parseInt(valueThreePercent.value),
        position: valuefroom.options[valuefroom.selectedIndex].value
    };
    return obj;
};
// Bonus........
const postMyTeam = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myTeam),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = yield response.json();
        console.log('Success:', data);
    }
    catch (error) {
        console.error('Error:', error);
    }
});
showRange();
const bodyForApi = document.querySelector('.search-player');
bodyForApi.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const newPlayer = getValuesFromInput();
    arrplayers = yield getPlayerFromApi(newPlayer);
    createNewReoInTable(arrplayers);
}));
