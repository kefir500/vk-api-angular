angular.module('vk-api-angular').directive('vkShare', function () {
  return {
    restrict: 'AEC',
    scope: {},
    link: function (scope, element, attrs) {
      var types = ['round', 'round_nocount', 'button', 'button_nocount', 'link', 'link_noicon', 'custom'];
      if (attrs.type && types.indexOf(attrs.type) === -1) {
        console.warn('VK API Angular (Share Widget): Unknown button type "' + attrs.type + '". Available types: ' + types.join(', '));
      }
      element.html(
        VK.Share.button({
          url: attrs.url,
          title: attrs.title,
          image: attrs.image,
          noparse: attrs.noparse,
          no_vk_links: attrs.no_vk_links
        }, {
          type: attrs.type || 'round',
          text: attrs.text
        })
      );
    }
  };
});
