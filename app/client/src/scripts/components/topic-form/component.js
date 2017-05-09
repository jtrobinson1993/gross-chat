app.component('topicForm', {

	templateUrl: 'template.html',

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
