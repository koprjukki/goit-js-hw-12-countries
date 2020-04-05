import "./styles.css";
import fetchCountries from "./js/fetchCountries";
import "../node_modules/@pnotify/core/dist/BrightTheme.css";
import PNotify from "../node_modules/@pnotify/core/dist/PNotify.js";
import template from "./template/template.hbs";
const debounce = require("lodash.debounce");

const refs = {
    input: document.querySelector("#js-countryfinder"),
    countryList: document.querySelector("#js-country-ul"),
    countryInfo: document.querySelector("#js-country-info"),
};

const baseUrl = "https://restcountries.eu/rest/v2/name/";

function inputSubmit() {
    fetchCountries(baseUrl, `${refs.input.value}`, inputSearchHandler);
}

function inputSearchHandler(data) {
    if (data.length >= 10) {
        soMuchCountries();
    } else if (data.length > 1) {
        countriesListDrowToHTML(data);
    } else {
        createCountryMarkup(data[0]);
    }
}

function soMuchCountries() {
    clearOutput();
    PNotify.error({
        title: "Error!",
        text: "To many matches found!",
    });
}

function countriesListDrowToHTML(drowCountries) {
    clearOutput();
    const markup = drowCountries
        .map(({
            name
        }) => `<li class="list__item">${name}</li>`)
        .join("");

    refs.countryList.insertAdjacentHTML("beforeend", markup);
}

refs.input.addEventListener("input", debounce(inputSubmit, 500));

function createCountryMarkup(country) {
    clearOutput();
    creatMarkup(country);
}

function creatMarkup(Elem) {
    const markup = template(Elem);
    refs.countryInfo.insertAdjacentHTML("beforeend", markup);
}

function clearOutput() {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
}