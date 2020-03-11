({
    //CommonInputComponentController.js
    
    doInit: function (component, event, helper) {
        helper.setFieldMetadata(component, event);
    },
    handleFieldValueChanged: function (component, event, helper) {
        helper.handleFieldValueChanged(component, event);
    },
    //Shows the help message if the form control is in an invalid state.
    showReportValidity: function (component, event, helper) {
        component.find("inputField").showHelpMessageIfInvalid();
    }
});