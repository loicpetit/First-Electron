import Tache from '../../../model/tache'

export class Dao {

    taches: Tache[] = [];

    constructor() {
        const tache1: Tache = new Tache();
        tache1.id = 1;
        tache1.libelle = 'tache 1';
        this.taches.push(tache1);
    }
    
    findAll(): Tache[] {
        return this.taches;
    } 
    
    save(tache: Tache): Tache {
        tache.id = this.computeId();
        tache.dateCreation = new Date();
        this.taches.push(tache);
        return tache;
    }

    private computeId(): number {
        let maxId: number = 0;
        for(let tache of this.taches){
            if(tache.id > maxId){
                maxId = tache.id;
            }
        }
        return maxId + 1;
    }
}

export default new Dao();