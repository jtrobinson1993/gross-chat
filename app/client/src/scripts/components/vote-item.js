app.component('voteItem', {

	template: `
		<div class="vote-item">
			<div class="vote-item-title">{{$ctrl.vote.title}}</div>
			<div class="vote-option-list">
				<vote-option ng:repeat="option in $ctrl.vote.options" option="option"></vote-option>
			</div>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		vote: '<'
	},

	controller: ['$scope', function($scope){
		$scope.$on('vote:option-selected', (event, selectedOption) => {
			$scope.$broadcast('vote:select-options', selectedOption);
			$scope.$emit('vote:selected', this.vote, selectedOption);
		});
	}]

});
