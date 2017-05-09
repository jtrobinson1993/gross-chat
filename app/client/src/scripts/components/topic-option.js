app.component('topicOption', {

	template: `
		<div class="topic-option" ng:class="$ctrl.isSelected ? 'selected': ''" ng:click="$ctrl.onClick()" data-id="$ctrl.option._id">
			<div class="topic-option-title">{{$ctrl.option.title}}</div>
			<div class="topic-option-count">{{$ctrl.option.voters.length}}</div>
		</div>
	`.replace(/\t|\n/g,''),

	bindings: {
		option: '<'
	},

	controller: ['$scope', '$user', function($scope, $user){
		this.isSelected = this.option.selected;

		this.onClick = () => {
			if(!this.isSelected){
				$scope.$emit('topic:option-selected', this.option);
			}
		};

		$scope.$on('topic:select-options', (event, selectedOption) => {
			const wasSelected = this.isSelected;
			this.isSelected = this.option.title == selectedOption.title;
			if(wasSelected && !this.isSelected){
				const user = $user.current();
				const userIndex = this.option.voters.findIndex((e) => e.name == user.name);
				this.option.voters.splice(userIndex, 1);
			} else if(this.isSelected){
				this.option.voters.push($user.current());
			}
		});

	}]

});
