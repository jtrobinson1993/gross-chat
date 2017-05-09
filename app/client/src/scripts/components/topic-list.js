app.component('topicList', {

	template: `
		<div class="component topic-list">
			<div class="topic-list">
				<topic-item ng:repeat="topic in $ctrl.topics" topic="topic"></topic-item>
			</div>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		topics: '<'
	},

	controller: ['$scope', function($scope){

	}]

});
