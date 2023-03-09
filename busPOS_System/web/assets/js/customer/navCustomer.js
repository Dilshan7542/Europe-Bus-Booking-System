
function closeNavFrame(){
    $("#navRoute").css("display","none");
    $("#navBooking").css("display","none");
    $("#navProfile").css("display","none");
}

$("#sideRoute").click(function () {
    closeNavFrame();
    $("#navRoute").css("display","block");
    $("#navStatus").text("Route Status");
});

$("#sideProfile").click(function () {
    closeNavFrame();
    $("#navProfile").css("display","block");
    $("#navStatus").text("Your Profile");
});

$("#sideBooking").click(function () {
    closeNavFrame();
    $("#navBooking").css("display","block");
    $("#navStatus").text("Booking Status");
});


$(window).on("load",function (){
    for (let i = 1; i < 6; i++) {
        $(`.aside-2>div:nth-child(${i})`).on("mouseenter",function () {
            $(`.aside-2>div:nth-child(${i})>div`).css("background-color","blue");
        });
        $(`.aside-2>div:nth-child(${i})`).on("mouseleave",function (){
            $(`.aside-2>div:nth-child(${i})>div`).css("background-color","white");
        });
    }
});

$("#imgMenuCollapse").click(function (){
    $("main>aside").css("display","none");
    $("body>main>main").css("margin-left","0");
    $("body>main>main").css("width","100%");
    $(".topNaviHeaderText").css("padding-left","0");

});
$("#imgMenuExpand").click(function (){
    $("main>aside").css("display","block");
    $("body>main>main").css("margin-left","20%");
    $(".topNaviHeaderText").css("padding-left","20%");
    $("body>main>main").css("width","80%");
});
