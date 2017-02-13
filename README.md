# VK API Angular

[![Build Status](https://travis-ci.org/kefir500/vk-api-angular.svg)](https://travis-ci.org/kefir500/vk-api-angular)
[![Codecov](https://codecov.io/gh/kefir500/vk-api-angular/coverage.svg)](https://codecov.io/gh/kefir500/vk-api-angular)

VK Open API wrapper for AngularJS.

- Supports [VK API methods](https://vk.com/dev/methods) via AngularJS service.
- Supports [VK widgets](https://vk.com/dev/sites) via AngularJS directives.
- Replaces callbacks with promises.

### VK API (service)

```javascript
VKApi.Api.call('users.get').then(
  function (response) {
    alert('Hello, ' + response[0].first_name + '!');
  }
);
```

### VK Widgets (directives)

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
<vk-poll></vk-post>
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
