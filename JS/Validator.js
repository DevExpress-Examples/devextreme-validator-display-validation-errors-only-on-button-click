/// <reference path="C:/Program Files (x86)/DevExpress 16.1/DevExtreme/Sources/Lib/ts/jquery.d.ts" />
/// <reference path="C:/Program Files (x86)/DevExpress 16.1/DevExtreme/Sources/Lib/ts/dx.all.d.ts" />

$(function () {
    var maxDate = new Date();
    maxDate.setYear(maxDate.getYear() - 21);
    var forceValidationBypass = true;
    function validateAndSubmit(params) {
        forceValidationBypass = false;
        var result = params.validationGroup.validate();
        if (result.isValid) {
            DevExpress.ui.notify({
                message: "You have submitted the form",
                position: {
                    my: "center top",
                    at: "center top"
                }
            }, "success", 3000);

        }
        forceValidationBypass = true;
    }
    function extendDefaultValidator(e) {
        var defaultAdapter = e.component.option("adapter");
        var newAdapter = $.extend(
            {},
            defaultAdapter,
            {
                bypass: function () {
                    console.log("here");
                    return forceValidationBypass || this.editor.option("disabled");
                }
            })

        e.component.option("adapter", newAdapter);

    }
    $("#summary").dxValidationSummary({});

    $("#name-validation").dxTextBox({
        value: "Peter"
    }).dxValidator({
        onInitialized: extendDefaultValidator,
        validationRules: [{
            type: "required",
            message: "Name is required"
        }, {
            type: "pattern",
            pattern: /^[a-zA-Z\s]+$/,
            message: "Do not use digits in the Name."
        }, {
            type: "pattern",
            pattern: "^.{2,}$",
            message: "Name must have at least 2 symbols"
        }]
    });

    $("#date-validation").dxDateBox({
        invalidDateMessage: "The date must have the following format: MM/dd/yyyy"
    }).dxValidator({
        onInitialized: extendDefaultValidator,
        validationRules: [{
            type: "required",
            message: "Date of birth is required"
        }, {
            type: "range",
            max: maxDate,
            message: "You must be at least 21 years old"
        }]
    });

    $("#country-validation").dxSelectBox({
        dataSource: countries
    }).dxValidator({
        onInitialized: extendDefaultValidator,
        validationRules: [{
            type: "required",
            message: "Country is required"
        }]
    });

    $("#city-validation").dxTextBox({})
        .dxValidator({
            onInitialized: extendDefaultValidator,
            validationRules: [{
                type: "required",
                message: "City is required"
            }, {
                type: "pattern",
                pattern: "^[a-zA-Z]+$",
                message: "Do not use digits in the City name."
            }, {
                type: "pattern",
                pattern: "^.{2,}$",
                message: "City must have at least 2 symbols"
            }]
        });

    $("#zip-code-validation").dxNumberBox({
        value: 11111
    }).dxValidator({
        onInitialized: extendDefaultValidator,
        validationRules: [{
            type: "required",
            message: "Zip code is required"
        }, {
            type: "stringLength",
            min: 5,
            max: 10,
            message: "Zip code can not be less than 5 or greater than 10 digits"
        }]
    });

    $("#address-validation").dxTextBox({})
        .dxValidator({
            onInitialized: extendDefaultValidator,
            validationRules: [{
                type: "required",
                message: "Address is required"
            }]
        });

    $("#phone-validation").dxTextBox({})
        .dxValidator({
            onInitialized: extendDefaultValidator,
            validationRules: [{
                type: "pattern",
                pattern: /^\+\s*\d\s*\(\s*\d{3}\)\s*\d{3}\s*-\s*\d{2}\s*-\s*\d{2}$/,
                message: "The phone must have the following format: +0(000)000-00-00"
            }]
        });

    $("#check").dxCheckBox({
        value: false,
        text: "I agree to the Terms and Conditions"
    }).dxValidator({
        validationRules: [{
            type: "compare",
            comparisonTarget: function () { return true; },
            message: "You must agree to the Terms and Conditions"
        }]
    });

    $("#button").dxButton({
        text: "Submit",
        type: "success",
        onClick: validateAndSubmit
    });

});