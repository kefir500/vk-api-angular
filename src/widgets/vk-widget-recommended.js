angular.module('vk-api-angular').directive('vkRecommended', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--recommended" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.Recommended(scope.id, {
        limit: attrs.limit,
        max: attrs.max,
        period : attrs.period
      }, attrs.verb, attrs.sort, attrs.target);
    }
  };
});
