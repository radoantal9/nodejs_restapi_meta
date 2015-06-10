'use strict';

angular.module('core').directive('socialicon', [
	function() {
		return {
			template: '<img class="tag-source pull-left" src="/img/icn-{{tag.source}}.png">'
		};
	}
]);