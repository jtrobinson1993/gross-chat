app.component('topicUi', {

	templateUrl: 'template.html',

	controller: ['$scope', '$user', '$topic', function($scope, $user, $topic){
		this.topics = [];
		this.isLoggedIn = () => $user.isLoggedIn();

		this.$onInit = () => {
			$topic.list().success((data) => {
				const user = $user.current();
				if(user){
					data.forEach(topic => {
						const selectedOption = topic.options.find(option => {
							for(let index in option.voters)
								if(option.voters[index].id == user.id) return true;
							return false;
						});
						if(selectedOption) selectedOption.selected = true;
					});
				}
				this.topics = data;
			});
		};

		$scope.$on('topic:selected', (event, topic, option) => {
			$topic.select({topic, option}).success((data) => {

			});
		});

		$scope.$on('topic:topic-added', (event, topic) => {
			$topic.create(topic).success(data => this.topics.unshift(data));
		});

	}]

});
