app.component('topicItem', {

	templateUrl: 'template.html',

	bindings: {
		topic: '<'
	},

	controller: ['$scope', '$topic', function($scope, $topic){
		$scope.$on($topic.events.voteCast, (event, selectedOption) => {
			$scope.$broadcast($topic.events.updateOptions, selectedOption);
			$scope.$emit($topic.events.voted, this.topic, selectedOption);
		});
	}]

});
