

getAllCustomerDetail();
$("#formCustomer input").fadeTo(500,0.5);

function getAllCustomerDetail() {
    $.ajax({
        url:"../customer",
        method:"GET",
        success:function (resp){
            for (let i = 0; i < resp.length-1; i++) {
                if(resp[i].custID===customerID){
                    console.log(customerID);
                    $("#userName").text(resp[i].name+" "+resp[i].surname);
                    $("#txtCusNic").val(resp[i].nic);
                    $("#txtCusName").val(resp[i].name);
                    $("#txtCusSurname").val(resp[i].surname);
                    $("#txtCusTel").val(resp[i].tel);
                    $("#txtCusEmail").val(resp[i].email);
                    $("#txtCusPwd").val(resp[i].pwd);
                    $("#txtDob").val(resp[i].dob);
                    console.log(resp[i].dob);
                        if(resp[i].gender=="female"){
                    $("#female").attr('checked', true);
                        }
                }
            }
        },
        error:function (e) {
            toastMassage("Invalid Customer","bg-danger bg-opacity-25","Warning..");
        }
    });
}

$("#btnEditCustomer").click(function (){
/*    $("#txtNic").attr("disabled",false);
    $("#txtCusName").attr("disabled",false);
    $("#txtCusTel").attr("disabled",false);
    $("#txtCusSurname").attr("disabled",false);
    $("#txtCus").attr("disabled",false);*/
    $("#formCustomer input").attr("disabled",false);
    $("#btnSaveCustomer").attr("disabled",false);
    $("#btnEditCustomer").attr("disabled",true);
    $("#formCustomer input").fadeTo(1000,1);
});

$("#btnSaveCustomer").click(function (){
   $.ajax({
       url:"../customer?custID="+customerID+
           "&nic="+$("#txtCusNic").val()+
           "&name="+$("#txtCusName").val()+
           "&surname="+$("#txtCusSurname").val()+
           "&tel="+$("#txtCusTel").val()+
           "&email="+$("#txtCusEmail").val()+
           "&pwd="+$("#txtCusPwd").val()+
           "&gender="+$("input[name='gender']:checked").val()+
           "&dob="+$("#txtDob").val()
       ,
       method: "PUT",
       success:function (isSave){
           if(isSave[0].status){
           toastMassage("Customer Update Successfully","bg-success ","Massage");
           }
       },
       error:function (e){
           toastMassage("Customer Update Not Working","bg-danger bg-opacity-25","Warning..");
       }   });
               $("#formCustomer input").attr("disabled",true);
               $("#btnSaveCustomer").attr("disabled",true);
               $("#btnEditCustomer").attr("disabled",false);
});
