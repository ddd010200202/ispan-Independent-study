import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBqQ5T0uy3_68BVFhfTqS98VNWUmgLkir0",
    authDomain: "orderhippo-store.firebaseapp.com",
    projectId: "orderhippo-store",
    storageBucket: "orderhippo-store.appspot.com",
    messagingSenderId: "777247881627",
    appId: "1:777247881627:web:6bc31c0a8fd80a4def493e"
};


// Initialize Firebase
initializeApp(firebaseConfig);

//setSignBntStatus()
setSignBntStatus()

function storeSignOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
        signOutOK();
    }).catch((error) => {
        console.error(error);
    });
}


function setSignBntStatus() {
    const auth = getAuth();
    // const signBnt = document.getElementById("signBnt");
    auth.onAuthStateChanged((store) => {
        if (!store) { // 沒有登入
            window.location.href = "login.html";
        }
    });
}

// signBnt.addEventListener("click", (e) => {

// });
/*------------榮庭--------------*/
$(document).ready(function () {

})

// 拿取Token跟id
// console.log(localStorage.getItem('storeToken'));
// console.log(JSON.parse(localStorage.getItem('storeinfo')).STORE_ID);
let newToken=localStorage.getItem('storeToken');
// localStorage.getItem('storeToken') == null ? function () { alert("請先登入"); window.location.href = "login.html" }() : newToken = localStorage.getItem('storeToken');
let storeId = JSON.parse(localStorage.getItem('storeinfo')).STORE_ID;

$("#switch")[0].checked = false;
function openSwitch(isOpen) {
    $.ajax({
        url: `http://localhost:8080/api/${storeId}/stores?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {

            console.log('status change ok')
            res[0].STORE_OPEN_STATUS = isOpen
            $.ajax({
                url: `http://localhost:8080/api/${storeId}/stores?token=${newToken}`,
                method: 'PUT',
                contentType: "application/json",
                data: JSON.stringify(res[0]),
                success: function () { },
                error: function () { }
            })
        },
        error: err => {
            console.log('status change fail')
            console.log(err)
        },
    }).fail(function () { });

}

document.getElementById("switch").addEventListener('click', () => {
    openSwitch($("#switch")[0].checked);
});
//登出按鍵
$('#signOutbtn').on('click', () => {
    storeSignOut();
    localStorage.removeItem("storeinfo");
    localStorage.removeItem("storeToken");
    window.location.href = "login.html";
})
// function signOutbtn() {

//     // $.ajax({
//     //     url: `http://localhost:8080/api/${storeId}/stores?token=${newToken}`,
//     //     method: 'GET',
//     //     success: (res, status) => {

//     //         console.log('status change ok')
//     //         res[0].STORE_OPEN_STATUS = false;
//     //         $.ajax({
//     //             url: `http://localhost:8080/api/${storeId}/stores?token=${newToken}`,
//     //             method: 'PUT',
//     //             contentType: "application/json",
//     //             data: JSON.stringify(res[0]),
//     //             success: function () {
//     //                 localStorage.removeItem("storeinfo");
//     //                 localStorage.removeItem("storeToken");
//     //                 window.location.href = "login.html"
//     //             },
//     //             error: function () { }

//     //         })
//     //     },
//     //     error: err => {
//     //         console.log(err)
//     //     },
//     // });


//     // $.ajax({
//     //     url: `http://localhost:8080/api/getToken/${storeId}`,
//     //     method: 'GET',
//     //     success: (res, status) => {
//     //         console.log("signOut success")

//     //     },
//     //     error: err => {
//     //         console.log("signOut fale")
//     //         console.log(err)
//     //     },
//     // });
// }
//首頁銷售前三
$.ajax({
    url: `http://localhost:8080/api/${storeId}/vsalerank?token=${newToken}`,
    method: 'GET',
    success: (res, status) => {

        console.log("vsalerankHomepage ok")
        // console.log(res)
        for (var salserank of res) {
            $('#vsalerankHomepage').append(
                '<li>' + `${salserank.mealname}` +":" + `${salserank.count}` + '</li>'
            )

        }
    },
    error: err => {
        console.log("vsalerankHomepage fale")
        console.log(err)
    },
});
//首頁移交情況
$.ajax({
    url: `http://localhost:8080/api/${storeId}/vorderstatuscount?token=${newToken}`,
    method: 'GET',
    success: (res, status) => {
        console.log(res)
        console.log("vorderstatuscountHomepage ok")
        for (var vorder of res) {
            $('#vorderstatuscountHomepage').append(
                '<li>' + `${vorder.orderstatusdesc}` + ":" + `${vorder.ordercount}` + '</li>'
            )

        }
    },
    error: err => {
        console.log("vorderstatuscountHomepage fale")
        console.log(err)
    },
});
//目前總營利
//分析資料-月營業額
//分析資料-年齡客群
//分析資料-類別圓餅
//分析資料-前10熱賣
//分析資料-男女比例
//訂單管理
$.ajax({})
//搜尋
$("#nutrientContentsearch").keyup(function () {
    //將輸入值轉為小寫去除空格
    var keyword = this.value.toLowerCase().trim();

    $("table tr").each(function (index) {
        if (!index) return;
        $(this).find("td").each(function () {
            var id = $(this).text().toLowerCase().trim();
            var unfound = (id.indexOf(keyword) == -1);
            //.closest由tr開始搜尋/tr結束
            //.toggle()=>hide()、show切換
            $(this).closest('tr').toggle(!unfound);
            return unfound;
        });
    });
});
//營養表格 菜單印出營養素 重點輸出  
$.ajax({
    url: `http://localhost:8080/api/${storeId}/ingredients?token=${newToken}`,
    method: 'GET',
    success: function (res, status) {

        console.log("nutrientTable ok")
        for (var nutrient of res) {
            $('#nutrientContenttabletbody').append(
                '<tr>' +
                '<td>' + `${nutrient.ingredientname}` + '</td>' +
                '<td>' + `${nutrient.ingredientcategory}` + '</td>' +
                '<td>' + `${nutrient.ingredientdesc}` + '</td>' +
                '<td>' + `${nutrient.calorie}` + 'kcal</td>' +
                '<td>' + `${nutrient.carb}` + 'g</td>' +
                '<td>' + `${nutrient.fat}` + 'g</td>' +
                '<td>' + `${nutrient.protein}` + 'g</td>' +
                '</tr>'
            )

        }
    },
    error: function () { }
}).done(function (index) {
    console.log("mealIngredients ok")
    for (var meal of index) {

        $('#mealIngredients').append(
            `<option value = "${meal.ingredientname}">`
        )


    }
})
    .fail(function () {

    })
//菜單表格
$.ajax({
    url: `http://localhost:8080/api/${storeId}/vmealbom?token=${newToken}`,
    method: 'GET',
    success: function (res, status) {
        $('#tableMenubody').empty();
        console.log("menuTable ok")
        for (var menu of res) {
            $('#tableMenubody').append(
                '<tr>' +
                '<td class="my-td-width4">' + '<input type="checkbox">' + '</td>' +
                '<td class="my-td-width10">' + `${menu.mealname}` + '</td>' +
                '<td class="my-td-width10">' + `${menu.mealcategoryname}` + '</td>' +
                '<td class="my-td-width10">' + `xxxxx` + '</td>' +
                '<td class="my-td-width23 textBlock">' + `${menu.ingredient}` + 'kcal</td>' +
                '<td class="my-td-width10">' + `${menu.mealprice}` + ' TWD' + '</td>' +
                '<td class="my-td-width23 textBlock">' + `${menu.mealdesc}` + '</td>' +
                '</tr>'
            )

        }
        $('#tableMenubody tr').on('click', function () {
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
    },
    error: function () { }
})
//訂單管理表格
//顧客管理表格
$.ajax({
    url: `http://localhost:8080/api/${storeId}/users?token=${newToken}`,
    method: 'GET',
    success: function (res, status) {
        $('#tableMemberbody').empty();
        console.log("memberTable ok")

        for (var member of res) {

            $('#tableMemberbody').append(
                '<tr>' +
                '<td class="textBlock">' + `${member.USER_ID}` + '</td>' +
                '<td>' + `${member.USER_NAME}` + '</td>' +
                '<td>' + `${member.USER_GENDER}` + '</td>' +
                '<td>' + `${member.USER_PHONE}` + '</td>' +
                '<td class="textBlock">' + `${member.USER_MAIL}` + '</td>' +
                '<td class="textBlock">' + `${member.USER_BIRTH}` + '</td>' +
                '<td>' + `${member.USER_AGE}` + '</td>' +
                '</tr>'
            )


        }
        $('#tableMemberbody tr').on('click', function () {
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
    },
    error: function () {
        console.log("memberTable fail")
    }
})
//廣播與優惠卷設定
//對帳單
//店家資訊



/*畫分析圖表*/
const Chart1 = new Chart(
    document.getElementById('Chart1'),
    config
);
const Chart2 = new Chart(
    document.getElementById('Chart2'),
    config
);
let chart3 = new Chart(document.getElementById('Chart3'), {
    type: 'pie', //圖表類型
    data: {
        labels: [ //圓餅圖的每一塊，分別叫做什麼名字
            '台北', //第一塊名字
            '台中', //第二塊名字
            '高雄'
        ],
        datasets: [{
            label: '三都人口', //這些資料都是在講什麼，也就是data 300 500 100是什麼
            data: [57.69, 19.23, 23.08], //每一塊的資料分別是什麼，台北：300、台中：50..
            backgroundColor: [ //設定每一塊的顏色，可以用rgba來寫
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    }, //設定圖表資料
    options: {} //圖表的一些其他設定，像是hover時外匡加粗
})

let chart = new Chart(document.getElementById('Chart4'), {
    type: 'pie', //圖表類型
    data: {
        labels: [ //圓餅圖的每一塊，分別叫做什麼名字
            '台北', //第一塊名字
            '台中', //第二塊名字
            '高雄'
        ],
        datasets: [{
            label: '三都人口', //這些資料都是在講什麼，也就是data 300 500 100是什麼
            data: [300, 50, 100], //每一塊的資料分別是什麼，台北：300、台中：50..
            backgroundColor: [ //設定每一塊的顏色，可以用rgba來寫
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    }, //設定圖表資料
    options: {} //圖表的一些其他設定，像是hover時外匡加粗
})
/*讀取*/



/*---------------嘉彬------------*/





//隱藏內容在欄位裡過多
// $('tr').on('click', function () {
//     if ($(this).find('td').css('word-break') == 'normal') {
//         $(this).find('td').css({//可以改變多個css
//             "word-break": "break-all",
//             'white-space': 'normal'

//         })
//     } else {
//         $(this).find('td').css({
//             "word-break": "normal",
//             'white-space': 'nowrap'
//         })
//     }
// })


//讀取餐點食材下拉選單
// var ingredientsJS = function () {
//     $.ajax("./Jsontest.json")//toarry
//         .done(function (index) {
//             for (var meal of index) {
//                 console.log($('#mealIngredients').val())
//                 $('#mealIngredients').append(
//                     `<option value = "${meal.INGREDIENT_NAME}">`
//                 )


//             }
//         })
//         .fail(function () {
//             alert("error");
//         })
// }();

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
    if (rows.length > 1) {
        // change: work on filtered jQuery object
        rows.filter(":last").html('');
        $('#addIngredients :last').remove();
    } else {
        alert('Cannot remove any more rows');
    }

}


//計算營養成份表
function ingredientsOPA() {
    $.ajax({
        url: `http://localhost:8080/api/${storeId}/ingredients?token=${newToken}`,
        method: 'GET',
        success: function (res, status) {
            console.log("ingredientsOPA() success");
        },
        error: function () { console.log("ingredientsOPA() fail"); }
    }).done(function (index) {

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

                    if (ingredientsname[i].value == a.ingredientname) {

                        calorie = Number(a.calorie);
                        carb = Number(a.carb);
                        fat = Number(a.fat);
                        protein = Number(a.protein);
                        var inputgrams = Number(ingredientsgrams[i].value);

                        calorietot += calorie;
                        carbtot += carb;
                        fattot += fat;
                        proteintot += protein;

                        var caloriefloat = parseFloat((inputgrams * calorietot).toFixed(2));
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
            } else {
                alert("請輸入完整資訊");
                $('#nutritionOperation').html(
                    "<hr>");
                break;
            }
        }
        console.log(calorietot + ":" + carbtot)

    })
        .fail(function () {
            alert("error");
        })


}

// function ingredientsOPA() {
//     $.ajax("./Jsontest.json")//toarry
//         .done(function (index) {
//             var ingredientsname = document.getElementsByName('ingredientsName');
//             var ingredientsgrams = document.getElementsByName('ingredientsGrams');
//             var calorietot = 0;
//             var carbtot = 0;
//             var fattot = 0;
//             var proteintot = 0;
//             for (var i = 0; i < ingredientsname.length; i++) {
//                 if (ingredientsname[i].value != "" && ingredientsgrams[i].value != "") {
//                     var calorie;
//                     var carb;
//                     var fat;
//                     var protein;
//                     for (var a of index) {
//                         if (ingredientsname[i].value == a.INGREDIENT_NAME) {
//                             calorie = a.CALORIE;
//                             carb = a.CARB;
//                             fat = a.FAT;
//                             protein = a.PROTEIN;
//                             var inputgrams = Number(ingredientsgrams[i].value);

//                             calorietot += calorie;
//                             carbtot += carb;
//                             fattot += fat;
//                             proteintot += protein;

//                             var caloriefloat =parseFloat((inputgrams * calorietot).toFixed(2));
//                             var carbfloat = parseFloat((inputgrams * carbtot).toFixed(2));
//                             var fatfloat = parseFloat((inputgrams * fattot).toFixed(2));
//                             var proteintfloat = parseFloat((inputgrams * proteintot).toFixed(2));
//                         }
//                     }
//                     $('#nutritionOperation').html(
//                         "<hr>熱量:" + `${caloriefloat}` +
//                         "(kcal)<br>碳水化合物:" + `${carbfloat}` +
//                         "(g)<br>脂肪:" + `${fatfloat}` +
//                         "(g)<br>蛋白質:" + `${proteintfloat}` + "(g)");
//                 }else{
//                     alert("請輸入完整資訊");
//                     $('#nutritionOperation').html(
//                         "<hr>");
//                         break;
//                 }
//             }

//         })
//         .fail(function () {
//             alert("error");
//         })
// }
//今天更新0606還沒給榮庭
