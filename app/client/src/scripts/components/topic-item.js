app.component('topicItem', {

	template: `
		<div class="topic-item">
			<div class="topic-item-title">{{$ctrl.topic.title}}</div>
			<div class="topic-option-list">
				<topic-option ng:repeat="option in $ctrl.topic.options" option="option"></topic-option>
			</div>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		topic: '<'
	},

	controller: ['$scope', function($scope){
		$scope.$on('topic:option-selected', (event, selectedOption) => {
			$scope.$broadcast('topic:select-options', selectedOption);
			$scope.$emit('topic:selected', this.topic, selectedOption);
		});
	}]

});
