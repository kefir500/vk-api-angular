describe('VK API wrapper', function () {

  beforeEach(module('vk-api-angular'));

  beforeEach(function () {
    inject(function (_VKApi_, _$rootScope_) {
      VKApi = _VKApi_;
      $rootScope = _$rootScope_;
      VK.Test.error = false;
    });
  });

  it('calls VK.init()', function () {
    spyOn(VK, 'init');
    VKApi.init({});
    expect(VK.init).toHaveBeenCalled();
  });

  it('calls VK.Auth.login()', function () {
    spyOn(VK.Auth, 'login');
    VKApi.Auth.login();
    expect(VK.Auth.login).toHaveBeenCalled();
  });

  it('calls VK.Auth.logout()', function () {
    spyOn(VK.Auth, 'logout');
    VKApi.Auth.logout();
    expect(VK.Auth.logout).toHaveBeenCalled();
  });

  it('calls VK.Auth.revokeGrants()', function () {
     spyOn(VK.Auth, 'revokeGrants');
    VKApi.Auth.revokeGrants();
    expect(VK.Auth.revokeGrants).toHaveBeenCalled();
  });

  it('calls VK.Auth.getLoginStatus()', function () {
    spyOn(VK.Auth, 'getLoginStatus');
    VKApi.Auth.getLoginStatus();
    expect(VK.Auth.getLoginStatus).toHaveBeenCalled();
  });

  it('calls VK.Auth.getSession()', function () {
    spyOn(VK.Auth, 'getSession');
    VKApi.Auth.getSession();
    expect(VK.Auth.getSession).toHaveBeenCalled();
  });

  it('handles object as an initialization argument', function () {
    spyOn(VK, 'init');
    VKApi.init({apiId: 1});
    expect(VK.init).toHaveBeenCalledWith({apiId: 1});
  });

  it('handles ID number as an initialization argument', function () {
    spyOn(VK, 'init');
    VKApi.init(1);
    expect(VK.init).toHaveBeenCalledWith({apiId: 1});
  });

  it('sets a single access permission', function () {
    var spy = spyOn(VK.Auth, 'login');
    VKApi.Auth.login({notify: true}); expect(spy.calls.mostRecent().args[1]).toEqual(1);
    VKApi.Auth.login({friends: true}); expect(spy.calls.mostRecent().args[1]).toEqual(2);
    VKApi.Auth.login({photos: true}); expect(spy.calls.mostRecent().args[1]).toEqual(4);
    VKApi.Auth.login({audio: true}); expect(spy.calls.mostRecent().args[1]).toEqual(8);
    VKApi.Auth.login({video: true}); expect(spy.calls.mostRecent().args[1]).toEqual(16);
    VKApi.Auth.login({offers: true}); expect(spy.calls.mostRecent().args[1]).toEqual(32);
    VKApi.Auth.login({questions: true}); expect(spy.calls.mostRecent().args[1]).toEqual(64);
    VKApi.Auth.login({pages: true}); expect(spy.calls.mostRecent().args[1]).toEqual(128);
    VKApi.Auth.login({links: true}); expect(spy.calls.mostRecent().args[1]).toEqual(256);
    VKApi.Auth.login({status: true}); expect(spy.calls.mostRecent().args[1]).toEqual(1024);
    VKApi.Auth.login({notes: true}); expect(spy.calls.mostRecent().args[1]).toEqual(2048);
    VKApi.Auth.login({messages: true}); expect(spy.calls.mostRecent().args[1]).toEqual(4096);
    VKApi.Auth.login({wall: true}); expect(spy.calls.mostRecent().args[1]).toEqual(8192);
    VKApi.Auth.login({ads: true}); expect(spy.calls.mostRecent().args[1]).toEqual(32768);
    VKApi.Auth.login({offline: true}); expect(spy.calls.mostRecent().args[1]).toEqual(65536);
    VKApi.Auth.login({docs: true}); expect(spy.calls.mostRecent().args[1]).toEqual(131072);
    VKApi.Auth.login({groups: true}); expect(spy.calls.mostRecent().args[1]).toEqual(262144);
    VKApi.Auth.login({notifications: true}); expect(spy.calls.mostRecent().args[1]).toEqual(524288);
    VKApi.Auth.login({stats: true}); expect(spy.calls.mostRecent().args[1]).toEqual(1048576);
    VKApi.Auth.login({email: true}); expect(spy.calls.mostRecent().args[1]).toEqual(4194304);
    VKApi.Auth.login({market: true}); expect(spy.calls.mostRecent().args[1]).toEqual(134217728);
  });

  it('sets multiple access permissions', function () {
    var spy = spyOn(VK.Auth, 'login');

    VKApi.Auth.login({friends: true, wall: true});
    expect(spy.calls.mostRecent().args[1]).toEqual(2 + 8192);

    VKApi.Auth.login({photos: true, audio: true, messages: true});
    expect(spy.calls.mostRecent().args[1]).toEqual(4 + 8 + 4096);

    VKApi.Auth.login({video: true, status: true, docs: true, groups: true, market: true});
    expect(spy.calls.mostRecent().args[1]).toEqual(16 + 1024 + 131072 + 262144 + 134217728);
  });

  it('handles successful log in', function (done) {
    VKApi.Auth.login().then(function () {
      done();
    }, function () {
      done.fail('Expected promise to be resolved.');
    });
    $rootScope.$digest();
  });

  it('handles unsuccessful log in', function (done) {
    VK.Test.error = true;
    VKApi.Auth.login().then(function () {
      done.fail('Expected promise to be rejected.');
    }, function () {
      done();
    });
    $rootScope.$digest();
  });

  it('handles successful log out', function (done) {
    VKApi.Auth.logout().then(function () {
      done();
    }, function () {
      done.fail('Expected promise to be resolved.');
    });
    $rootScope.$digest();
  });

  it('handles successful grants revocation', function (done) {
    VKApi.Auth.revokeGrants().then(function () {
      done();
    }, function () {
      done.fail('Expected promise to be resolved.');
    });
    $rootScope.$digest();
  });

  it('handles "connected" login status response', function (done) {
    VKApi.Auth.getLoginStatus().then(function () {
      done();
    }, function () {
      done.fail('Expected promise to be resolved.');
    });
    $rootScope.$digest();
  });

  it('handles "not connected" login status response', function (done) {
    VK.Test.error = true;
    VKApi.Auth.getLoginStatus().then(function () {
      done.fail('Expected promise to be rejected.');
    }, function () {
      done();
    });
    $rootScope.$digest();
  });

  it('handles successful API calls', function (done) {
    VKApi.Api.call('users.get').then(function () {
      done();
    }, function () {
      done.fail('Expected promise to be resolved.');
    });
    $rootScope.$digest();
  });

  it('handles unsuccessful API calls (invalid request)', function (done) {
    inject(function ($timeout) {
      VKApi.Api.call('nonexistent.method').then(function () {
        done.fail('Expected promise to be rejected.');
      }, function () {
        done();
      });
      $timeout.flush();
    })();
  });

  it('handles unsuccessful API calls (invalid response)', function (done) {
    VK.Test.error = true;
    VKApi.Api.call('users.get').then(function () {
      done.fail('Expected promise to be rejected.');
    }, function () {
      done();
    });
    $rootScope.$digest();
  });

});
