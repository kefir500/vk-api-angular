var demo = angular.module('vk-api-angular-demo', ['vk-api-angular', 'ngAnimate']);

demo.controller('DemoController', function ($scope) {

  $scope.widgets = [
    {title: 'Allow Messages from Community', html: '<vk-allow-messages-from-community group-id="127607773"></vk-allow-messages-from-community>'},
    {title: 'Auth', html: '<vk-auth on-auth="onAuth" width="280"></vk-auth>', js: '$scope.onAuth = function (data) {\n  alert(\'Hello, \' + data.first_name);\n}'},
    {title: 'Comments', html: '<vk-comments></vk-comments>'},
    {title: 'Community', html: '<vk-community group-id="147845620"></vk-community>'},
    {title: 'Community Messages', html: '<vk-community-messages group-id="127607773"></vk-community-messages>', html2: '<i>The widget is rendered in the bottom right corner.</i>'},
    {title: 'Contact Us', html: '<vk-contact-us owner-id="-20003922"></vk-contact-us>'},
    {title: 'Like', html: '<vk-like></vk-like>'},
    {title: 'Poll', html: '<vk-poll poll-id="255718325_4214b26fdff148aef0"></vk-poll>'},
    {title: 'Post', html: '<vk-post owner-id="1" post-id="549734" hash="W9KumhHBb2MD44NeokKOA4PmVETY"></vk-post>'},
    {title: 'Recommended', html: '<vk-recommended></vk-recommended>'},
    {title: 'Share', html: '<vk-share></vk-share>'},
    {title: 'Subscribe', html: '<vk-subscribe owner-id="1"></vk-subscribe>'}
  ];

  $scope.onAuth = function (data) {
    alert('Hello, ' + data.first_name + '!');
  };

  $scope.includes = {
    api: true,
    widgets: true,
    share: false
  };
});

demo.filter('underscore', function () {
  return function(input) {
    return input.toLowerCase().replace(/ /g, '_');
  };
});

demo.directive('compileHtml', function ($compile, $timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $timeout(function () {
      scope.$watch(
        function (scope) {
          return scope.$eval(attrs.compileHtml);
        },
        function (value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
      );
      }, 2500);
    }
  };
});

demo.directive('smoothScroll', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.on('click', function () {
        var offset = $(element).data('anchor-offset') || -46;
        var target = $(element.attr('href'));
        $('html, body').animate({
          scrollTop: target.offset().top + offset
        });
        return false;
      });
    }
  }
});

demo.config(function (VKApiProvider) {
  VKApiProvider.init(6359520);
});

demo.run(function () {
  hljs.initHighlightingOnLoad();
});
