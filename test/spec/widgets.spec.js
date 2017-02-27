describe('VK widget', function () {

  beforeEach(module('vk-api-angular'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    VK.Test.error = false;
  }));

  describe('"Allow Messages from Community"', function () {
    it('calls VK.Widgets.AllowMessagesFromCommunity() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'AllowMessagesFromCommunity');
      $compile('<vk-allow-messages-from-community></vk-allow-messages-from-community>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('"Auth"', function () {

    it('calls VK.Widgets.Auth() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'Auth');
      $compile('<vk-auth></vk-auth>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });

    it('calls onAuth() callback', function () {
      $rootScope.callback = function () {};
      var spy = spyOn($rootScope, 'callback');
      $compile('<vk-auth on-auth="callback"></vk-auth>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalledWith(jasmine.any(Object));
    });

    it('redirects if no callback is passed', function () {
      $rootScope.callback = function () {};
      var spy = spyOn(VK.Test, 'redirect');
      var redirectUrl = 'http://google.com';
      $compile('<vk-auth auth-url="' + redirectUrl + '"></vk-auth>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalledWith(redirectUrl);
    });
  });

  describe('"Comments"', function () {
    it('calls VK.Widgets.Comments() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'Comments');
      $compile('<vk-comments></vk-comments>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('"Community"', function () {
    it('calls VK.Widgets.Community() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'Community');
      $compile('<vk-community></vk-community>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('"Community Messages"', function () {

    it('calls VK.Widgets.CommunityMessages() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'CommunityMessages');
      $compile('<vk-community-messages></vk-community-messages>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });

    it('calls onCanNotWrite() callback', function () {
      VK.Test.error = true;
      $rootScope.callback = function () {};
      var spy = spyOn($rootScope, 'callback');
      $compile('<vk-community-messages on-can-not-write="callback"></vk-community-messages>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalledWith(jasmine.any(String));
    });
  });

  describe('"Contact Us"', function () {
    it('calls VK.Widgets.ContactUs() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'ContactUs');
      $compile('<vk-contact-us></vk-contact-us>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('"Like"', function () {
    it('calls VK.Widgets.Like() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'Like');
      $compile('<vk-like></vk-like>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('"Poll"', function () {
    it('calls VK.Widgets.Poll() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'Poll');
      $compile('<vk-poll></vk-poll>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('"Post"', function () {

    it('calls VK.Widgets.Post() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'Post');
      $compile('<vk-post hash="hash"></vk-post>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });

    it('warns when the "hash" attribute is missing', function () {
      var spy = spyOn(console, 'warn');
      $compile('<vk-post></vk-post>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('"Recommended"', function () {
    it('calls VK.Widgets.Recommended() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'Recommended').and.callThrough();
      $compile('<vk-recommended></vk-recommended>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('"Share"', function () {

    it('calls VK.Share.button() Open API method', function () {
      var spy = spyOn(VK.Share, 'button');
      $compile('<vk-share></vk-share>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });

    it('warns when unsupported arguments are passed', function () {
      var spy = spyOn(console, 'warn');
      $compile('<vk-share data-type="nonexistent-type"></vk-share>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('"Subscribe"', function () {
    it('calls VK.Widgets.Subscribe() Open API method', function () {
      var spy = spyOn(VK.Widgets, 'Subscribe');
      $compile('<vk-subscribe></vk-subscribe>')($rootScope);
      $rootScope.$digest();
      expect(spy).toHaveBeenCalled();
    });
  });
});
