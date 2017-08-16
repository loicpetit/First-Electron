declare var angular: angular.IAngularStatic;

import tachesService from './services/taches';

import mainController from './views/main-controller';
import homeController from './views/home/controller';
import tachesController from './views/taches/controller'
import routing from './routing';

let app = angular.module('first-electron', [
    'ui.router'
]);

tachesService(app);

mainController(app);
homeController(app);
tachesController(app);

routing(app);

export default app;