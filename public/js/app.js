var app = angular.module("meetupApp", ["ui.router", "ngResource"])
app.config(["$stateProvider", RouterFunction])
app.controller("IndexController", ["EventFactory", "$state", IndexControllerFunction])
app.factory("EventFactory", ["$resource", EventFactoryFunction])
app.controller("ShowController", ["EventFactory", "$stateParams", "$state", ShowControllerFunction])

function EventFactoryFunction($resource){
  return $resource("/api/events/:event_title", {}, {
    update: {method: "PUT"}
  })
}

function RouterFunction($stateProvider){

  $stateProvider
    .state("homepage",{
      url: "/",
      templateUrl: "/assets/js/ng-views/index.html"
    })
    .state("index", {
      url: "/events",
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "IndexController",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/events/:event_title",
      templateUrl: "/assets/js/ng-views/show.html",
      controller: "ShowController",
      controllerAs: "vm"
    })
}

function IndexControllerFunction(EventFactory, $state){
  this.events = EventFactory.query();
  this.newEvent = new EventFactory();
  this.create = function(){
    this.newEvent.$save().then(function(event){
      $state.go("homepage")
    })
  }
}

function ShowControllerFunction(EventFactory, $stateParams, $state){
  console.log($stateParams.event_title)
  this.event = EventFactory.get({event_title: $stateParams.event_title})
  this.destroy = function(){
    this.event.$delete({event_title: $stateParams.event_title}).then(function(){
      $state.go("homepage")
    })
  }
  this.update = function(){
    this.event.$update({event_title: $stateParams.event_title})
  }
}
