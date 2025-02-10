"use strict";

const $ = selector => document.querySelector(selector);

const USDollar = new Intl.NumberFormat("en-US", { style:"currency", currency:"USD"});

const getErrorMsg = lbl => `${lbl} must be a valid number greater than zero.`;
const getErrorMsgTax = lbl => `${lbl} must be a valid number greater than zero and less than 100.`;

const focusAndSelect = selector => {
    const elem = $(selector);
    elem.focus();
    elem.select();
};

const processEntries = () => {
    const sale = parseFloat($("#sale").value);
    const tax = parseFloat($("#tax").value);

    if (isNaN(sale) || sale <= 0) {
        alert(getErrorMsg("Sale Amount"));
        focusAndSelect("#sale");
    } else if (isNaN(tax) || tax <= 0 || tax >= 100) {
        alert(getErrorMsgTax("Tax Percent"));
        focusAndSelect("#tax");
    } else {
        $("#total").value = USDollar.format(sale + calculateTax(sale, tax)); 
    }
};

const calculateTax = (subtotal, taxRate) => {
    const taxAmount = subtotal * taxRate/100; 
    return taxAmount; 
};

var clearEntries = () => {
    $("#sale").value = "";
    $("#tax").value = "";
    $("#total").value = "";
};

document.addEventListener("DOMContentLoaded", () => {
    $("#calculate").addEventListener("click", processEntries);
    $("#sale").focus();
});
