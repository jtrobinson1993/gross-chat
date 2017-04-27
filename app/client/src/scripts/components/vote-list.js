app.component('voteList', {

	template: `
		<div class="component vote-list">
			<div class="vote-list">
				<vote-item ng:repeat="vote in $ctrl.votes" vote="vote"></vote-item>
			</div>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		votes: '<'
	},

	controller: ['$scope', function($scope){

	}]

});
