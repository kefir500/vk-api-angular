describe('VK widgets', function () {

  beforeEach(module('vk-api-angular'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('call VK.Widgets.Comments()', inject(function () {
    var spy = spyOn(VK.Widgets, 'Comments');
    $compile('<vk-comments></vk-comments>')($rootScope);
    $rootScope.$digest();
    expect(spy).toHaveBeenCalled();
  }));

  it('call VK.Widgets.Community()', inject(function () {
    spyOn(VK.Widgets, 'Community');
    $compile('<vk-community></vk-community>')($rootScope);
    $rootScope.$digest();
    expect(VK.Widgets.Community).toHaveBeenCalled();
  }));

  it('call VK.Widgets.ContactUs()', inject(function () {
    spyOn(VK.Widgets, 'ContactUs');
    $compile('<vk-contact></vk-contact>')($rootScope);
    $rootScope.$digest();
    expect(VK.Widgets.ContactUs).toHaveBeenCalled();
  }));

  it('call VK.Widgets.Like()', inject(function () {
    spyOn(VK.Widgets, 'Like');
    $compile('<vk-like></vk-like>')($rootScope);
    $rootScope.$digest();
    expect(VK.Widgets.Like).toHaveBeenCalled();
  }));

  it('call VK.Widgets.Post()', inject(function () {
    spyOn(VK.Widgets, 'Post');
    $compile('<vk-post></vk-post>')($rootScope);
    $rootScope.$digest();
    expect(VK.Widgets.Post).toHaveBeenCalled();
  }));

  it('call VK.Share.button()', inject(function () {
    spyOn(VK.Share, 'button');
    $compile('<vk-share></vk-share>')($rootScope);
    $rootScope.$digest();
    expect(VK.Share.button).toHaveBeenCalled();
  }));
});
