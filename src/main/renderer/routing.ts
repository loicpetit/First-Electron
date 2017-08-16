export default function (app: angular.IModule) {
    app.config(function ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController as homeCtrl',
                templateUrl: './views/home/view.html'
            })
            .state('taches', {
                url: '/taches',
                controller: 'TachesController as tachesCtrl',
                templateUrl: './views/taches/view.html'
            })
        // Redirection vers l'accueil en cas de route introuvable
        $urlRouterProvider.otherwise('/');
    });
}