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
