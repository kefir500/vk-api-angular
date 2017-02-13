angular.module('vk-api-angular').directive('vkAuth', function () {
  return {
    restrict: 'AEC',
    template: '<div data-ng-attr-id="{{::id}}"></div>',
    scope: {
      onAuth: '='
    },
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id + '--auth';
      VK.Widgets.Auth(scope.id, {
        width: attrs.width,
        onAuth: scope.onAuth,
        authUrl: attrs.authUrl
      });
    }
  };
});