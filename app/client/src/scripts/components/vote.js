// VOTE UI COMPONENT
angular
.module('App')
.component('voteUi', {

	template: `
		<vote-form></vote-form>
		<vote-list votes="$ctrl.votes"></vote-list>
	`.replace(/\t|\n/g,''),

	controller: ['$http', '$scope', '$cookies', function($http, $scope, $cookies){
		this.votes = [];

		this.$onInit = () => {
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

		$scope.$on('vote:option-clicked', (event, option) => {
			$http
			.post('/vote/select', option)
			.success((data) => {

			});
		});

		$scope.$on('vote:vote-added', (event, vote) => {
			this.votes.push(vote);
		});

	}]

});

// VOTE FORM COMPONENT
angular
.module('App')
.component('voteForm', {

	template: `
		<div class="vote-form form">
			<input class="form-input" type="text" placeholder="title" ng:model="$ctrl.title"/>
			<input class="form-input" type="text" placeholder="option" ng:model="$ctrl.option"/>
			<div class="form-button button" ng:click="$ctrl.addOption()">Add Option</div>
			<vote-form-option ng:repeat="option in $ctrl.options track by $index" on-remove="$ctrl.removeOption(option)" option="option"></vote-form-option>
			<div class="form-button button important" ng:click="$ctrl.addVote()" ng:show="$ctrl.title && $ctrl.options.length > 1">Create Vote</div>
		</div>
	`.replace(/\t|\n/g,''),

	controller: ['$http', '$scope', function($http, $scope){
		this.options = [];
		this.title = '';
		this.option = '';

		this.addOption = () => {
			const option = this.option.trim();
			if(!option) return;
			this.options.push(option);
			this.option = '';
		};

		this.removeOption = (option) => {
			this.options.splice(this.options.indexOf(option),1);
		};

		this.addVote = () => {
			const vote = {
				title: this.title,
				options: this.options
			}
			$http
			.post('/vote/create', vote)
			.success((data) => {
				for(let i in vote.options) vote.options[i] = {title: vote.options[i], count: 0};
				$scope.$emit('vote:vote-added', vote);
				this.options = [];
				this.title = '';
				this.option = '';
			});
		};

	}]

});

// VOTE FORM OPTION COMPONENT
angular
.module('App')
.component('voteFormOption', {

	template: `
		<div class="vote-form-option">{{$ctrl.option}}</div>
		<div class="vote-form-option-remove" ng:click="$ctrl.onRemove({option:$ctrl.option})">X</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		option: '<',
		onRemove: '&'
	}

});

// VOTE LIST COMPONENT
angular
.module('App')
.component('voteList', {

	template: `
		<div class="vote-list">
			<vote-item ng:repeat="vote in $ctrl.votes" vote="vote"></vote-item>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		votes: '<'
	},

	controller: ['$scope', function($scope){

	}]

});

// VOTE ITEM COMPONENT
angular
.module('App')
.component('voteItem', {

	template: `
		<div class="vote-item">
			<div class="vote-item-title">{{$ctrl.vote.title}}</div>
			<vote-option ng:repeat="option in $ctrl.vote.options" option="option"></vote-option>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		vote: '<'
	},

	controller: ['$scope', function($scope){

	}]

});

// VOTE OPTION COMPONENT
angular
.module('App')
.component('voteOption', {

	template: `
		<div class="vote-option" ng:class="$ctrl.isSelected ? 'selected': ''" ng:click="$ctrl.onClick()" data-id="$ctrl.option._id">
			<div class="vote-option-title">{{$ctrl.option.title}}</div>
			<div class="vote-option-count">{{$ctrl.option.voters.length}}</div>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		option: '<'
	},

	controller: ['$scope', '$cookies', function($scope, $cookies){
		this.isSelected = false;

		this.onClick = () => {
			if(!this.isSelected){
				this.isSelected = true;
				this.option.voters.push($cookies.getObject('user'));
				$scope.$emit('vote:option-clicked', this.option);
			}
		};

	}]

});
