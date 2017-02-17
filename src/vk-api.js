var app = angular.module('vk-api-angular', []);

app.factory('VKApi', function ($q, $timeout) {

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
            reject('VK API Angular (VK Api Call): Timeout');
          }, 5000);
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
      }
    }
  };
});
