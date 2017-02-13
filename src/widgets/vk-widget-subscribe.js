angular.module('vk-api-angular').directive('vkSubscribe', function () {
  return {
    restrict: 'AEC',
    template: '<div data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id + '--subscribe';
      VK.Widgets.Subscribe(scope.id, {
        mode: attrs.mode,
        soft: attrs.soft
      }, attrs.ownerId);
    }
  };
});
