app.component('topicForm', {

	template: `
		<div class="component topic-form">
			<h2 class="component-title">Create new topic</h2>
			<form class="topic-form form" name="topicForm">
				<div class="messages" ng:messages="topicForm.title.$error">

				</div>
				<input class="form-input" type="text" placeholder="title" name="title" ng:model="$ctrl.title" required/>
				<input class="form-input" type="text" placeholder="option" name="option" ng:model="$ctrl.option"/>
				<div class="form-button button" ng:click="$ctrl.addOption()">Add Option</div>
				<topic-form-option ng:repeat="option in $ctrl.options track by $index" on-remove="$ctrl.removeOption(option)" option="option"></topic-form-option>
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
			$scope.$emit('topic:topic-added', {
				title: this.title,
				options: this.options.slice()
			});
			this.options = [];
			this.title = '';
			this.option = '';
		};

	}]

});
