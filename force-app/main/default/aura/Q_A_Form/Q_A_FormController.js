({
    //Q_A_FormController.js

    doInit: function (component, event, helper) {
        //data received from web service (JSON) - to keep this demo simple, I have omitted Webservice call
        //this is the JSON equivalent data in Object format
        var questions = [];
        var qaData = new Object();
        qaData.questionId = "Q0001";
        qaData.question = "How many tickets do you have?";
        qaData.required = true;
        qaData.questionDisplayType = "PICKLIST";
        qaData.answerChoices = ["1", "2", "3"];
        questions.push(qaData);

        qaData = new Object();
        qaData.questionId = "Q00002";
        qaData.question = "What is your real name?";
        qaData.required = false;
        qaData.readonly = false;
        qaData.questionDisplayType = "TEXT";
        questions.push(qaData);

        qaData = new Object();
        qaData.questionId = "Q00003";
        qaData.question = "What is your favorite color?";
        qaData.required = true;
        qaData.readonly = false;
        qaData.questionDisplayType = "RADIOGROUP";
        qaData.answerChoices = ["Red", "Blue", "Yellow", "Green"];
        questions.push(qaData);

        qaData = new Object();
        qaData.questionId = "Q00004";
        qaData.question = "Select countries you've visited";
        qaData.required = true;
        qaData.readonly = false;
        qaData.questionDisplayType = "CHECKBOXGROUP";
        qaData.answerChoices = ["India", "USA", "UK"];
        questions.push(qaData);
        console.log(questions);

        console.log(JSON.stringify(questions));
        component.set("v.questionAnswerMap", questions);
    },

    submit: function (component, event, helper) {
        var requiredMissing = false;
        //finding list of rendered component based upon aura id = fieldId. This will give us a array of component
        const cmps = component.find("fieldId"); 
        if (!cmps) return;
        //looping through to check if current component's value is required but input value has not been provided
        //then calling checkReportValidity aura method to check its input validaty and show message accordingly
        cmps.forEach(function (cmp) {
            let selectedVal = cmp.get("v.fieldValue");
            console.log(cmp.get("v.questionId") + " -- " + selectedVal);
            if (cmp.get("v.required") && (!selectedVal || selectedVal.length == 0)) {
                requiredMissing = true;
                cmp.checkReportValidity();
                console.log("Required field is missing for " + cmp.get("v.questionId"));
            }
        });

        if (requiredMissing) {
            console.log("requireFieldMissing");
        } else {
            //all fine then collecting input value from each of components and added to a Map for further use as per business need
            let answersMap = new Map();
            cmps.forEach(function (cmp) {
                let fieldValue = cmp.get("v.fieldValue");
                answersMap.set(cmp.get("v.questionId"), fieldValue === undefined ? "" : fieldValue);
            });
            
            console.log("answersMap --> ", answersMap);

            let successMapStr = JSON.stringify(Object.fromEntries(answersMap.entries()));
            let successMsg = "Success :: " + successMapStr;
            helper.showTosteMessage(
                component,
                "",
                "success",
                successMsg,
                "dismissible"
            );
        }
    }
});