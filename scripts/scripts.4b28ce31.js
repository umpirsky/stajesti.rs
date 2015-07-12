"use strict";angular.module("restaurantsApp",["ngResource","ngRoute","ngCookies","ngTouch","slick","angular-flexslider","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/gradovi",{title:"Meniji restorana u Srbiji, naručite hranu za dostavu u Nišu ili Novom Sadu",templateUrl:"views/main.html"}).when("/:location/:slug",{templateUrl:"views/restaurant.html",controller:"RestaurantCtrl"}).when("/:location",{templateUrl:"views/location.html",controller:"LocationCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$modalStack",function(a,b){a.$on("$routeChangeSuccess",function(c,d,e){b.dismissAll(),"undefined"!=typeof d.$$route.title&&(a.title=d.$$route.title)})}]),angular.module("restaurantsApp").factory("urlText",[function(){return function(a){var b=document.createElement("a");return b.href=a,-1!==b.href.indexOf("facebook.com/pages")?window.decodeURIComponent(b.pathname.split("/")[2]):-1!==b.hostname.indexOf("facebook")?b.pathname.replace(/\//,""):b.hostname.replace("www.","")}}]).factory("urlIcon",[function(){return function(a){var b=document.createElement("a");return b.href=a,-1!==b.hostname.indexOf("facebook")?"facebook":"link"}}]),angular.module("restaurantsApp").factory("locationDetect",["$location","$timeout","$cookies",function(a,b,c){return function(a){var b=function(b){switch(b){case"Niš":a("nis");break;case"Novi Sad":a("novi-sad")}},d=c.get("restaurants_location");d?b(d):geolocator.locate(function(a){if("RS"==a.address.countryCode){var d=new Date;d.setMonth(d.getMonth()+1),c.put("restaurants_location",a.address.city,{expires:d}),b(a.address.city)}})}}]).factory("locationByKeyLocative",[function(){return function(a){return{nis:"Nišu","novi-sad":"Novom Sadu"}[a]}}]),angular.module("restaurantsApp").filter("thumbnail",function(){return function(a,b){return a.replace("images/","images/thumbnails-"+b+"/")}}).filter("phoneUrl",function(){return function(a){return a?"tel:"+a.split(",")[0]:a}}).filter("urlText",["urlText",function(a){return function(b){return a(b)}}]).filter("urlIcon",["urlIcon",function(a){return function(b){return a(b)}}]),angular.module("restaurantsApp").controller("MainCtrl",["$scope","$location","$timeout","locationDetect",function(a,b,c,d){d(function(d){null!==d&&c(function(){a.$apply(function(){b.path("/"+d)})})})}]),angular.module("restaurantsApp").controller("LocationCtrl",["$rootScope","$scope","$routeParams","$http","locationByKeyLocative",function(a,b,c,d,e){b.location=c.location,a.title="Meniji restorana u "+e(b.location)+", naručite hranu za dostavu brzo i lako",d.get("data/"+c.location+".json").success(function(a){b.restaurants=a})}]),angular.module("restaurantsApp").controller("RestaurantCtrl",["$rootScope","$scope","$routeParams","$http","$modalStack",function(a,b,c,d,e){d.get("data/"+c.location+"/"+c.slug+".json").success(function(c){b.restaurant=c,a.title=b.restaurant.name}),b.close=function(){e.dismissAll()},b.breakpoints=[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}]),angular.module("restaurantsApp").directive("modal",["$modal",function(a){function b(b){var c;this.show=function(d){c&&c.dismiss(),b.startAt=d,a.open({templateUrl:"views/modal.html",size:"md",scope:b})}}function c(a,b,c,d){}return b.$inject=["$scope"],{link:c,controller:b,restrict:"A",bindToController:!0,controllerAs:"modal"}}]);