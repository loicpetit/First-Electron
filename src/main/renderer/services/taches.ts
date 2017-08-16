import {Tache} from '../../model/tache';

export class TachesService {
    static $inject: string[] = [];
    findAll(): Tache[] {
            let t1: Tache = new Tache();
            t1.id = 1;
            t1.libelle = 'tache 1';
            return [t1];
    }
}

export default function (app: angular.IModule) {
    app.factory('TachesService', TachesService);
}