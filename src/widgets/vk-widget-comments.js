angular.module('vk-api-angular').directive('vkComments', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget vk-widget--comments" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.Comments(scope.id, {
        width: attrs.width,
        height: attrs.height,
        limit: attrs.limit,
        attach: attrs.attach,
        autoPublish: attrs.autoPublish,
        mini: attrs.mini,
        norealtime: attrs.norealtime,
        pageUrl: attrs.pageUrl
      }, attrs.page_id);
    }
  };
});
