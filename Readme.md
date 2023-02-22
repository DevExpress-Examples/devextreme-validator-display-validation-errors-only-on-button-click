<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/128584732/16.1.6%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T451354)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->

#  DevExtreme Validator - How to display validation errors only on a button click

This example illustrates how to avoid validating an editor after its value was changed. Validation is performed on a button click only. The main idea is to extend the default adapter and override the <a href="https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxValidator/Configuration/adapter/#bypass">bypass</a> function to complete this task. For this, create a global variable to determine if validation was raised on a button click.<br>

<!-- run online -->
**[[Run Online]](https://codecentral.devexpress.com/128584732/)**
<!-- run online end -->

<div align="center"><img alt="DevExtreme Validator - How to display validation errors only on a button click" src="validator_after_submit.png" /></div>

## Files to Review

- **JS**
    - [Validator.js](./JS/Validator.js)

## Documentation

- [Validator - API Reference](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxValidator/)
