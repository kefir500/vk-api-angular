# VK API Angular

[![Build Status](https://travis-ci.org/kefir500/vk-api-angular.svg)](https://travis-ci.org/kefir500/vk-api-angular)
[![Codecov](https://codecov.io/gh/kefir500/vk-api-angular/coverage.svg)](https://codecov.io/gh/kefir500/vk-api-angular)

VK Open API wrapper for AngularJS.

- Supports [VK API methods](https://vk.com/dev/methods) via AngularJS service.
- Supports [VK widgets](https://vk.com/dev/sites) via AngularJS directives.
- Replaces callbacks with promises.

#### VK API (service)

    VKApi.Api.call('users.get').then(
      function (response) {
        alert('Hello, ' + response[0].first_name + '!');
      }
    );

#### VK Widgets (directives)

##### VK *Comments* Widget

    <vk-comments></vk-comments>

##### VK *Community* Widget

    <vk-community></vk-community>

##### VK *Contact Us* Widget

    <vk-contact></vk-contact>

##### VK *Like* Widget

    <vk-like></vk-like>

##### VK *Post* Widget

    <vk-post></vk-post>

##### VK *Share* Widget

    <vk-share></vk-share>
