app.component('voteUi', {

	template: `
		<div class="component vote-ui">
			<vote-form></vote-form>
			<vote-list votes="$ctrl.votes"></vote-list>
		</div>
	`.replace(/\t|\n/g,''),

	controller: ['$scope', '$user', '$vote', function($scope, $user, $vote){
		this.votes = [];

		this.$onInit = () => {
			$vote.list().success((data) => {
				const user = $user.current();
				if(user){
					data.forEach(vote => {
						const selectedOption = vote.options.find(option => option.voters.indexOf(user.id) >= 0);
						console.log(selectedOption);
						if(selectedOption) selectedOption.selected = true;
					});
				}
				this.votes = data;
			});
		};

		$scope.$on('vote:selected', (event, vote, option) => {
			$vote.select({vote, option}).success((data) => {

			});
		});

		$scope.$on('vote:vote-added', (event, vote) => {
			$vote.create(vote).success(data => this.votes.unshift(data));
		});

	}]

});
