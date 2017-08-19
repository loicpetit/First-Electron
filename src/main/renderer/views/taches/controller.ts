import { ipcRenderer as ipc } from 'electron';
import Tache from '../../../model/tache';
import { TachesService } from '../../services/taches';

export class TacheController {
    taches: Tache[];

    static $inject: string[] = ['TachesService'];
    constructor(public TachesService: TachesService) {
        this.findAll();
    }

    findAll(): void {
        this.TachesService.findAll().then(function setTaches(this: TacheController, taches: Tache[]) {
            this.taches = taches;
        }.bind(this));
    }

    add(): void {
        this.TachesService.openTacheCreateModal();
    }

    delete($event: angular.IAngularEvent, tache: Tache): void {
        $event.stopPropagation();
        alert('delete');
    }
}

export default function (app: angular.IModule) {
    app.controller('TachesController', TacheController);
}
