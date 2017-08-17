import Tache from '../../model/tache';
import { ipcRenderer as ipc } from 'electron';

export class TachesService {
    static $inject: string[] = ['$q'];
    constructor(public $q: angular.IQService) {
    }

    findAll(): angular.IPromise<Tache[]> {
        let deferred = this.$q.defer<Tache[]>();
        ipc.once('taches', function(event: Electron.Event, taches: Tache[]){
            deferred.resolve(taches);
        });
        ipc.send('taches');
        return deferred.promise;
    }
}

export default function (app: angular.IModule) {
    app.factory('TachesService', TachesService);
}