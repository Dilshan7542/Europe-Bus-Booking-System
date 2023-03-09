
 $("#btnLogin").click(function () {
    $.ajax({
        url:"custom",
        data:$("#loginForm").serialize(),
        method:"GET",
      /*  contentType:"json",*/
        success:function (resp){
            if(resp[1].isCusEmail){
                if(!resp[1].isCusPwd){
                    $("#txtLoginPwd").css("border","red solid 1px");
                    $(".error-pwd").css("display","block");
                    $(".error-pwd").text("Invalid Email");
                }else{
                    sessionStorage.setItem("customerID",resp[0].custID);
                    $(location).attr('href','page/customer.html');
                }
            }else if(resp[2].isUserEmail){
                if(!resp[2].isUserPwd){
                    $("#txtLoginPwd").css("border","red solid 1px");
                    $(".error-pwd").css("display","block");
                    $(".error-pwd").text("Invalid Email");
                }else{
                    sessionStorage.setItem("adminName",resp[0].ftName);
                    $(location).attr('href','page/admin.html');
                }
            }else{
                $("#txtLoginEmail").css("border","red solid 1px");
                $(".error-email").css("display","block");
                $(".error-email").text("Invalid Email");
            }
        },
        error:function (e) {
            console.log(e);
        }

    });
});


 function isValidSignUp() {
        if(!regexNic.test($("#txtNic").val())){
            $("#invalidNic").fadeTo(1000,1);
            $("#txtNic").addClass("border-danger");
            return false;
        }else{
            if(!regexName.test($("#txtCusName").val())) {
                $("#invalidName").fadeTo(1000,1);
                $("#txtCusName").addClass("border-danger");
                return false;
            }else{
                if(!regexName.test($("#txtCusSurname").val())) {
                    $("#invalidSurname").fadeTo(1000,1);
                    $("#txtCusSurname").addClass("border-danger");

                    return false;
                }else{
                    if(!regexPhone.test($("#txtCusTel").val())) {
                        $("#invalidTel").fadeTo(1000,1);
                        $("#txtCusTel").addClass("border-danger");

                        return false;
                    }else{
                        if(!regexEmail.test($("#txtCusEmail").val())) {
                            $("#invalidEmail").fadeTo(1000,1);
                            $("#txtCusEmail").addClass("border-danger");

                            return false;
                        }else{
                            if(!regexPwd.test($("#txtCusPwd").val())) {
                                $("#invalidPwd").fadeTo(1000,1);
                                $("#txtCusPwd").addClass("border-danger");
                                return false;
                            }else{
                                if($("#txtDob").val()==="") {
                                    $("#invalidDob").fadeTo(1000,1);
                                    $("#txtDob").addClass("border-danger");
                                    return false;
                                }else{
                                   return true;
                                }
                            }
                        }
                    }
                }
            }
        }
 }

 $("#btnCustomerSignUpSave").click(function (){
        if(isValidSignUp()){
            $.ajax({
                url:"customer",
                method:"POST",
                data:$("#formCustomerSignup").serialize(),
                success:function (isSave){
                    if(isSave[0].status){
                        $("#signUpModal").modal('hide');
                    }
                }
            });
        }

});
 $("#btnSignUp").click(function (){
     clearSignUpError();
 });

function clearSignUpError(){
    $("#invalidNic").fadeTo(10,0.0);
    $("#invalidName").fadeTo(10,0.0);
    $("#invalidSurname").fadeTo(10,0.0);
    $("#invalidTel").fadeTo(10,0.0);
    $("#invalidEmail").fadeTo(10,0.0);
    $("#invalidPwd").fadeTo(10,0.0);
    $("#invalidDob").fadeTo(10,0.0);

    $("#txtNic").val("");
    $("#txtCusName").val("");
    $("#txtCusSurname").val("");
    $("#txtCusTel").val("");
    $("#txtCusEmail").val("");
    $("#txtCusPwd").val("");
    $("#txtDob").val("");

    $("#txtNic").removeClass("border-danger");
    $("#txtCusName").removeClass("border-danger");
    $("#txtCusSurname").removeClass("border-danger");
    $("#txtCusTel").removeClass("border-danger");
    $("#txtCusEmail").removeClass("border-danger");
    $("#txtCusPwd").removeClass("border-danger");
    $("#txtDob").removeClass("border-danger");

}