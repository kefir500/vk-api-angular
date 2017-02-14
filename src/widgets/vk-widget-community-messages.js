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
        onCanNotWrite: scope.onCanNotWrite,
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
