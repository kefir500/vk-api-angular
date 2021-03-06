angular.module('vk-api-angular').directive('vkLike', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget vk-widget--like" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.Like(scope.id, {
        type: attrs.type,
        width: attrs.width,
        height: attrs.height,
        verb: attrs.verb,
        pageTitle: attrs.pageTitle,
        pageUrl: attrs.pageUrl,
        pageImage: attrs.pageImage
      }, attrs.page_id);
    }
  };
});
