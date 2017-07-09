// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc = require('electron').ipcRenderer
const clickMeBtn = document.getElementById('clickMe');

clickMeBtn.addEventListener('click', function(){
    alert('clicked !');
});

//  Taches
const tachesTable = document.getElementById('taches');
const tacheLibelle = document.getElementById('tacheLibelle');
const addTacheButton = document.getElementById('tacheAdd');

function getTaches(){
    ipc.send('taches');
}
function addTache(tache){
    ipc.send('taches.create', tache);
}

ipc.on('taches', function(event, arg){
    let taches = arg;
    let html = '';
    if(taches.length == 0){
        html = '<tr><td colspan="2">Aucune tache.</td></tr>'
    }else{
        for(tache of taches){
            let TDs = '<tr><td>' + tache.id + '</td><td>' + tache.libelle + '</td></tr>';
            html += TDs;
        }
    }
    tachesTable.innerHTML = html;
});


addTacheButton.addEventListener('click', function(){
    let libelle = tacheLibelle.value;
    if(libelle){
        let tache = {
            libelle: libelle
        }
        addTache(tache);
    }else{
        alert('Il faut un libelle !');
    }
});

getTaches();