app.component('topicItem', {

	templateUrl: 'template.html',

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
