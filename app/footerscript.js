//隱藏內容在欄位裡過多
$('tr').on('click', function () {
    if ($(this).find('td').css('word-break') == 'normal') {
        $(this).find('td').css({//可以改變多個css
            "word-break": "break-all",
            'white-space': 'normal'

        })
    } else {
        $(this).find('td').css({
            "word-break": "normal",
            'white-space': 'nowrap'
        })
    }
})


//讀取餐點食材下拉選單
var ingredientsJS = function () {
    $.ajax("./Jsontest.json")//toarry
        .done(function (index) {
            for (var meal of index) {
                console.log($('#mealIngredients').val())
                $('#mealIngredients').append(
                    `<option value = "${meal.INGREDIENT_NAME}">`
                )


            }
        })
        .fail(function () {
            alert("error");
        })
}();

//新增欄位
function ingredientsAppendBtn() {

    $('#addIngredients').append(
        `<li>` +
        `${document.getElementById('examIngredients').innerHTML}` +
        `</li>`
    );
}


//刪除欄位
function ingredientsDelBtn() {
    var rows = $('#addIngredients li');
  if ( rows.length > 1 ) {
    // change: work on filtered jQuery object
    rows.filter(":last").html('');
    $('#addIngredients :last').remove();
} else {
    alert('Cannot remove any more rows');
  }

}


//計算營養成份表
function ingredientsOPA() {
    $.ajax("./Jsontest.json")//toarry
        .done(function (index) {
            var ingredientsname = document.getElementsByName('ingredientsName');
            var ingredientsgrams = document.getElementsByName('ingredientsGrams');
            var calorietot = 0;
            var carbtot = 0;
            var fattot = 0;
            var proteintot = 0;
            for (var i = 0; i < ingredientsname.length; i++) {
                if (ingredientsname[i].value != "" && ingredientsgrams[i].value != "") {
                    var calorie;
                    var carb;
                    var fat;
                    var protein;
                    for (var a of index) {
                        if (ingredientsname[i].value == a.INGREDIENT_NAME) {
                            calorie = a.CALORIE;
                            carb = a.CARB;
                            fat = a.FAT;
                            protein = a.PROTEIN;
                            var inputgrams = Number(ingredientsgrams[i].value);

                            calorietot += calorie;
                            carbtot += carb;
                            fattot += fat;
                            proteintot += protein;

                            var caloriefloat =parseFloat((inputgrams * calorietot).toFixed(2));
                            var carbfloat = parseFloat((inputgrams * carbtot).toFixed(2));
                            var fatfloat = parseFloat((inputgrams * fattot).toFixed(2));
                            var proteintfloat = parseFloat((inputgrams * proteintot).toFixed(2));
                        }
                    }
                    $('#nutritionOperation').html(
                        "<hr>熱量:" + `${caloriefloat}` +
                        "(kcal)<br>碳水化合物:" + `${carbfloat}` +
                        "(g)<br>脂肪:" + `${fatfloat}` +
                        "(g)<br>蛋白質:" + `${proteintfloat}` + "(g)");
                }else{
                    alert("請輸入完整資訊");
                    $('#nutritionOperation').html(
                        "<hr>");
                        break;
                }
            }

        })
        .fail(function () {
            alert("error");
        })
}
