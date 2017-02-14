angular.module('vk-api-angular').directive('vkCommunity', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--community" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.Community(scope.id, {
        width: attrs.width,
        height: attrs.height,
        mode: attrs.mode,
        no_cover: attrs.no_cover,
        wide: attrs.wide,
        color1: attrs.color1,
        color2: attrs.color2,
        color3: attrs.color3
      }, attrs.groupId);
    }
  };
});
