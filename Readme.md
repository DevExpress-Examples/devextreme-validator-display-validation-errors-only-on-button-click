<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/128584732/16.1.6%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T451354)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
<!-- default file list -->
*Files to look at*:
<br/>
[Validator.js](https://github.com/DevExpress-Examples/dxvalidator-how-to-display-validation-errors-only-on-a-button-click-t451354/blob/16.1.6%2B/JS/Validator.js)

<!-- default file list end -->
#  dxValidator - How to display validation errors only on a button click
<!-- run online -->
**[[Run Online]](https://codecentral.devexpress.com/t451354/)**
<!-- run online end -->

<h3>Description</h3>

This example illustrates how to avoid validating an editor after its value was changed. Validation is performed on a button click only. The main idea is to extend the default adapter and override the  <a href="https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxValidator/Configuration/adapter/#bypass">bypass</a> function to complete this task. For this, create a global variable to determine if validation was raised on a button click.<br><br>You can find related code by clicking below the "Show Implementation Details" link .

```js

var forceValidationBypass = true;
function validateAndSubmit (params) {
    forceValidationBypass = false;
    var result = params.validationGroup.validate();
    if(result.isValid) {
        // submit data         
    }
    forceValidationBypass = true;
}

function extendDefaultValidator(e){
        var defaultAdapter = e.component.option("adapter");
        var newAdapter = $.extend(
            {},
            defaultAdapter,
            {
                bypass: function() {
                      console.log("here");
                     return forceValidationBypass || this.editor.option("disabled"); 
                }
            })
       
        e.component.option("adapter", newAdapter);

}

$("#name-validation").dxTextBox({
    value: "Peter"
}).dxValidator({
    onInitialized: extendDefaultValidator,
    validationRules:[....]
});

$("#button").dxButton({
    text: "Submit",
    type: "success",
    onClick: validateAndSubmit
});

```

<br/>


