$(".choice").on("click", function(){
    console.log("test");
    $(".choice").removeClass("expand unset ");
    $(".choice").addClass("small");
    $(this).removeClass("small");
    $(this).addClass("expand");
}
)
