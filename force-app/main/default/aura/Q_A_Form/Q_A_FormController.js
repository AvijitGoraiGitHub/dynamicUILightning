({
    doInit: function (component, event, helper) {
        //data received from web service (JSON)
        //for demo I have omitted web service call
        //this is the JSON equivalent data of Object format
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
        const cmps = component.find("fieldId");
        if (!cmps) return;
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
            let answersMap = new Map();
            cmps.forEach(function (cmp) {
                let selected = cmp.get("v.fieldValue");
                answersMap.set(cmp.get("v.questionId"), selected === undefined ? "" : selected);
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