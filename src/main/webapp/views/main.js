import {setColors, initialilzeGraph} from "./drawGraph.js";

var graphColor = "";
var graphPointColor = "";
const canvas = (document.getElementById("graph"));
const width = canvas.width;
const height = canvas.height;
const canvasR = width / 5;
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

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
        graphPointColor = 'red';
    } else {
        graphColor = 'blue';
        graphPointColor = '#2ff1c1';
        document.body.className = 'light-theme';
    }
}

function switchTheme() {
    if (getCookie('theme') == 'light-theme') {
        document.body.className = 'dark-theme';
        graphColor = 'white'
        graphPointColor = 'red';
        document.cookie = 'theme=' + 'dark-theme';
    }
    else {
        document.body.className = 'light-theme';
        graphColor = 'blue';
        graphPointColor = '#2ff1c1';
        document.cookie = 'theme=' + 'light-theme';
    }    
    setColors(graphColor, graphPointColor);
}

function convertXToRadiusOf(x, r) {
    return ((x - width / 2) / canvasR) * r;
}

function convertYToRadiusOf(y, r) {
    return ((height / 2 - y) / canvasR) * r;
}

function validateTextNumber(text) {
    const numberPattern = /^[+-]?(\d*[.])?\d+$/;

    const number = parseFloat(text);
    if (Number.isNaN(number)
        || !numberPattern.test(text)) {
        return false;
    } else {
        return true;
    }
}

function validateNumber(number, start, finish) {
    return start <= number && number <= finish;
}

function checkMyForm(event) {
    console.log("checkMyForm");
    document.getElementById('warning').innerHTML = "";
    if (validateTextNumber($("#input_y").val()) && validateNumber(parseFloat($("#input_y").val()), -5, 3)
    && validateTextNumber($("#input_r").val()) && validateNumber(parseFloat($("#input_r").val()), 2, 5)) {
        return true;
    } else {
        if (!(validateTextNumber($("#input_y").val()) && validateNumber(parseFloat($("#input_y").val()), -5, 3))) {
            document.getElementById("warning").innerHTML = "Please, enter rigth value for Y";
        } else {
            document.getElementById("warning").innerHTML = "Please, enter rigth value for R";
        }
        return false;
    }
}

checkTheme();
initialilzeGraph(graphColor, graphPointColor);
document.getElementById("form").addEventListener("submit", checkMyForm);
toggleSwitch.addEventListener('change', switchTheme, false);

canvas.onmousedown = function(event) {
    document.getElementById('warning').innerHTML = "";

    if (!validateTextNumber($("#input_r").val()) || !validateNumber(parseFloat($("#input_r").val()), 2, 5)) {
        document.getElementById("warning").innerHTML = "Please, enter rigth value for R";
        return;
    }

    const r = parseFloat($("#input_r").val());
    const x = convertXToRadiusOf(event.offsetX, r).toFixed(3);
    const y = convertYToRadiusOf(event.offsetY, r).toFixed(3);

    if (!validateNumber(parseFloat(y), -5, 3)) {
        document.getElementById("warning").innerHTML = "Please, click on rigth value for Y";
        return;
    } else if (!validateNumber(parseFloat(x), -5, 3)) {
        document.getElementById("warning").innerHTML = "Please, click on rigth value for X";
        return;
    }
    document.getElementById("x-10").value = x;
    document.getElementById("input_y").value = y;
    document.getElementById("x-10").click();
};

