;(function() {
"use strict";

var app = angular.module('vk-api-angular', []);

app.factory('VKApi', ['$q', '$timeout', function ($q, $timeout) {

  var apiTimeout = 5000;

  return {

    init: function (auth) {
      if (typeof auth === 'object') {
        VK.init(auth);
      } else {
        VK.init({apiId: auth});
      }
    },

    Auth: {
      login: function (permissions) {
        var scope = 0;
        if (permissions) {
          if (permissions.notify)        { scope += 1; }
          if (permissions.friends)       { scope += 2; }
          if (permissions.photos)        { scope += 4; }
          if (permissions.audio)         { scope += 8; }
          if (permissions.video)         { scope += 16; }
          if (permissions.offers)        { scope += 32; console.warn('The "offers" permission is outdated.'); }
          if (permissions.questions)     { scope += 64; console.warn('The "questions" permission is outdated.'); }
          if (permissions.pages)         { scope += 128; }
          if (permissions.links)         { scope += 256; }
          if (permissions.status)        { scope += 1024; }
          if (permissions.notes)         { scope += 2048; }
          if (permissions.messages)      { scope += 4096; console.warn('The "messages" permission is unavailable for non-standalone applications.'); }
          if (permissions.wall)          { scope += 8192; }
          if (permissions.ads)           { scope += 32768; }
          if (permissions.offline)       { scope += 65536; }
          if (permissions.docs)          { scope += 131072; }
          if (permissions.groups)        { scope += 262144; }
          if (permissions.notifications) { scope += 524288; }
          if (permissions.stats)         { scope += 1048576; }
          if (permissions.email)         { scope += 4194304; }
          if (permissions.market)        { scope += 134217728; }
        }
        return $q(function (resolve, reject) {
          VK.Auth.login(function (response) {
            if (response.session) {
              resolve(response);
            } else {
              reject(response);
            }
          }, scope);
        });
      },
      logout: function () {
        return $q(function (resolve) {
          VK.Auth.logout(function (response) {
            resolve(response);
          });
        });
      },
      revokeGrants: function () {
        return $q(function (resolve) {
          VK.Auth.revokeGrants(function (response) {
            resolve(response);
          });
        });
      },
      getLoginStatus: function () {
        return $q(function (resolve, reject) {
          VK.Auth.getLoginStatus(function (response) {
            if (response.session) {
              resolve(response);
            } else {
              reject(response);
            }
          });
        });
      },
      getSession: function () {
        return VK.Auth.getSession();
      }
    },

    Api: {
      call: function (method, params) {
        return $q(function (resolve, reject) {
          var timeout = $timeout(function () {
            reject('VK API Angular (API Call): Timeout');
          }, apiTimeout);
          VK.Api.call(method, params || {}, function (r) {
            $timeout.cancel(timeout);
            // istanbul ignore else
            if (r.hasOwnProperty('response')) {
              resolve(r.response);
            } else if (r.hasOwnProperty('error')) {
              reject(r.error);
            } else {
              reject(r);
            }
          });
        });
      },
      setTimeout: function (value) {
        apiTimeout = value;
      }
    }
  };
}]);

angular.module('vk-api-angular').directive('vkAllowMessagesFromCommunity', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--allow-messages-from-community" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.AllowMessagesFromCommunity(scope.id, {
        height: attrs.height
      }, attrs.groupId);
    }
  };
});

angular.module('vk-api-angular').directive('vkAuth', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--auth" data-ng-attr-id="{{::id}}"></div>',
    scope: {
      onAuth: '&'
    },
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.Auth(scope.id, {
        width: attrs.width,
        onAuth: scope.onAuth(),
        authUrl: attrs.authUrl
      });
    }
  };
});

angular.module('vk-api-angular').directive('vkComments', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--comments" data-ng-attr-id="{{::id}}"></div>',
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

angular.module('vk-api-angular').directive('vkCommunityMessages', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--community-messages" data-ng-attr-id="{{::id}}"></div>',
    scope: {
      onCanNotWrite: '&'
    },
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.CommunityMessages(scope.id, attrs.groupId, {
        onCanNotWrite: scope.onCanNotWrite(),
        welcomeScreen: attrs.welcomeScreen,
        expandTimeout: attrs.expandTimeout,
        expanded: attrs.expanded,
        widgetPosition: attrs.widgetPosition,
        buttonType: attrs.buttonType,
        disableButtonTooltip: attrs.disableButtonTooltip,
        tooltipButtonText: attrs.tooltipButtonText,
        disableNewMessagesSound: attrs.disableNewMessagesSound,
        disableExpandChatSound: attrs.disableExpandChatSound,
        disableTitleChange: attrs.disableTitleChange
      });
    }
  };
});

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

angular.module('vk-api-angular').directive('vkContactUs', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--contact-us" data-ng-attr-id="{{::id}}"></div>',
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

angular.module('vk-api-angular').directive('vkLike', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--like" data-ng-attr-id="{{::id}}"></div>',
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

angular.module('vk-api-angular').directive('vkPoll', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--poll" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.Poll(scope.id, {
        width: attrs.width,
        pageUrl: attrs.pageUrl
      }, attrs.pollId);
    }
  };
});

angular.module('vk-api-angular').directive('vkPost', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--post" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      if (!attrs.hash) {
        console.warn('VK API Angular (Post Widget): Hash is not specified.');
      }
      VK.Widgets.Post(scope.id, attrs.ownerId, attrs.postId, attrs.hash, {
        width: attrs.width
      });
    }
  };
});

angular.module('vk-api-angular').directive('vkRecommended', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--recommended" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.Recommended(scope.id, {
        limit: attrs.limit,
        max: attrs.max,
        period : attrs.period
      }, attrs.verb, attrs.sort, attrs.target);
    }
  };
});

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

angular.module('vk-api-angular').directive('vkSubscribe', function () {
  return {
    restrict: 'AEC',
    template: '<div class="vk-widget--subscribe" data-ng-attr-id="{{::id}}"></div>',
    scope: {},
    link: function (scope, element, attrs) {
      scope.id = attrs.elementId || 'vk-widget-' + scope.$id;
      VK.Widgets.Subscribe(scope.id, {
        mode: attrs.mode,
        soft: attrs.soft
      }, attrs.ownerId);
    }
  };
});
}());
