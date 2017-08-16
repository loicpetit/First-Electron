import {ipcRenderer as ipc} from 'electron';
import {Tache} from '../../../model/tache';
import {TachesService} from '../../services/taches';

export class TacheController {
    taches: Tache[];
    static $inject: string[] = ['TachesService'];
    constructor(TachesService: TachesService){
        this.taches = TachesService.findAll();
    }
    add():void {
        alert('add');
    }
}

export default function (app: angular.IModule) {
    app.controller('TachesController', TacheController);
}

//  Taches

function getTaches(){
    ipc.send('taches');
}
function addTache(tache: any){
    ipc.send('taches.create', tache);
}

ipc.on('taches', function(event: any, arg: any){
    let taches = arg;
    let html = '';
    if(taches.length == 0){
        html = '<tr><td colspan="2">Aucune tache.</td></tr>'
    }else{
        for(let tache of taches){
            let TDs = '<tr><td>' + tache.id + '</td><td>' + tache.libelle + '</td></tr>';
            html += TDs;
        }
    }
});
