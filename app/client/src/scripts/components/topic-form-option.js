app.component('topicFormOption', {

	template: `
		<div class="topic-form-option">{{$ctrl.option}}</div>
		<div class="topic-form-option-remove fa fa-close" ng:click="$ctrl.onRemove({option:$ctrl.option})"></div>
	`.replace(/\t|\n/g,''),

	bindings: {
		option: '<',
		onRemove: '&'
	}

});
