const countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'The Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Democratic Republic of the Congo', 'Republic of the Congo', 'Costa Rica', 'Ivory Coast', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Republic of Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea', 'South Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Republic of Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Federated States of Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Kingdom of the Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'State of Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];

$(() => {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 21);
  let forceValidationBypass = true;

  function validateAndSubmit(params) {
    forceValidationBypass = false;
    const result = params.validationGroup.validate();
    if (result.isValid) {
      DevExpress.ui.notify({
        message: 'You have submitted the form',
        position: {
          my: 'center top',
          at: 'center top',
        },
      }, 'success', 3000);
    }
    forceValidationBypass = true;
  }

  function extendDefaultValidator(e) {
    const defaultAdapter = e.component.option('adapter');
    const newAdapter = Object.create(defaultAdapter);
    newAdapter.bypass = function () {
      return forceValidationBypass || this.editor.option('disabled');
    };
    e.component.option('adapter', newAdapter);
  }

  $('#summary').dxValidationSummary({});

  $('#name-validation').dxTextBox({
    value: 'Peter',
  }).dxValidator({
    onInitialized: extendDefaultValidator,
    validationRules: [{
      type: 'required',
      message: 'Name is required',
    }, {
      type: 'pattern',
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Do not use digits in the Name.',
    }, {
      type: 'pattern',
      pattern: '^.{2,}$',
      message: 'Name must have at least 2 symbols',
    }],
  });

  $('#date-validation').dxDateBox({
    invalidDateMessage: 'The date must have the following format: MM/dd/yyyy',
  }).dxValidator({
    onInitialized: extendDefaultValidator,
    validationRules: [{
      type: 'required',
      message: 'Date of birth is required',
    }, {
      type: 'range',
      max: maxDate,
      message: 'You must be at least 21 years old',
    }],
  });

  $('#country-validation').dxSelectBox({
    dataSource: countries,
  }).dxValidator({
    onInitialized: extendDefaultValidator,
    validationRules: [{
      type: 'required',
      message: 'Country is required',
    }],
  });

  $('#city-validation').dxTextBox({})
    .dxValidator({
      onInitialized: extendDefaultValidator,
      validationRules: [{
        type: 'required',
        message: 'City is required',
      }, {
        type: 'pattern',
        pattern: '^[a-zA-Z]+$',
        message: 'Do not use digits in the City name.',
      }, {
        type: 'pattern',
        pattern: '^.{2,}$',
        message: 'City must have at least 2 symbols',
      }],
    });

  $('#zip-code-validation').dxNumberBox({
    value: 11111,
  }).dxValidator({
    onInitialized: extendDefaultValidator,
    validationRules: [{
      type: 'required',
      message: 'Zip code is required',
    }, {
      type: 'stringLength',
      min: 5,
      max: 10,
      message: 'Zip code can not be less than 5 or greater than 10 digits',
    }],
  });

  $('#address-validation').dxTextBox({})
    .dxValidator({
      onInitialized: extendDefaultValidator,
      validationRules: [{
        type: 'required',
        message: 'Address is required',
      }],
    });

  $('#phone-validation').dxTextBox({})
    .dxValidator({
      onInitialized: extendDefaultValidator,
      validationRules: [{
        type: 'pattern',
        pattern: /^\+\s*\d\s*\(\s*\d{3}\)\s*\d{3}\s*-\s*\d{2}\s*-\s*\d{2}$/,
        message: 'The phone must have the following format: +0(000)000-00-00',
      }],
    });

  $('#check').dxCheckBox({
    value: false,
    text: 'I agree to the Terms and Conditions',
  }).dxValidator({
    validationRules: [{
      type: 'compare',
      comparisonTarget() { return true; },
      message: 'You must agree to the Terms and Conditions',
    }],
  });

  $('#button').dxButton({
    text: 'Submit',
    type: 'success',
    onClick: validateAndSubmit,
  });
});
