import {ipcRenderer as ipc} from 'electron';
import Tache from '../../../model/tache';
import {TachesService} from '../../services/taches';

export class TacheController {
    taches: Tache[];
    
    static $inject: string[] = ['TachesService'];
    constructor(public TachesService: TachesService){
        this.findAll();
    }

    findAll(){
        this.TachesService.findAll().then(function setTaches(this: TacheController, taches: Tache[]){
            this.taches = taches;
        }.bind(this));
    }

    add():void {
        alert('add');
    }
}

export default function (app: angular.IModule) {
    app.controller('TachesController', TacheController);
}
