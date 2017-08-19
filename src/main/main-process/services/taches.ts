import { ipcMain as ipc } from 'electron';
import Tache from '../../model/tache';
import tachesProcessus from '../processus/taches';
import { TachesCreateModal } from '../modals/modals'

ipc.on('taches', function (event: Electron.Event, arg: void) {
    let taches = tachesProcessus.findAll();
    event.sender.send('taches', taches);
})

ipc.on('taches.create', function (event: Electron.Event, tache: Tache) {
    let tacheCreated = tachesProcessus.save(tache);
    event.sender.send('taches.create', tacheCreated);
})

ipc.on('taches.create.modal', function (event: Electron.Event, arg: void) {
    let modal = new TachesCreateModal();
    modal.open(function onClose(tache: Tache) {
        
    }, function onDismiss() {

    });
})
