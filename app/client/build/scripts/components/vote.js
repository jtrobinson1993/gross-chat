'use strict';angular.module('App').component('voteList',{template:'\n\t\t<div ng-repeat="vote in $ctrl.votes">\n\t\t\t<div class="vote-title">{{vote.title}}</div>\n\t\t\t<div ng-repeat="option in vote.options">\n\t\t\t\t<div class="vote-option selected" ng-if="option.selected">{{option.title}}</div>\n\t\t\t\t<button class="vote-option" ng-if="!option.selected" ng-click="$ctrl.vote(vote, option)">{{option.title}}</div>\n\t\t\t</div>\n\t\t</div>\n\t'.replace(/\t|\n/g,''),controller:['$http','$cookies',function(a,b){var c=this;this.votes=[],this.load=function(){a.get('/vote/list').success(function(d){var e=b.getObject('user').id,f=!0,g=!1,h=void 0;try{for(var j,i=d[Symbol.iterator]();!(f=(j=i.next()).done);f=!0){var p=j.value,k=!0,l=!1,m=void 0;try{for(var o,q,n=p.options[Symbol.iterator]();!(k=(o=n.next()).done);k=!0)if(q=o.value,0<=q.voters.indexOf(e)){q.selected=!0;break}}catch(q){l=!0,m=q}finally{try{!k&&n.return&&n.return()}finally{if(l)throw m}}}}catch(p){g=!0,h=p}finally{try{!f&&i.return&&i.return()}finally{if(g)throw h}}c.votes=d})},this.vote=function(){},this.$onInit=this.load}]});