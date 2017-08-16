export default function (app: angular.IModule) {
    app.controller('HomeController', [function () {
        this.title = "Welcome !";
    }]);
}