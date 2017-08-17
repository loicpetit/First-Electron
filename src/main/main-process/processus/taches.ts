import Tache from '../../model/tache'
import {tachesDao} from '../dao/all';

export class Processus {
    findAll(): Tache[] {
        return tachesDao.findAll();
    }

    save(tache: Tache): Tache {
        return tachesDao.save(tache);
    }
}

export default new Processus();