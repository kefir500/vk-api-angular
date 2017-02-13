angular.module('vk-api-angular').directive('vkAllowMessagesFromCommunity', function () {
  return {
    restrict: 'AEC',
    template: '<div data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id + '--allow-messages-from-community';
      VK.Widgets.AllowMessagesFromCommunity(scope.id, {
        height: attrs.height
      }, attrs.groupId);
    }
  };
});
