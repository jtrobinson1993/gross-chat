app.component('topicForm', {

	templateUrl: 'template.html',

	controller: ['$http', '$scope', '$topic', function($http, $scope, $topic){
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
			$scope.$emit($topic.events.added, {
				title: this.title,
				options: this.options.slice()
			});
			this.options = [];
			this.title = '';
			this.option = '';
		};

	}]

});
