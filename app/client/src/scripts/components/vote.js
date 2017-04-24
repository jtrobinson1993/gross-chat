// VOTE UI COMPONENT
app.component('voteUi', {

	template: `
		<div class="component vote-ui">
			<vote-form></vote-form>
			<vote-list votes="$ctrl.votes"></vote-list>
		</div>
	`.replace(/\t|\n/g,''),

	controller: ['$http', '$scope', '$user', function($http, $scope, $user){
		this.votes = [];

		this.$onInit = () => {
			$http
			.get('/vote/list')
			.success((data) => {
				const user = $user.current();
				if(user){
					data.forEach(vote => {
						const selectedOption = vote.options.find(option => option.voters.indexOf(user.id) >= 0);
						if(selectedOption) selectedOption.selected = true;
					});
				}
				this.votes = data;
			});
		};

		$scope.$on('vote:option-selected', (event, option) => {
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
app.component('voteForm', {

	template: `
		<div class="component vote-form">
			<h2 class="component-title">Create new vote</h2>
			<form class="vote-form form" name="voteForm">
				<div class="messages" ng:messages="voteForm.title.$error">

				</div>
				<input class="form-input" type="text" placeholder="title" name="title" ng:model="$ctrl.title" required/>
				<input class="form-input" type="text" placeholder="option" name="option" ng:model="$ctrl.option"/>
				<div class="form-button button" ng:click="$ctrl.addOption()">Add Option</div>
				<vote-form-option ng:repeat="option in $ctrl.options track by $index" on-remove="$ctrl.removeOption(option)" option="option"></vote-form-option>
				<div class="form-button button important submit" ng:click="$ctrl.addVote()" ng:show="$ctrl.title && $ctrl.options.length > 1">Create Vote</div>
			</form>
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
app.component('voteFormOption', {

	template: `
		<div class="vote-form-option">{{$ctrl.option}}</div>
		<div class="vote-form-option-remove fa fa-close" ng:click="$ctrl.onRemove({option:$ctrl.option})"></div>
	`.replace(/\t|\n/g,''),

	bindings: {
		option: '<',
		onRemove: '&'
	}

});

// VOTE LIST COMPONENT
app.component('voteList', {

	template: `
		<div class="component vote-list">
			<div class="vote-list">
				<vote-item ng:repeat="vote in $ctrl.votes" vote="vote"></vote-item>
			</div>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		votes: '<'
	},

	controller: ['$scope', function($scope){

	}]

});

// VOTE ITEM COMPONENT
app.component('voteItem', {

	template: `
		<div class="vote-item">
			<div class="vote-item-title">{{$ctrl.vote.title}}</div>
			<div class="vote-option-list">
				<vote-option ng:repeat="option in $ctrl.vote.options" option="option"></vote-option>
			</div>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		vote: '<'
	},

	controller: ['$scope', function($scope){
		$scope.$on('vote:option-selected', (event, selectedOption) => {
			$scope.$broadcast('vote:select-options', selectedOption);
		});
	}]

});

// VOTE OPTION COMPONENT
app.component('voteOption', {

	template: `
		<div class="vote-option" ng:class="$ctrl.isSelected ? 'selected': ''" ng:click="$ctrl.onClick()" data-id="$ctrl.option._id">
			<div class="vote-option-title">{{$ctrl.option.title}}</div>
			<div class="vote-option-count">{{$ctrl.option.voters.length}}</div>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		option: '<'
	},

	controller: ['$scope', '$user', function($scope, $user){
		this.isSelected = false;

		this.onClick = () => {
			if(!this.isSelected){
				$scope.$emit('vote:option-selected', this.option);
			}
		};

		$scope.$on('vote:select-options', (event, selectedOption) => {
			const wasSelected = this.isSelected;
			this.isSelected = this.option.title == selectedOption.title;
			if(wasSelected && !this.isSelected){
				const user = $user.current();
				const userIndex = this.options.voters.findIndex((e) => e.name == user.name);
				this.options.voters.splice(userIndex, 1);
			} else if(this.isSelected){
				this.option.voters.push($user.current());
			}
		});

	}]

});
