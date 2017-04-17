angular
.module('App')
.component('voteList', {

	template: `
		<div ng-repeat="vote in $ctrl.votes">
			<div class="vote-title">{{vote.title}}</div>
			<div ng-repeat="option in vote.options">
				<div class="vote-option selected" ng-if="option.selected">{{option.title}}</div>
				<button class="vote-option" ng-if="!option.selected" ng-click="$ctrl.vote(vote, option)">{{option.title}}</div>
			</div>
		</div>
	`.replace(/\t|\n/g,''),

	controller: ['$http', '$cookies', function($http, $cookies){
		this.votes = [];

		this.load = () => {
			$http
			.get('/vote/list')
			.success((data) => {
				const userId = $cookies.getObject('user').id;
				for(let vote of data){
					for(let option of vote.options){
						if(option.voters.indexOf(userId) >= 0) {
							option.selected = true;
							break;
						}
					}
				}
				this.votes = data;
			});
		};

		this.vote = (vote, option) => {

		};

		this.$onInit = this.load;
	}]

});
