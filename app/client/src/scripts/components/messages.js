angular
.module('App', [])
.component('messageCompose', {

	template:	`<div class="message-compose">
							<input class="name" type="text" ng-model="$ctrl.name"/>
							<input class="message" type="text" ng-model="$ctrl.content"/>
							<button class="submit" ng-click="$ctrl.send()">Send</button>
						</div>`,

	controller: ['$http', function($http){

		this.send = function(){
			$http.post('/messages/send', {
				name: this.name,
				content: this.content
			}).then(
				(res) => {
					if(res.err) console.error(res.err);
					else console.log(res);
				},
				(err) => {
					console.error(err);
				}
			)
		}

	}]

})
.component('messageUi', {

});
