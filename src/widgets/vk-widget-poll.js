angular.module('vk-api-angular').directive('vkPoll', function () {
  return {
    restrict: 'AEC',
    template: '<div data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id + '--poll';
      VK.Widgets.Poll(scope.id, {
        width: attrs.width,
        pageUrl: attrs.pageUrl
      }, attrs.pollId);
    }
  };
});
