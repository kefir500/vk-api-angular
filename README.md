# VK API Angular

[![Build Status](https://travis-ci.org/kefir500/vk-api-angular.svg)](https://travis-ci.org/kefir500/vk-api-angular)
[![Codecov](https://codecov.io/gh/kefir500/vk-api-angular/coverage.svg)](https://codecov.io/gh/kefir500/vk-api-angular)
[![devDependencies Status](https://david-dm.org/kefir500/vk-api-angular/dev-status.svg)](https://david-dm.org/kefir500/vk-api-angular?type=dev)

VK Open API wrapper for AngularJS.

- Supports [VK API methods](https://vk.com/dev/methods) via AngularJS service.
- Supports [VK widgets](https://vk.com/dev/sites) via AngularJS directives.
- Replaces callbacks with promises.

## VK API (service)

You may **initialize** your VK application using the provider during the configuration phase:

```javascript
angular.module('my-app', ['vk-api-angular'])
  .config(function (VKApiProvider) {
    VKApiProvider.init(10000); // Your VK APP_ID
  });
```

VKApi factory duplicates the official VK Open API method naming, in particular:

- `VKApi.Api.call`
- `VKApi.Auth.login`
- `VKApi.Auth.logout`
- `VKApi.Auth.revokeGrants`
- `VKApi.Auth.getLoginStatus`
- `VKApi.Auth.getSession`

However, the promises are used instead of callbacks. This gives a better control over the success/error handling mechanism.

- [Methods List](https://vk.com/dev/methods)
- [Permissions List](https://vk.com/dev/permissions)

```javascript
// Log in and request the "photos" and "video" permissions.
// See https://vk.com/dev/permissions for the full permission list.

VKApi.Auth.login({
  photos: true,
  video: true
}).then(
  // Success:
  function (response) {
    var name = response.session.user.first_name;
    alert('Hello, ' + name + '!');
  },
  // Error:
  function (response) {
    alert('Sorry, access denied.');
    console.error(response);
  }
);
```

```javascript
// Call "users.get" API method.
// See https://vk.com/dev/methods for the full method list.

VKApi.Api.call('users.get').then(
  // Success:
  function (response) {
    var name = response[0].first_name;
    alert('Hello, ' + name + '!');
  },
  // Error:
  function (response) {
    alert('Sorry, could not fetch the user data.');
    console.error(response);
  }
);
```

## VK Widgets (directives)

#### VK *Allow Messages From Community* Widget

```xml
<vk-allow-messages-from-community group-id="ID"></vk-allow-messages-from-community>
```

#### VK *Auth* Widget

```xml
<vk-auth></vk-auth>
```

#### VK *Comments* Widget

```xml
<vk-comments></vk-comments>
```

#### VK *Community* Widget

```xml
<vk-community group-id="ID"></vk-community>
```

#### VK *Community Messages* Widget

```xml
<vk-community-messages group-id="ID"></vk-community-messages>
```

#### VK *Contact Us* Widget

```xml
<vk-contact-us owner-id="ID"></vk-contact-us>
```

#### VK *Like* Widget

```xml
<vk-like></vk-like>
```

#### VK *Poll* Widget

```xml
<vk-poll poll-id="POLL"></vk-poll>
```

#### VK *Post* Widget

```xml
<vk-post owner-id="ID" post-id="POST" hash="HASH"></vk-post>
```

#### VK *Recommended* Widget

```xml
<vk-recommended></vk-recommended>
```

#### VK *Share* Widget

```xml
<vk-share></vk-share>
```

#### VK *Subscribe* Widget

```xml
<vk-subscribe owner-id="ID"></vk-subscribe>
```
