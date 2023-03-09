var isUpdateCustomerStatus=false;

getAllCustomer();

function getAllCustomer(){
        clearAllCustomerData()
    $.ajax({
        url:"../customer?custID="+$("#txtCustID").val(),
        method:"GET",
        success:function (resp){
                $("#tblCustomer").empty();
            for (let i = 0; i < resp.length - 1; i++) {
              //  ADD ALL DATA TO TABLE
                $("#tblCustomer").append(`
           <tr class="fw-semibold fs-5 table-light"><td>${resp[i].custID}</td><td>${resp[i].nic}</td><td>${resp[i].name}</td><td>${resp[i].surname}</td><td>${resp[i].email}</td>
           <td>${resp[i].gender}</td><td>${resp[i].dob}</td><td>${resp[i].tel}</td><td>
           <button type="button" class="btn btn-outline-success btn-sm">edit</button>
           <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr>
                `);
            }
            $("#txtCustID").val(resp[resp.length-1].custID); // GENERATE ID
            $("#tblCustomer td>button:first-child").click(function (){ // CLICK EDIT BUTTON
                    let row = $(this).parent().parent();
                 $("#tblCustomer tr").fadeTo(1000,0.1);
                 $("#tblCustomer tr button").prop("disabled",true); // Disable buttons
                 $(row).addClass("table-success"); // change row color
                 $(row).fadeTo(1000,1);
                 $("#btnSaveCustomer").text("Update Customer");
                 $("#btnSaveCustomer").addClass("btn btn-success");
                 $("#txtCustID").val($(row).children().eq(0).text());
                 $("#txtNic").val($(row).children().eq(1).text());
                 $("#txtCusName").val($(row).children().eq(2).text());
                 $("#txtCusSurname").val($(row).children().eq(3).text());
                 $("#txtCusEmail").val($(row).children().eq(4).text());
                 $("#txtCusTel").val($(row).children().eq(7).text());
                 isUpdateCustomerStatus=true;
            });
                $("#tblCustomer tr td:last-child>button:last-child").click(function (){
                    let row = $(this).parent().parent();
                    $("#btnRemoveModel").click(function (){
                        $("#btnRemoveModel").off();
                        $.ajax({
                            url:"../customer?custID="+$(row).children().eq(0).text(),
                            method:"DELETE",
                            success:function (resp) {
                                $(row).empty();
                            },
                            error:function (e) {
                                toastMassage("Error Customer 'DELETE' Server not working","bg-danger bg-opacity-25","Warning..");
                            }

                        });
                    });
                });
        },
        error:function (e){
            toastMassage("Error Route GET Server not working","bg-danger bg-opacity-25","Warning..");
        }

    });
}

function isValidCustomer() {
    if($("#dob").val()===""){
            toastMassage("Please Select Your Birthday","bg-danger bg-opacity-25","Warning..")
        return false;
    }
        if(!regexNic.test( $("#txtNic").val())){
            toastMassage("Invalid NIC","bg-danger bg-opacity-25","Warning..")
            return false;
        }else {
            if (!regexName.test($("#txtCusName").val())) {
                toastMassage("Invalid Name", "bg-danger bg-opacity-25", "Warning..")
                return false;
            } else {
                if (!regexName.test($("#txtCusSurname").val())) {
                    toastMassage("Invalid Surname", "bg-danger bg-opacity-25", "Warning..")
                    return false;
                }else{
                    if (!regexPhone.test($("#txtCusTel").val())) {
                        toastMassage("Invalid Phone Number", "bg-danger bg-opacity-25", "Warning..")
                        return false;
                }else{
                        if (!regexEmail.test($("#txtCusEmail").val())) {
                            toastMassage("Invalid Email", "bg-danger bg-opacity-25", "Warning..")
                            return false;
                    }else{
                            if (!regexPwd.test($("#txtLoginPwd").val())) {
                            toastMassage("Invalid Email", "bg-danger bg-opacity-25", "Warning..")
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


$("#btnSaveCustomer").click(function () {
     if(isValidCustomer()){
         if(!isUpdateCustomerStatus){
             $.ajax({
                 url:"../customer?custID="+$("#txtCustID").val(),
                 method:"POST",
                 data:$("#formCustomer").serialize(),
                 success:function (res) {
                     getAllCustomer();
                     getAllBooking();
                    if(res[0].status){
                     toastMassage("Customer Save Successfully","bg-primary-subtle");
                    }else{
                     toastMassage("Customer Not Saved","bg-danger bg-opacity-25","Error...");
                    }
                 },
                 error:function (e){
                     clearAllCustomerData();
                     toastMassage("Error Customer POST Server not working","bg-danger bg-opacity-25","Warning..");
                 }

             });
         }else{
             $.ajax({
                 url:"../customer?custID="+
                     $("#txtCustID").val()+
                     "&nic="+$("#txtNic").val()+
                     "&name="+$("#txtCusName").val()+
                     "&surname="+$("#txtCusSurname").val()+
                     "&email="+$("#txtCusEmail").val()+
                     "&pwd="+$("#txtCusPwd").val()+
                     "&gender="+$("input[name='gender']:checked").val()+
                     "&tel="+$("#txtCusTel").val()+
                     "&dob="+$("#dob").val()
                     ,
                 method:"PUT",
                 async:false,
                 data:$("#formRouteSave").serialize(),
                 success:function (resp) {
                    getAllCustomer();
                     if(resp[0].status){
                     toastMassage("Customer Update Successfully","bg-success-subtle");
                     }else{
                         toastMassage("Customer Not Update","bg-danger bg-opacity-25","Error...");
                     }
                 },
                 error:function (e) {
             clearAllCustomerData();
                     toastMassage("Error Customer PUT Server not working","bg-danger bg-opacity-25","Warning..");
                 }

             });
         }
     }
 });

function clearAllCustomerData() {
    isUpdateCustomerStatus=false;
    $("#btnSaveCustomer").text("Save Customer");
    $("#btnSaveCustomer").removeClass("btn btn-success");
    $("#btnSaveCustomer").addClass("btn btn-primary");
    $("#tblCustomer tr").fadeTo(1000,1);
    $("#tblCustomer tr").removeClass("bg-success");
    $("#tblCustomer tr button").prop("disabled",false); // Enable buttons
    $("#txtNic").val("");
    $("#txtCusName").val("");
    $("#txtCusSurname").val("");
    $("#txtCusEmail").val("");
    $("#txtCusTel").val("");
    $("#txtCusPwd").val("");
    $("#dob").val("");

}









