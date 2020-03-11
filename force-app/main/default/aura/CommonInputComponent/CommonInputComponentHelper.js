({
    //CommonInputComponentHelper.js
    
    //setting metadata (options to select) 
    setFieldMetadata: function (component, event) {

        var fieldMetadata = new Object();

        fieldMetadata.questionDisplayType = component.get('v.questionDisplayType');

        if (fieldMetadata.questionDisplayType === 'TEXT') {
            fieldMetadata.maxLength = 180;
        }

        if (fieldMetadata.questionDisplayType === 'PICKLIST' ||
            fieldMetadata.questionDisplayType === 'RADIOGROUP' ||
            fieldMetadata.questionDisplayType === 'CHECKBOXGROUP') {
            //console.log('answerChoices -> ' + component.get('v.answerChoices'));
            var answerChoices = component.get('v.answerChoices');
            if (answerChoices) {
                console.log(answerChoices);
                var result = [];
                if (fieldMetadata.questionDisplayType !== 'RADIOGROUP' && fieldMetadata.questionDisplayType !== 'CHECKBOXGROUP') {
                    result.push({label: '', value: ''}); //inserting blank option
                }
                for (var i in answerChoices) {
                    result.push({
                        label: answerChoices[i],
                        value: answerChoices[i]
                    });
                }
                fieldMetadata.picklistOptions = result;
                fieldMetadata.picklistOptions.sort((a, b) => (a.value > b.value) ? 1 : -1); //sorting
                component.set('v.picklistOptions', fieldMetadata.picklistOptions);
            }
        }
        component.set('v.fieldMetadata', fieldMetadata);
    },
	
    //onchange, assigning changed value to attribute 'fieldValue'. 
    //This is helpful to get/access value of the input component from parent component
    handleFieldValueChanged: function (component, event) {
        var newFieldValue = event.getParam('value') !== undefined ? event.getParam('value') : event.getSource().get('v.value');
        component.set('v.fieldValue', newFieldValue);
    }
})