angular.module('vk-api-angular').directive('vkPost', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--post" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.Post(scope.id, attrs.ownerId, attrs.postId, attrs.hash, {
        width: attrs.width
      });
    }
  };
});
