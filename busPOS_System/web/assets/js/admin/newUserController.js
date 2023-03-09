

getAllUser();
var isUpdateUserStatus=false;
function getAllUser(){
    $.ajax({
        url:"../user?userID="+$("#txtUserID").val(),
        success:function (resp){
            $("#tblAdmin").empty();
            clearAllUserData();
            for (let i = 0; i < resp.length-1; i++) {
            $("#tblAdmin").append(`
             <tr class="table-light fw-semibold fs-5"><td>${resp[i].userID}</td><td>${resp[i].ftName}</td><td>${resp[i].ltName}</td><td>${resp[i].email}</td><td>
             <button type="button" class="btn btn-outline-success btn-sm">edit</button>
             <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr>
            `);
            }
            console.log("R-:"+resp[resp.length-1].userID);
            $("#txtUserID").val(resp[resp.length-1].userID); // GENERATE USER ID
            $("#tblAdmin>tr>td>button:first-child").click(function (){
                    let row = $(this).parent().parent();
                    $("#txtUserID").val(row.children().eq(0).text());
                    $("#txtUserFirstName").val(row.children().eq(1).text());
                    $("#txtUserLastName").val(row.children().eq(2).text());
                    $("#txtUserEmail").val(row.children().eq(3).text());
                    $("#tblAdmin>tr").fadeTo(1000,0.2);
                    $("#tblAdmin>tr button").prop("disabled",true); // DISABLE BUTTONS
                    $(row).addClass("table-success");
                    $(row).fadeTo(1000,1);
                    $("#btnSaveAdmin").text("Update User");
                    $("#btnSaveAdmin").addClass("btn btn-success");
                isUpdateUserStatus=true;
            });

            $("#tblAdmin>tr>td>button:last-child").click(function (){
                let row = $(this).parent().parent();
                $("#btnRemoveModel").click(function (){
                    $("#btnRemoveModel").off();
                    $.ajax({
                        url:"../user?userID="+$(row).children().eq(0).text(),
                        method:"DELETE",
                        success:function (resp) {
                            if(resp[0].status){
                            $(row).empty();
                                toastMassage("User DELETED","bg-primary-subtle");
                            }else{
                                toastMassage("Failed","bg-danger bg-opacity-25","Warning..");
                            }
                        },
                        error:function (e) {
                            toastMassage("Error USER 'DELETE' Server not working","bg-danger bg-opacity-25","Warning..");
                        }

                    });
                });
            });

        },
        error:function (e){
            toastMassage("Error USER GET Server not working","bg-danger bg-opacity-25","Warning..");
        }
    });
}

function isValidUser() {
    if(!(regexName.test($("#txtUserFirstName").val())) || !(regexName.test($("#txtUserLastName").val()))){
            toastMassage("Invalid Name","bg-danger bg-opacity-25","Warning..");
        return false;
    }else{
        if(!(regexEmail.test($("#txtUserEmail").val()))){
            toastMassage("Invalid Email","bg-danger bg-opacity-25","Warning..");
            return false;
        }else{
            if(!(regexPwd.test($("#txtUserPwd").val()))|| !(regexPwd.test($("#txtUserPwd2").val()))) {
            toastMassage("Password not strong","bg-danger bg-opacity-25","Warning..");
                return false;
            }else{
                if (!($("#txtUserPwd").val()===$("#txtUserPwd2").val())){
            toastMassage("Password not Patch","bg-danger bg-opacity-25","Warning..");
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
}

$("#btnSaveAdmin").click(function (){
    if(isValidUser()){
        if(!isUpdateUserStatus){
    $.ajax({
        url:"../user?userID="+$("#txtUserID").val(),
        method:"POST",
        data:$("#formUser").serialize(),
        success:function (resp){
            if(resp[0].status){
            getAllUser();
                toastMassage("User Save Successfully","bg-primary-subtle");
            }else{
                toastMassage("Failed","bg-danger bg-opacity-25","Warning..");
            }
        },
        error:function (e){
            toastMassage("Error USER POST Server not working","bg-danger bg-opacity-25","Warning..");

        }
    });

        }else{
            $.ajax({
                url:"../user?userID="+$("#txtUserID").val()+
                    "&ftName="+$("#txtUserFirstName").val()+
                    "&ltName="+$("#txtUserLastName").val()+
                    "&email="+$("#txtUserEmail").val()+
                    "&pwd="+$("#txtUserPwd").val()
                ,
                method:"PUT",
                success:function (resp){
                    if(resp[0].status){
                        getAllUser();
                        toastMassage("User Update Successfully","bg-primary-subtle");
                    }else{
                        toastMassage("Failed","bg-danger bg-opacity-25","Warning..");
                    }
                },
                error:function (e){
                    toastMassage("Error USER POST Server not working","bg-danger bg-opacity-25","Warning..");

                }
            });
        }

    }

});

function clearAllUserData(){
    $("#btnSaveAdmin").text("Save User");
    $("#btnSaveAdmin").removeClass("btn-success");
    $("#btnSaveAdmin").addClass("btn-primary");
    $("#tblAdmin tr").fadeTo(1000,1);
    $("#tblAdmin>tr button").prop("disabled",false); // ENABLE BUTTONS
    $("#tblAdmin>tr").removeClass("table-success");
    $("#txtUserFirstName").val("");
    $("#txtUserLastName").val("");
    $("#txtUserEmail").val("");
    $("#txtUserPwd").val("");
    $("#txtUserPwd2").val("");
    isUpdateUserStatus=false;

}