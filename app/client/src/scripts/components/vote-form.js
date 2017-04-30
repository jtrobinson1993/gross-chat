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
			$scope.$emit('vote:vote-added', {
				title: this.title,
				options: this.options.slice()
			});
			this.options = [];
			this.title = '';
			this.option = '';
		};

	}]

});
