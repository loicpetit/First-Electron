export class MainController {
    static $inject: string[] = [];
    constructor(){

    }
}

export default function (app: angular.IModule) {
    app.controller('MainController', MainController);
}