import {setColorGraph, initialilzeGraph} from "./drawGraph.js";
import {bindDataSendingButtons} from "./send_data.js";
import { BASE_URL } from "./constants.js";

const getCookie = name => {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i].trim().split('=')
      if (c[0] === name) {
        return decodeURIComponent(c[1])
      }
    }
    return ''
}

function checkTheme() {
    if (getCookie('theme') == 'dark-theme') {
        document.body.className = 'dark-theme';
        graphColor = 'white'
    } else {
        graphColor = 'blue';
        document.body.className = 'light-theme';
    }
}

function switchTheme() {
    if (getCookie('theme') == 'light-theme') {
        document.body.className = 'dark-theme';
        graphColor = 'white'
        document.cookie = 'theme=' + 'dark-theme';
        setColorGraph(graphColor);
    }
    else {
        document.body.className = 'light-theme';
        graphColor = 'blue';
        document.cookie = 'theme=' + 'light-theme';
        setColorGraph(graphColor);
    }    
}

function validateTextNumber(text) {
    const numberPattern = /^[+-]?(\d*[.,])?\d+$/;

    const number = parseFloat(text);
    if (Number.isNaN(number)
        || !numberPattern.test(text)) {
        return false;
    } else {
        return true;
    }
}

function validateNumber(number, start, finish) {
    return start <= number <= finish;
}

var graphColor = "";
console.log("It's working");
checkTheme();
initialilzeGraph(graphColor);
bindDataSendingButtons(BASE_URL);

const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
toggleSwitch.addEventListener('change', switchTheme, false);