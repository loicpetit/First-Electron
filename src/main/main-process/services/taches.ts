import {ipcMain as ipc} from 'electron';
import tachesProcessus from '../processus/taches';

ipc.on('taches', function(event: Electron.Event, arg: void){
    let taches = tachesProcessus.findAll();
    event.sender.send('taches', taches);
})
