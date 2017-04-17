angular
.module('App')
.component('voteCreation', {

	template: `
		<div class="vote-creation form">
			<input class="vote-creation-title" type="text" ng-model="$ctrl.title" placeholder="title" />
			<input class="vote-creation-option" type="text" ng-model="$ctrl.option" placeholder="option" />
			<button class="vote-creation-add-option" ng-click="$ctrl.addOption()">Add Option</button>
			<div class="vote-creation-options" ng-repeat="option in $ctrl.options">{{option}}</div>
			<button class="vote-creation-submit form-submit" ng-if="$ctrl.options.length > 1 && $ctrl.title" ng-click="$ctrl.addVote()">Create</button>
		</div>
	`.replace(/\t|\n/g,''),

	controller: ['$http', function($http){
		this.title = '';
		this.option = '';
		this.options = [];

		this.addOption = () => {
			this.options.push(this.option);
			this.option = '';
			this.controller.test();
		};

		this.addVote = () => {
			$http
			.post('/vote/create', {
				title: this.title,
				options: this.options
			})
			.success((data) => {
				this.controller.test();
			});
		};

	}]

});

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
		<vote-creation></vote-creation>
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
