angular.module('vk-api-angular').directive('vkContactUs', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget vk-widget--contact-us" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.ContactUs(scope.id, {
        text: attrs.text,
        height: attrs.height
      }, attrs.ownerId);
    }
  };
});
