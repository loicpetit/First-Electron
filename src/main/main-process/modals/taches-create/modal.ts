import { BrowserWindow } from 'electron';
import * as path from 'path';
import { IModal } from '../modals';
import Tache from '../../../model/tache';

import { mainWindow } from '../../main';

export class TachesCreateModal implements IModal<Tache> {
    open(onSuccess: (data: Tache) => void, onDismiss: () => void) {
        let modal = new BrowserWindow({
            width: 400,
            height: 320,
            parent: mainWindow,
            modal: true
        })
        modal.on('close', function () { modal = null })
        modal.loadURL(path.join(__dirname, 'view.html'))
        modal.show()
    }
}