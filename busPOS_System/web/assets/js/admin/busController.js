var isBusUpdateStatus=false;
var getAllBusLoad=undefined;
getAllBus();

  function getAllBus(field){
           clearAllBusData();
       $.ajax({
          url:"../bus",
          method:"GET",
          dataType:"json",
           async:false,
          success:function (res) {

              $("#tblBus").empty();
              for (let i=0;i<res.length-1;i++) {
                  $("#tblBus").append(`<tr class="fw-semibold fs-5 table-light"> <td>${res[i].busID}</td><td>${res[i].busNumber}</td><td>${res[i].busSeat}</td><td>\n
                <button type=\"button\" class=\"btn btn-outline-success btn-sm me-2\" >edit</button>\n
                  <button type=\"button\" class=\"btn btn-outline-danger btn-sm\ ms-2" data-bs-toggle="modal" data-bs-target="#deleteModel">Remove</button>\n
                                       </td></tr>`);
              }
                    $("#txtBusID").val(res[res.length-1].busID);
              $("#tblBus tr td:last-child>button:first-child").click(function () {
                   const busID = $(this).parent().parent().children().eq(0).text();
                  const busNumber = $(this).parent().parent().children().eq(1).text();
                  const busSeat =$(this).parent().parent().children().eq(2).text();
                  let row = $(this).parent().parent();
                  $("#tblBus tr").fadeTo(1000,0.1);
                  $("#txtBusID").val(busID);
                  $("#txtBusNumber").val(busNumber);
                  $("#txtBusTotalSeat").val(busSeat);
                  $(row).fadeTo(1000,1);
                  $(row).addClass("table-success");
                  $("#btnBusSave").text("Update Bus");
                  $("#btnBusSave").addClass("btn btn-success");
                  $("#tblBus>tr button").prop( "disabled", true ); // Disable Element
                  isBusUpdateStatus=true;

              });
              $("#tblBus tr td:last-child>button:last-child").click(function () {
                            const row=$(this).parent().parent();

                        $("#btnRemoveModel").click(function () {
                            $("#btnRemoveModel").off();
                            $.ajax({
                                url:"../bus?busID="+$(row).children().eq(0).text(),
                                method:"DELETE",
                                success:function (resp) {
                                    if(resp[0].status){
                                    toastMassage("Delete Successfully","bg-success bg-opacity-25");
                                 $(row).empty();
                                    }
                              getAllBus();
                                },
                                error:function (e) {
                                    toastMassage("Bus DELETE faild","bg-danger bg-opacity-25","Warning..");
                                }

                            });
                        });


              });
                field=res;
            getAllBusLoad=res;
          }
      });

            return field;


 }

    $("#btnBusSave").click(function () {
        if($("#txtBusNumberCity").val()==="" || !regexNumber3.test($("#txtBusTotalSeat").val())){
            toastMassage("Please fill the all input","bg-danger bg-opacity-25","Warning..");
            return;
        }else {
            if(!isBusUpdateStatus){
    $.ajax({
        url:"../bus?busID="+$("#txtBusID").val(),
        method:"POST",
        data:$("#busForm").serialize(),
        success:function (res) {
            getAllBus();
            if(res[0].status){
            toastMassage("Bus Save Successfully","bg-primary-subtle");
            }else{
            toastMassage("Failed","bg-danger bg-opacity-25","Warning..");
            }

        },
        error:function (e){
            toastMassage("Server Not Working to POST data","bg-danger bg-opacity-25","Warning..");
        }

    });
            }else{
                $.ajax({
                    url:"../bus?busID="+$("#txtBusID").val()+"&busNumber="+$("#txtBusNumber").val()+"&busSeat="+$("#txtBusTotalSeat").val(),
                    method:"PUT",
                    success:function (res) {
                        getAllBus();
                        if(res[0].status){
                            toastMassage("Bus Save Successfully","bg-primary-subtle");
                        }else{
                            toastMassage("Failed","bg-danger bg-opacity-25","Warning..");
                        }
                    },
                    error:function (e){
                        toastMassage(e.toString(),"bg-danger bg-opacity-25","Warning..");
                    }

                });
            }
            getAllRoute();
        }

});
        function clearAllBusData(){
            isBusUpdateStatus=false;
            $("#btnBusSave").text("Save Bus");
            $("#btnBusSave").removeClass("btn btn-success");
            $("#btnBusSave").addClass("btn btn-primary");
            $("#tblBus tr").fadeTo(1000,1);
            $("#tblBus tr").removeClass("table-success");
            $("#tblBus>tr button").prop( "disabled", false ); // Enable Element
            $("#txtBusNumber").val("");
            $("#txtBusTotalSeat").val("");
        }
/*$("#tblBus>tr:first-child").click(function () {
    let text = $(this).children(":nth-child(2)").text();
    $("#txtBusNumber").val(text);
    console.log(text+"frist-child");
});
$("#txtCities").keydown(function (even) {

    if(even.keyCode==13){
        $("#txtBusNumberCity").focus();

        console.log("fd");

    }
});*/
$("#btnTblAddBusID").click(function (){
 /*   let parent = $("#btnTblAddBusID").parent().parent();
    let text1 = $(parent).children().eq(0).text();*/
   $("#txtBusNumberCity").val($("#btnTblAddBusID").parent().parent().children().eq(0).text());
});

