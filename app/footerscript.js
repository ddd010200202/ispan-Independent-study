/*firebase*/
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
//onload
// 拿取Token跟id
// console.log(localStorage.getItem('storeToken'));
// console.log(JSON.parse(localStorage.getItem('storeinfo')).STORE_ID);
let newToken = localStorage.getItem('storeToken');
// localStorage.getItem('storeToken') == null ? function () { alert("請先登入"); window.location.href = "login.html" }() : newToken = localStorage.getItem('storeToken');
let storeId = JSON.parse(localStorage.getItem('storeinfo')).STORE_ID;
let localhost = 8081;
//總開關處理
$("#switch")[0].checked = false;
// window.onload = openstatus;
let openstatus;
// console.log(typeof openStatus)

if (localStorage.getItem('openstatus') == "true") {
    $("#switch")[0].checked = true;
} else {
    $("#switch")[0].checked = false;
}


function openSwitch(isOpen) {
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/stores?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {
            localStorage.setItem('openstatus', $("#switch")[0].checked)
            console.log('status change ok')
            res[0].STORE_OPEN_STATUS = isOpen
            console.log(typeof JSON.stringify(res[0]))
            $.ajax({
                url: `http://localhost:${localhost}/api/${storeId}/stores?token=${newToken}`,
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

$('#belltest').on('click',function(){
    $('#padleft .active').removeClass('active');
    $('#pills-tabContent>div').removeClass('active');
    $('#pills-tabContent>div').removeClass('show');
    $('#ordera').attr('class','nav-link text-white bg-transparent text-start');
    $('#pills-order').attr('class','show active container tab-pane ');
    
})

//登出按鍵
$('#signOutbtn').on('click', () => {

    openSwitch(false);
    localStorage.removeItem("storeinfo");
    localStorage.removeItem("storeToken");
    setInterval(function () {
        storeSignOut();
        localStorage.removeItem("openstatus");
    }, 200);
    // window.location.href = "login.html";
})
//頁面管理
//Analyzepage Orderpage Memberpage Broadcastpage ReconciliationStatementpage
//#pills-analyze #pills-order #pills-member #pills-broadcast #pills-reconciliationStatement
$("a[data-bs-target='#pills-home']").on('click', Homepage);
// $("a[data-bs-target='#pills-menu']").on('click', Mealpage);
$("a[data-bs-target='#pills-analyze']").on('click', Analyzepage);
$("a[data-bs-target='#pills-order']").on('click', Orderpage);
$("a[data-bs-target='#pills-member']").on('click', Memberpage);
$("a[data-bs-target='#pills-broadcast']").on('click', Broadcastpage);
$("a[data-bs-target='#pills-reconciliationStatement']").on('click', ReconciliationStatementpage);

var Chart3;
var Chart4;
var Chart5;
var Chart6;
var Chart7;
var Chart8;
var Chart9;
var Chart10;
var colors = [];

//首頁頁面處理
function Homepage() {
    //首頁銷售前三//分析資料-前10熱賣
    $('#pills-home ol').empty();
    $('#pills-home ul').empty();
    // $('.Chart3').empty();

    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/vsalerank?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {
            var labels = [];
            var data = [];
            console.log("vsalerankHomepage ok")
            // console.log(res)
            for (var salserank of res) {
                $('#vsalerankHomepage').append(
                    '<li>' + `${salserank.mealname}` + ":" + `${salserank.count}` + '</li>'
                )
                labels.push(salserank.mealname)
                data.push(salserank.count)
            }
            // console.log(labels)

            // console.log(document.getElementsByClassName('Chart3'))
            if (Chart3 instanceof Chart) {
                Chart3.destroy();
            }
            Chart3 = new Chart(document.getElementsByClassName('Chart3')[0], {
                type: 'pie', //圖表類型
                data: {
                    labels: labels,
                    datasets: [{
                        label: '銷售前10', //這些資料都是在講什麼，也就是data 300 500 100是什麼
                        data: data, //每一塊的資料分別是什麼，台北：300、台中：50..
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
            Chart3.clear();



        },
        error: err => {
            console.log("vsalerankHomepage fale")
            console.log(err)
        },
    });
    //首頁移交情況TODO
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/vorderstatuscount?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {
            // console.log(res)
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
    //目前總營利//分析資料-月營業額
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/vmonthreveue?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {
            var date = new Date()
            var nowYear = date.getFullYear();
            var nowMonth = date.getMonth() + 1;
            // console.log(res)
            console.log("vmonthreveueHompage ok")
            var labels = [];//月份
            var data = [];//金額
            var monthEnglish = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
            for (var vmonth of res) {
                if (vmonth.month == nowMonth) {

                    $('#vmonthreveueHompage').append(
                        '<li>' + `${vmonth.year}` + "年" + `${vmonth.month}` + '月目前總營收:' + `${vmonth.revenueofmonth}` + '</li>'
                    )

                }
                if (nowYear == vmonth.year) {
                    labels.push(monthEnglish[vmonth.month]);
                    data.push(vmonth.revenueofmonth)
                }

            }

            // console.log(document.getElementsByClassName('Chart3'))
            if (Chart4 instanceof Chart) {
                Chart4.destroy();
            }
            Chart4 = new Chart(document.getElementsByClassName('Chart4')[0], {
                type: 'line', //圖表類型
                data: {
                    labels: labels,
                    datasets: [{
                        label: '今年營收', //這些資料都是在講什麼，也就是data 300 500 100是什麼
                        data: data, //每一塊的資料分別是什麼，台北：300、台中：50..
                        backgroundColor: [ //設定每一塊的顏色，可以用rgba來寫
                            'rgb(255, 255, 255)',
                            // 'rgb(54, 162, 235)',
                            // 'rgb(255, 205, 86)'
                        ],
                        lineTension: 0,//曲線哲度
                        hoverOffset: 4
                    }]
                }, //設定圖表資料
                //圖表的一些其他設定，像是hover時外匡加粗
                options: {
                    // responsive: true,
                    // legend: { //是否要顯示圖示
                    //     display: true,
                    // },
                    // tooltips: { //是否要顯示 tooltip
                    //     enabled: true
                    // },
                    // scales: {  //是否要顯示 x、y 軸
                    //     xAxes: [{
                    //         display: true
                    //     }],
                    //     yAxes: [{
                    //         display: true
                    //     }]
                    // },
                }
            })

        },
        error: err => {
            console.log("vmonthreveueHompage fale")
            console.log(err)
        },
    });
}
Homepage();

//分析資料頁面處理
function Analyzepage() {
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/vsalerank?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {
            var labels = [];
            var data = [];
            console.log("vsalerankHomepage ok")
            // console.log(res)
            for (var salserank of res) {
                // $('#vsalerankHomepage').append(
                //     '<li>' + `${salserank.mealname}` + ":" + `${salserank.count}` + '</li>'
                // )
                labels.push(salserank.mealname)
                data.push(salserank.count)
            }
            // console.log(labels)

            if (Chart3 instanceof Chart) {
                Chart3.destroy();
            }
            Chart3 = new Chart(document.getElementsByClassName('Chart3')[1], {
                type: 'pie', //圖表類型
                data: {
                    labels: labels,
                    datasets: [{
                        label: '銷售前10', //這些資料都是在講什麼，也就是data 300 500 100是什麼
                        data: data, //每一塊的資料分別是什麼，台北：300、台中：50..
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



        },
        error: err => {
            console.log("vsalerankHomepage fale")
            console.log(err)
        },
    });
    //目前總營利//分析資料-月營業額
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/vmonthreveue?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {
            var date = new Date()
            var nowYear = date.getFullYear();
            var nowMonth = date.getMonth() + 1;
            // console.log(res)
            console.log("vmonthreveueHompage ok")
            var labels = [];//月份
            var data = [];//金額
            var monthEnglish = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
            for (var vmonth of res) {
                if (vmonth.month == nowMonth) {

                    // $('#vmonthreveueHompage').append(
                    //     '<li>' + `${vmonth.year}` + "年" + `${vmonth.month}` + '月目前總營收:' + `${vmonth.revenueofmonth}` + '</li>'
                    // )

                }
                if (nowYear == vmonth.year) {
                    labels.push(monthEnglish[vmonth.month]);
                    data.push(vmonth.revenueofmonth)
                }

            }

            if (Chart4 instanceof Chart) {
                Chart4.destroy();
            }
            Chart4 = new Chart(document.getElementsByClassName('Chart4')[1], {
                type: 'line', //圖表類型
                data: {
                    labels: labels,
                    datasets: [{
                        label: '今年營收', //這些資料都是在講什麼，也就是data 300 500 100是什麼
                        data: data, //每一塊的資料分別是什麼，台北：300、台中：50..
                        backgroundColor: [ //設定每一塊的顏色，可以用rgba來寫
                            'rgb(255, 255, 255)',
                            // 'rgb(54, 162, 235)',
                            // 'rgb(255, 205, 86)'
                        ],
                        lineTension: 0,//曲線哲度
                        hoverOffset: 4
                    }]
                }, //設定圖表資料
                //圖表的一些其他設定，像是hover時外匡加粗
                options: {
                    // responsive: true,
                    // legend: { //是否要顯示圖示
                    //     display: true,
                    // },
                    // tooltips: { //是否要顯示 tooltip
                    //     enabled: true
                    // },
                    // scales: {  //是否要顯示 x、y 軸
                    //     xAxes: [{
                    //         display: true
                    //     }],
                    //     yAxes: [{
                    //         display: true
                    //     }]
                    // },
                }
            })

        },
        error: err => {
            console.log("vmonthreveueHompage fale")
            console.log(err)
        },
    });
    //分析資料-年齡客群TODO
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/vagechart?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {
            // console.log(res);
            console.log("vagechart ok");
            console.log("vsalerankHomepage ok");
            var labels = [];
            var data = [];



            var backgroundColor = colorRandom(res.length, 0.2)

            for (var vage of res) {
                labels.push(vage.agerange + '歲')
                data.push(vage.qty)
            }
            if (Chart5 instanceof Chart) {
                Chart5.destroy();
            }
            Chart5 = new Chart(document.getElementsByClassName('Chart5'), {
                type: 'bar', //圖表類型
                data: {
                    labels: labels,
                    datasets: [{
                        label: '各層年齡(人數)', //這些資料都是在講什麼，也就是data 300 500 100是什麼
                        data: data, //每一塊的資料分別是什麼，台北：300、台中：50..
                        backgroundColor: backgroundColor,
                        borderColor: backgroundColor,

                    }]
                }, //設定圖表資料
                options: {

                } //圖表的一些其他設定，像是hover時外匡加粗
            })
        },
        error: err => {
            console.log("vagechart fale")
            console.log(err)
        },
    });
    //分析資料-類別圓餅TODO 類別跟餐盒*4
    //{mealid: 'M202206_bc9105cee4de11ecad989828a620e5eb', mealcategoryname: '健康餐盒', mealname: '雞胸餐盒', percentage: 85.71}
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/vsalecategory?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {
            // console.log(res)
            console.log("vsalecategory ok");
            var healthmealLabels = [];
            var healthmealData = [];
            var saladLabels = [];
            var saladData = [];
            var pastaLabels = [];
            var pastaData = [];
            var drinkLabels = [];
            var drinkData = [];
            var backgroundColor = colorRandom(res.length, 0.5)
            console.log("vsalerankHomepage ok")
            // console.log(res)
            for (var salecategory of res) {
                if (salecategory.mealcategoryname == '健康餐盒') {
                    healthmealLabels.push(salecategory.mealname + '(%)');
                    healthmealData.push(salecategory.percentage);
                } else if (salecategory.mealcategoryname == '沙拉') {
                    saladLabels.push(salecategory.mealname + '(%)');
                    saladData.push(salecategory.percentage);
                } else if (salecategory.mealcategoryname == '義大利麵') {
                    pastaLabels.push(salecategory.mealname + '(%)');
                    pastaData.push(salecategory.percentage);
                } else if (salecategory.mealcategoryname == '飲料') {
                    drinkLabels.push(salecategory.mealname + '(%)');
                    drinkData.push(salecategory.percentage);
                } else {
                    console.log('mealcategoryname return error')
                }
            }
            var Chart6bgColor = backgroundColor.slice(0, healthmealLabels.length);
            var Chart7bgColor = backgroundColor.slice(
                healthmealLabels.length - 1, healthmealLabels.length + saladLabels.length
            );
            var Chart8bgColor = backgroundColor.slice(
                healthmealLabels.length + saladLabels.length - 1, healthmealLabels.length + saladLabels.length + pastaLabels.length
            );
            var Chart9bgColor = backgroundColor.slice(
                healthmealLabels.length + saladLabels.length + pastaLabels.length - 1,
                healthmealLabels.length + saladLabels.length + pastaLabels.length + drinkLabels.length
            )
            if (Chart6 instanceof Chart) {
                Chart6.destroy();
                Chart7.destroy();
                Chart8.destroy();
                Chart9.destroy();
            }

            Chart6 = new Chart(document.getElementsByClassName('Chart6'), {
                type: 'pie', //圖表類型
                data: {
                    labels: healthmealLabels,
                    datasets: [{
                        label: '健康餐盒銷售比例(%)', //這些資料都是在講什麼，也就是data 300 500 100是什麼
                        data: healthmealData, //每一塊的資料分別是什麼，台北：300、台中：50..
                        backgroundColor: Chart6bgColor,
                        hoverOffset: 4
                    }]
                }, //設定圖表資料
                options: {} //圖表的一些其他設定，像是hover時外匡加粗
            })
            Chart7 = new Chart(document.getElementsByClassName('Chart7'), {
                type: 'pie', //圖表類型
                data: {
                    labels: saladLabels,
                    datasets: [{
                        label: '沙拉銷銷售比例(%)', //這些資料都是在講什麼，也就是data 300 500 100是什麼
                        data: saladData, //每一塊的資料分別是什麼，台北：300、台中：50..
                        backgroundColor: Chart7bgColor,
                        hoverOffset: 4
                    }]
                }, //設定圖表資料
                options: {} //圖表的一些其他設定，像是hover時外匡加粗
            })
            Chart8 = new Chart(document.getElementsByClassName('Chart8'), {
                type: 'pie', //圖表類型
                data: {
                    labels: pastaLabels,
                    datasets: [{
                        label: '義大利麵銷售比例(%)', //這些資料都是在講什麼，也就是data 300 500 100是什麼
                        data: pastaData, //每一塊的資料分別是什麼，台北：300、台中：50..
                        backgroundColor: Chart8bgColor,
                        hoverOffset: 4
                    }]
                }, //設定圖表資料
                options: {} //圖表的一些其他設定，像是hover時外匡加粗
            })
            Chart9 = new Chart(document.getElementsByClassName('Chart9'), {
                type: 'pie', //圖表類型
                data: {
                    labels: drinkLabels,
                    datasets: [{
                        label: '飲料', //這些資料都是在講什麼，也就是data 300 500 100是什麼
                        data: drinkData, //每一塊的資料分別是什麼，台北：300、台中：50..
                        backgroundColor: Chart9bgColor,
                        hoverOffset: 4
                    }]
                }, //設定圖表資料
                options: {} //圖表的一些其他設定，像是hover時外匡加粗
            })
        },
        error: err => {
            console.log("vsalecategory fale")
            console.log(err)
        },
    });
    //分析資料-男女比例TODO
    //{usergender: 'F', gendercount: 5, percentage: 45.45}
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/vgenderchart?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {
            console.log(res)
            console.log("vgenderchart ok")
            var labels = [];
            var data = [];
            var backgroundColor = colorRandom(3, 0.5);
            labels.push('男顧客佔比(%)'); labels.push('女顧客佔比(%)'); labels.push('中性顧客佔比(%)');
            for (var vgender of res) {

                data.push(vgender.percentage)
            }
            if (Chart10 instanceof Chart) {
                Chart10.destroy();
            }
            Chart10 = new Chart(document.getElementsByClassName('Chart10'), {
                type: 'pie', //圖表類型
                data: {
                    labels: labels,
                    datasets: [{
                        label: '男女中性占比', //這些資料都是在講什麼，也就是data 300 500 100是什麼
                        data: data, //每一塊的資料分別是什麼，台北：300、台中：50..
                        backgroundColor: backgroundColor,
                        borderColor: backgroundColor,

                    }]
                }, //設定圖表資料
                options: {

                } //圖表的一些其他設定，像是hover時外匡加粗
            })
        },
        error: err => {
            console.log("vgenderchart fale")
            console.log(err)
        },
    });
}
//訂單管理頁面處理
function Orderpage() {
    //訂單管理TODO
    //1:orderPreview 2:orderAfteview 4:orderCancel 3:orderComplete
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/vorderdisplay?token=${newToken}`,
        method: 'GET',
        success: (res, status) => {
            // console.log(res);
            console.log("ordersTable ok");
            $('#orderPreview').empty();
            $('#orderAfteview').empty();
            $('#orderCancel').empty();
            $('#orderComplete').empty();
            for (var orderInfo of res) {

                if (orderInfo.orderstatus == "1") {
                    $('#orderPreview').append(
                        '<tr class="orderTrr">' +
                        '<td class="orderTr" style="display: none;">' + `${orderInfo.orderid}` + '</td>' +
                        '<td>' + `未確認定單` + '</td>' +
                        '<td>' + `${orderInfo.username}` + '</td>' +
                        '<td>' + `${orderInfo.userphone}` + '</td>' +
                        '<td>' + `${orderInfo.mealorderqty}` + '</td>' +
                        '<td>' + `${orderInfo.ordersprice}` + '</td>' +
                        '<td>' + `${formatDate(orderInfo.createtime)}` + '</td>' +
                        '<td><button  class="orderBtn btn btn-primary">確認列印</button><button  class="orderCBtn btn btn-danger">取消</button></td>' +
                        '</tr>'
                    )
                } else if (orderInfo.orderstatus == "2") {
                    $('#orderAfteview').append(
                        '<tr  class="orderTrrcom">' +
                        '<td class="orderTrcom" style="display: none;">' + `${orderInfo.orderid}` + '</td>' +
                        '<td >' + `已確認定單` + '</td>' +
                        '<td>' + `${orderInfo.username}` + '</td>' +
                        '<td>' + `${orderInfo.userphone}` + '</td>' +
                        '<td>' + `${orderInfo.mealorderqty}` + '</td>' +
                        '<td>' + `${orderInfo.ordersprice}` + '</td>' +
                        '<td>' + `${formatDate(orderInfo.createtime)}` + '</td>' +
                        '<td><button class="ordercomBtn btn btn-dark">完成</button></td>' +

                        '</tr>'
                    )
                } else if (orderInfo.orderstatus == "4") {
                    $('#orderCancel').append(
                        '<tr>' +
                        '<td>' + `已取消訂單` + '</td>' +
                        '<td>' + `${orderInfo.username}` + '</td>' +
                        '<td>' + `${orderInfo.userphone}` + '</td>' +
                        '<td>' + `${orderInfo.mealorderqty}` + '</td>' +
                        '<td>' + `${orderInfo.ordersprice}` + '</td>' +
                        '<td>' + `${formatDate(orderInfo.createtime)}` + '</td>' +
                        '</tr>'
                    )
                } else if (orderInfo.orderstatus == "3") {
                    $('#orderComplete').append(
                        '<tr>' +
                        '<td>' + `已完成訂單` + '</td>' +
                        '<td>' + `${orderInfo.username}` + '</td>' +
                        '<td>' + `${orderInfo.userphone}` + '</td>' +
                        '<td>' + `${orderInfo.mealorderqty}` + '</td>' +
                        '<td>' + `${orderInfo.ordersprice}` + '</td>' +
                        '<td>' + `${formatDate(orderInfo.createtime)}` + '</td>' +
                        '</tr>'
                    )
                } else { console.log("info error") }

            }
            //完成按鈕
            $('.ordercomBtn').click(function () {
                var orderid = $('.orderTrcom')[$(this).closest("tr").index()].innerText
                console.log(orderid)
                $.ajax({
                    url: `http://localhost:${localhost}/api/${storeId}/orders?token=${newToken}&orderid=${orderid}`,
                    method: 'GET',
                    success: (res, status) => {
                        res[0].ORDER_STATUS = "3"
                        var putres = {
                            "ORDER_ID": `${res[0].ORDER_ID}`,
                            "STORE_ID": `${res[0].STORE_ID}`,
                            "USER_ID": `${res[0].USER_ID}`,
                            "ORDERS_PRICE": res[0].ORDERS_PRICE,
                            "ORDER_STATUS": `${res[0].ORDER_STATUS}`,
                            "ORDER_DESC": `${res[0].ORDER_DESC}`
                        }

                        $.ajax({
                            url: `http://localhost:${localhost}/api/${storeId}/order?token=${newToken}`,
                            method: 'PUT',
                            contentType: "application/JSON",
                            data: JSON.stringify(putres),
                            success: (res, status) => {
                                console.log(res)


                            }, error: err => {
                                console.log("ordersTable put fale")
                                console.log(err)
                            },
                        })

                    }, error: err => {
                        console.log("ordersTable get fale")
                        console.log(err)
                    },
                })
                $('.orderTrrcom')[$(this).closest("tr").index()].style.display = 'none';
            });
            //刪除
            $('.orderCBtn').click(function () {
                var orderid = $('.orderTr')[$(this).closest("tr").index()].innerText
                $.ajax({
                    url: `http://localhost:${localhost}/api/${storeId}/orders?token=${newToken}&orderid=${orderid}`,
                    method: 'GET',
                    success: (res, status) => {
                        res[0].ORDER_STATUS = "4"
                        var putress = {
                            "ORDER_ID": `${res[0].ORDER_ID}`,
                            "STORE_ID": `${res[0].STORE_ID}`,
                            "USER_ID": `${res[0].USER_ID}`,
                            "ORDERS_PRICE": res[0].ORDERS_PRICE,
                            "ORDER_STATUS": `${res[0].ORDER_STATUS}`,
                            "ORDER_DESC": `${res[0].ORDER_DESC}`
                        }

                        $.ajax({
                            url: `http://localhost:${localhost}/api/${storeId}/order?token=${newToken}`,
                            method: 'PUT',
                            contentType: "application/JSON",
                            data: JSON.stringify(putress),
                            success: (res, status) => {
                                console.log(res)


                            }, error: err => {
                                console.log("ordersTable put fale")
                                console.log(err)
                            },
                        })

                    }, error: err => {
                        console.log("ordersTable get fale")
                        console.log(err)
                    },
                })
                $(' .orderTrr')[$(this).closest("tr").index()].style.display = 'none';
            })
            //確定
            var getcompletevalue = [];
            $('.orderBtn').click(function () {

                var orderid = $('.orderTr')[$(this).closest("tr").index()].innerText
                var selectData = $(this).closest("tr").html().slice(43, -1).slice(0, -109).split("</td><td>");
                ;

                var nowDate = new Date();
                var nowTime = nowDate.getFullYear() + "年" + (nowDate.getMonth() + 1) + "月" +
                    nowDate.getDate() + "日" + nowDate.getHours() + "時" + nowDate.getMinutes() +
                    "分";
                // console.log(b)
                getcompletevalue.push(selectData[0])
                $('#orderAfteview').append(
                    '<tr  class="orderTrrcom">' +
                    '<td class="orderTrcom" style="display: none;">' + `${selectData[0]}` + '</td>' +
                    '<td>' + `已確認定單` + '</td>' +
                    '<td>' + `${selectData[2]}` + '</td>' +
                    '<td>' + `${selectData[3]}` + '</td>' +
                    '<td>' + `${selectData[4]}` + '</td>' +
                    '<td>' + `${selectData[5]}` + '</td>' +
                    '<td>' + `${nowTime}` + '</td>' +
                    '<td><button  class="ordercomBtn btn btn-dark">完成</button></td>' +

                    '</tr>'
                )



                $.ajax({
                    url: `http://localhost:${localhost}/api/${storeId}/orders?token=${newToken}&orderid=${orderid}`,
                    method: 'GET',
                    success: (res, status) => {
                        //完成按鈕
                        $('.ordercomBtn').click(function () {
                            var orderid = $('.orderTrcom')[$(this).closest("tr").index()].innerText
                            console.log(orderid)
                            $.ajax({
                                url: `http://localhost:${localhost}/api/${storeId}/orders?token=${newToken}&orderid=${orderid}`,
                                method: 'GET',
                                success: (res, status) => {

                                    console.log("orderid")
                                    res[0].ORDER_STATUS = "3"
                                    var putres = {
                                        "ORDER_ID": `${res[0].ORDER_ID}`,
                                        "STORE_ID": `${res[0].STORE_ID}`,
                                        "USER_ID": `${res[0].USER_ID}`,
                                        "ORDERS_PRICE": res[0].ORDERS_PRICE,
                                        "ORDER_STATUS": `${res[0].ORDER_STATUS}`,
                                        "ORDER_DESC": `${res[0].ORDER_DESC}`
                                    }
                                    console.log(putres)
                                    $.ajax({
                                        url: `http://localhost:${localhost}/api/${storeId}/order?token=${newToken}`,
                                        method: 'PUT',
                                        contentType: "application/JSON",
                                        data: JSON.stringify(putres),
                                        success: (res, status) => {
                                            console.log(res)
                                            console.log("okookokkokkoo")

                                        }, error: err => {
                                            console.log("ordersTable put fale")
                                            console.log(err)
                                        },
                                    })

                                }, error: err => {
                                    console.log("ordersTable get fale")
                                    console.log(err)
                                },
                            })
                            $('.orderTrrcom')[$(this).closest("tr").index()].style.display = 'none';
                        });
                        res[0].ORDER_STATUS = "2"
                        var putres = {
                            "ORDER_ID": `${res[0].ORDER_ID}`,
                            "STORE_ID": `${res[0].STORE_ID}`,
                            "USER_ID": `${res[0].USER_ID}`,
                            "ORDERS_PRICE": res[0].ORDERS_PRICE,
                            "ORDER_STATUS": `${res[0].ORDER_STATUS}`,
                            "ORDER_DESC": `${res[0].ORDER_DESC}`
                        }

                        $.ajax({
                            url: `http://localhost:${localhost}/api/${storeId}/order?token=${newToken}`,
                            method: 'PUT',
                            contentType: "application/JSON",
                            data: JSON.stringify(putres),
                            success: (res, status) => {
                                console.log(res)


                            }, error: err => {
                                console.log("ordersTable put fale")
                                console.log(err)
                            },
                        })

                    }, error: err => {
                        console.log("ordersTable get fale")
                        console.log(err)
                    },
                })
                $(' .orderTrr')[$(this).closest("tr").index()].style.display = 'none';
            });





        },
        error: err => {
            console.log("ordersTable get fale")
            console.log(err)
        },
    });
}

function comOder() {
    $.ajax({
        url: xxx,
        method: 'PUT',
        data: {

        },
        success: (res, status) => {

        },
        error: err => {
            console.log("ordersTable fale")
            console.log(err)
        }
    })
}
//preafterOrder cancelOrder completeOrder
$('#preafterOrder').on('click', Orderpage)
$('#cancelOrder').on('click', Orderpage)
$('#completeOrder').on('click', Orderpage)
//顧客管理頁面處理
function Memberpage() {
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/users?token=${newToken}`,
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
                    '<td class="textBlock">' + `${formatDatenotime(member.USER_BIRTH)}` + '</td>' +
                    '<td>' + `${member.USER_AGE}歲` + '</td>' +
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
}
//廣播訊息設定頁面處理
function Broadcastpage() {

}
//對帳單頁面處理
function ReconciliationStatementpage() {
    $('#table').bootstrapTable({
        url: `http://localhost:${localhost}/api/${storeId}/payments?token=${newToken}`,         //請求後臺的 URL（*）
        striped: false,
        method: 'get',                      //請求方式（*）
        // data: data,                      //當不使用上面的後臺請求時，使用data來接收資料
        toolbar: '#toolbar',                //工具按鈕用哪個容器
        showFullscreen: true,                    //全平按鈕
        showColumns: true,
        silentSort: true,
        showPaginationSwitch: true,
        showButtonIcons: false,            //沒用
        showButtonText: true,                //有用
        striped: false,                      //是否顯示行間隔色
        cache: false,
        buttonsPrefix: 'btn-sm btn',                       //是否使用快取，預設為 true，所以一般情況下需要設定一下這個屬性（*）
        pagination: true,                   //是否顯示分頁（*）
        sortable: true,                    //是否啟用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "client",           //分頁方式：client 使用者端分頁，server 伺服器端分頁（*）
        pageNumber: 1,                       //初始化載入第一頁，預設第一頁
        pageSize: 5,                        //每頁的記錄行數（*）
        pageList: [5, 10],        //可供選擇的每頁的行數（*）
        search: true,                       //是否顯示錶格搜尋，此搜尋是使用者端搜尋，不會進伺服器端，所以個人感覺意義不大
        strictSearch: false,                 //啟用嚴格搜尋。禁用比較檢查。                  //是否顯示所有的列
        showRefresh: true,                  //是否顯示重新整理按鈕
        minimumCountColumns: 2,             //最少允許的列數
        clickToSelect: true,                //是否啟用點選選中行
        // height: 500,                        //行高，如果沒有設定 height 屬性，表格自動根據記錄條數覺得表格高度
        uniqueId: "ID",                     //每一行的唯一標識，一般為主鍵列
        showToggle: true,                    //是否顯示詳細檢視和列表檢視的切換按鈕
        cardView: true,                    //是否顯示詳細檢視
        detailView: false,                  //是否顯示父子表
        showExport: true,                   //是否顯示匯出
        // exportDataType: "selected",            //basic', 'all', 'selected'.
        columns: [{
            field: 'USER_ID', title: '會員ID'       //我們取json中id的值，並將表頭title設定為ID
        }, {
            field: 'PAYMENT_ID', title: '結帳單ID'         //我們取 json 中 username 的值，並將表頭 title 設定為使用者名稱
        }, {
            field: 'ORDER_ID', title: '單據ID'                //我們取 json 中 sex 的值，並將表頭 title 設定為性別
        }, {
            field: 'PAYMENT_PRICE', title: '價格'               //我們取 json 中 city 的值，並將表頭 title 設定為城市
        }, {
            field: 'PAYMENT_CATEGORY', title: '結帳方式'               //我們取 json 中 sign 的值，並將表頭 title 設定為簽名
        }, {
            field: 'CREATE_TIME', title: '結帳時間', formatter: function (value, row, index) {
                console.log(value);
                console.log(row);
                console.log(index);

                return formatDate(value);
            }          //我們取 json 中 classify 的值，並將表頭 title 設定為分類
        },

        ],
        // responseHandler: function (res) {
        //     return res.data      //在載入遠端資料之前，處理響應資料格式.
        //     // 我們取的值在data欄位中，所以需要先進行處理，這樣才能獲取我們想要的結果
        // }
    });
}
//顧客管理表格
$("a[data-bs-target='#pills-broadcast']").on('click', couponTable);
// $('#couponBtn').on('click',couponTable )
//廣播與優惠卷設定
function couponTable() {
    $.ajax({
        url: `http://localhost:${localhost}/api/${storeId}/users?token=${newToken}`,
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
                    '<td class="textBlock">' + `${formatDatenotime(member.USER_BIRTH)}` + '</td>' +
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
}








/*utils*/


//隨機顏色包

var colorRandom = function (j, x) {
    var color = []
    for (var i = 0; i < j; i++) {

        color.push(`rgba(${(parseInt(Math.random() * 256))},${(parseInt(Math.random() * 256))},${(parseInt(Math.random() * 256))},${x})`);

    }

    return color;
}
//處理時間
function formatDate(newDate) {
    let date = new Date(newDate);
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" +
        date.getDate() + "日" + date.getHours() + "時" + date.getMinutes() +
        "分";
}

function formatDatenotime(newDate) {
    let date = new Date(newDate);
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + '日'
}

//搜尋
$("#nutrientContentsearch").keyup(function () {
    var value = this.value.toLowerCase().trim();

    $("#nutrientContenttable tr").each(function (index) {
        if (!index) return;
        $(this).find("td").each(function () {
            var id = $(this).text().toLowerCase().trim();
            var unfound = (id.indexOf(value) == -1);
            $(this).closest('tr').toggle(!unfound);
            return unfound;
        });
    });
});
var eleval = document.getElementById("searchMenu");
$("#menuBtn").on("click", function () {
    console.log(eleval.value);
    //將輸入值轉為小寫去除前後空格
    var keyword = eleval.value.toLowerCase().trim();

    $("#tableMenu tr").each(function (index) {
        if (!index) return;
        $(this).find("td").each(function () {
            var id = $(this).text().toLowerCase().trim();
            var unfound = (id.indexOf(keyword) == -1);
            //.closest()由tr開始搜尋/tr結束
            //.toggle()=>hide()、show切換
            $(this).closest('tr').toggle(!unfound);
            return unfound;
        });
    });
});
var eleval1 = document.getElementById("searchMember");
$("#memberBtn").on("click", function () {
    console.log(eleval1.value);
    //將輸入值轉為小寫去除前後空格
    var keyword = eleval1.value.toLowerCase().trim();

    $("#tableMember tr").each(function (index) {
        if (!index) return;
        $(this).find("td").each(function () {
            var id = $(this).text().toLowerCase().trim();
            var unfound = (id.indexOf(keyword) == -1);
            //.closest()由tr開始搜尋/tr結束
            //.toggle()=>hide()、show切換
            $(this).closest('tr').toggle(!unfound);
            return unfound;
        });
    });
});
var eleval1 = document.getElementById("searchOrder");
$("#orderBtn").on("click", function () {
    console.log(eleval1.value);
    //將輸入值轉為小寫去除前後空格
    var keyword = eleval1.value.toLowerCase().trim();

    $("#orderDiv tr").each(function (index) {
        if (!index) return;
        $(this).find("td").each(function () {
            var id = $(this).text().toLowerCase().trim();
            var unfound = (id.indexOf(keyword) == -1);
            //.closest()由tr開始搜尋/tr結束
            //.toggle()=>hide()、show切換
            $(this).closest('tr').toggle(!unfound);
            return unfound;
        });
    });
});

//營養表格 菜單印出營養素 重點輸出  
$('#ingredientsTable').bootstrapTable({
    url: `http://localhost:${localhost}/api/${storeId}/ingredients?token=${newToken}`,         //請求後臺的 URL（*）
    striped: false,
    method: 'get',                      //請求方式（*）
    // data: data,                      //當不使用上面的後臺請求時，使用data來接收資料
    toolbar: '#toolbar',                //工具按鈕用哪個容器
    showFullscreen: true,                    //全平按鈕
    showExport: true,               //是否顯示匯出
    showColumns: true,
    silentSort: true,
    showPaginationSwitch: true,
    showButtonIcons: false,            //沒用
    showButtonText: true,                //有用
    striped: false,                      //是否顯示行間隔色
    cache: false,
    buttonsPrefix: 'btn-sm btn',                       //是否使用快取，預設為 true，所以一般情況下需要設定一下這個屬性（*）
    pagination: true,                   //是否顯示分頁（*）
    sortable: true,                    //是否啟用排序
    sortOrder: "asc",                   //排序方式
    sidePagination: "client",           //分頁方式：client 使用者端分頁，server 伺服器端分頁（*）
    pageNumber: 1,                       //初始化載入第一頁，預設第一頁
    pageSize: 10,                        //每頁的記錄行數（*）
    pageList: [10, 20],        //可供選擇的每頁的行數（*）
    search: true,                       //是否顯示錶格搜尋，此搜尋是使用者端搜尋，不會進伺服器端，所以個人感覺意義不大
    strictSearch: false,                 //啟用嚴格搜尋。禁用比較檢查。                  //是否顯示所有的列
    showRefresh: true,                  //是否顯示重新整理按鈕
    minimumCountColumns: 2,             //最少允許的列數
    clickToSelect: true,                //是否啟用點選選中行
    // height: 400,                        //行高，如果沒有設定 height 屬性，表格自動根據記錄條數覺得表格高度
    uniqueId: "ID",                     //每一行的唯一標識，一般為主鍵列
    showToggle: false,                    //是否顯示詳細檢視和列表檢視的切換按鈕
    cardView: false,                    //是否顯示詳細檢視
    detailView: false,                  //是否顯示父子表

    exportDataType: "selected",            //basic', 'all', 'selected'.
    exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
    exportDataType: $(this).val(),

    columns: [{
        field: 'ingredientname', title: '俗名'       //我們取json中id的值，並將表頭title設定為ID
    }, {
        field: 'ingredientcategory', title: '食材分類'         //我們取 json 中 username 的值，並將表頭 title 設定為使用者名稱
    }, {
        field: 'ingredientdesc', title: '食材描述'                //我們取 json 中 sex 的值，並將表頭 title 設定為性別
    }, {
        field: 'calorie', title: '熱量'               //我們取 json 中 city 的值，並將表頭 title 設定為城市
    }, {
        field: 'carb', title: '碳水化合物'               //我們取 json 中 sign 的值，並將表頭 title 設定為簽名
    }, {
        field: 'fat', title: '脂肪'         //我們取 json 中 classify 的值，並將表頭 title 設定為分類
    }, {
        field: 'protein', title: '蛋白質'           //我們取 json 中 classify 的值，並將表頭 title 設定為分類
    },

    ],
    // responseHandler: function (res) {
    //     return res.data      //在載入遠端資料之前，處理響應資料格式.
    //     // 我們取的值在data欄位中，所以需要先進行處理，這樣才能獲取我們想要的結果
    // }
});

$.ajax({
    url: `http://localhost:${localhost}/api/${storeId}/ingredients?token=${newToken}`,
    method: 'GET',
    success: function (res, status) {

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
/*utils*/
/*畫分析圖表*/
// const labels = [
//     'aaaa',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
// ];

// const data = {
//     labels: labels,
//     datasets: [{
//         label: 'My First dataset',
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: [100, 10, 5, 2, 20, 30, 45],
//     }]
// };

// const config = {
//     type: 'line',
//     data: data,
//     options: {}
// };
// const Chart1 = new Chart(
//     document.getElementById('Chart1'),
//     config
// );
// const Chart2 = new Chart(
//     document.getElementById('Chart2'),
//     config
// );
// let chart3 = new Chart(document.getElementById('Chart3'), {
//     type: 'pie', //圖表類型
//     data: {
//         labels: [ //圓餅圖的每一塊，分別叫做什麼名字
//             '台北', //第一塊名字
//             '台中', //第二塊名字
//             '高雄'
//         ],
//         datasets: [{
//             label: '三都人口', //這些資料都是在講什麼，也就是data 300 500 100是什麼
//             data: [57.69, 19.23, 23.08], //每一塊的資料分別是什麼，台北：300、台中：50..
//             backgroundColor: [ //設定每一塊的顏色，可以用rgba來寫
//                 'rgb(255, 99, 132)',
//                 'rgb(54, 162, 235)',
//                 'rgb(255, 205, 86)'
//             ],
//             hoverOffset: 4
//         }]
//     }, //設定圖表資料
//     options: {} //圖表的一些其他設定，像是hover時外匡加粗
// })

// let chart = new Chart(document.getElementById('Chart4'), {
//     type: 'pie', //圖表類型
//     data: {
//         labels: [ //圓餅圖的每一塊，分別叫做什麼名字
//             '台北', //第一塊名字
//             '台中', //第二塊名字
//             '高雄'
//         ],
//         datasets: [{
//             label: '三都人口', //這些資料都是在講什麼，也就是data 300 500 100是什麼
//             data: [300, 50, 100], //每一塊的資料分別是什麼，台北：300、台中：50..
//             backgroundColor: [ //設定每一塊的顏色，可以用rgba來寫
//                 'rgb(255, 99, 132)',
//                 'rgb(54, 162, 235)',
//                 'rgb(255, 205, 86)'
//             ],
//             hoverOffset: 4
//         }]
//     }, //設定圖表資料
//     options: {} //圖表的一些其他設定，像是hover時外匡加粗
// })
/*畫分析圖表*/


/*---------------嘉彬------------*/
