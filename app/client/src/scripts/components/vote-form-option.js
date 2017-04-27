app.component('voteFormOption', {

	template: `
		<div class="vote-form-option">{{$ctrl.option}}</div>
		<div class="vote-form-option-remove fa fa-close" ng:click="$ctrl.onRemove({option:$ctrl.option})"></div>
	`.replace(/\t|\n/g,''),

	bindings: {
		option: '<',
		onRemove: '&'
	}

});
