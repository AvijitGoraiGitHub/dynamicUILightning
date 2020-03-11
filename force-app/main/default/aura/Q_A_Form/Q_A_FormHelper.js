({
  showTosteMessage: function(component, title, type, message, mode) {
    var toastEvent = $A.get("e.force:showToast");
    if (toastEvent) {
      toastEvent.setParams({
        title: title,
        type: type,
        message: message,
        mode: mode
      });
      toastEvent.fire();
    }
    // if not running in LEX or SF1, toast is not available - use alert
    else {
      alert(title + ": " + message);
    }
  }
});