import {dots} from './drawGraph.js';

export function bindDataSendingButtons(/* clickSentCallback,*/ BASE_URL) {
    $("form").submit(function(e) {
        document.getElementById('warning').innerHTML = "";
        e.preventDefault();
        if (validateTextNumber($("#input_y").val()) && validateNumber(parseFloat($("#input_y").val()), -5, 3)
            && validateTextNumber($("#input_r").val()) && validateNumber(parseFloat($("#input_r").val()), 2, 5)) {
            let x = parseFloat(document.activeElement['value']);
        $.ajax({
            url: BASE_URL + "?" +  $("#form").serialize() + "&x=" + x,
            type: "get",
            success: function(response) {
                console.log("Goog job");
                dots.push($("form").serialize());
            },
            error: function(xhr) {
                console.log("Error");
            }
          });
        } else {
            if (!(validateTextNumber($("#input_y").val()) && validateNumber(parseFloat($("#input_y").val()), -5, 3))) {
                document.getElementById("warning").innerHTML = "Please, enter rigth value for Y";
            } else {
                console.log($("form").serialize());
                document.getElementById("warning").innerHTML = "Please, enter rigth value for R";
            }
        }
        });

    const canvas = (document.getElementById("graph"));
    const width = canvas.width;
    const height = canvas.height;
    const rValue = width / 2.5

    canvas.onmousedown = function(event) {
        document.getElementById('warning').innerHTML = "";

        if (!validateTextNumber($("#input_r").val()) || !validateNumber(parseFloat($("#input_r").val()), 2, 5)) {
            document.getElementById("warning").innerHTML = "Please, enter rigth value for R";
            return;
        }
        const r = parseFloat($("#input_r").val());
        const x = convertXToRadiusOf(event.offsetX, r);
        const y = convertYToRadiusOf(event.offsetY, r);

        $.ajax({
            url: BASE_URL + "?" + "x=" + x + "&y=" + y + "&r=" + r,
            type: "get",
            success: function(response) {
                console.log("Goog job");
                dots.push($("form").serialize());
            },
            error: function(xhr) {
            console.log("Error");
            }
          });
    };

    function convertXToRadiusOf(x, r) {
        return ((x - width / 2) / rValue) * r;
    }

    function convertYToRadiusOf(y, r) {
        return ((height - y - height / 2) / rValue) * r;
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
        return start <= number && number <= finish;
    }
}
