var isRouteUpdateStatus;
getAllRoute();
function getAllRoute() {
    clearAllRouteData();
    $.ajax({
        url:"../route",
        method:"GET",
        success:function (resp) {
                $("#tblRouteBody").empty();
            for (let i=0;i<resp.length-1;i++) {
            $("#tblRouteBody").append(`
              <tr class="fw-semibold fs-5 table-light"><td>${resp[i].routeID}</td><td>${resp[i].city}</td><td>${resp[i].busID}</td><td>${resp[i].departureDate}</td><td>${resp[i].departureTime}</td><td>${resp[i].cost}</td><td>
              <button type="button" class="btn btn-outline-success btn-sm">edit</button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr>
            `);
            }

            $("#txtRouteID").val(resp[resp.length-1].routeID); // Generate New Route ID

            $("#tblRouteBody tr td:last-child>button:first-child").click(function (){ // Wen Edit Btn click....
                $("#tblRouteBody>tr").fadeTo(1000,0.2);
                let row = $(this).parent().parent();
                $("#txtRouteID").val(row.children().eq(0).text());
                $("#txtCity").val(row.children().eq(1).text());
                $("#txtBusIDCity").val(row.children().eq(2).text());
                $("#txtCost").val(row.children().eq(5).text());
               isRouteUpdateStatus=true;
                $(row).fadeTo(1000,1);
               $("#tblRouteBody>tr button").prop( "disabled", true ); // Disable Element
               $(row).addClass("table-success");
               $("#btnRouteSave").text("Update Route");
               $("#btnRouteSave").addClass("btn btn-success");
            });
            $("#tblRouteBody tr button:last-child").click(function (){
                let row = $(this).parent().parent();
                $("#btnRemoveModel").click(function () {
                    $("#btnRemoveModel").off();
                    $.ajax({
                        url:"../route?routeID="+$(row).children().eq(0).text(),
                        method:"DELETE",
                        success:function (resp) {
                            getAllRoute();
                            $(row).empty();
                        },
                        error:function (e) {
                            toastMassage("Error Route 'DELETE' Server not working","bg-danger bg-opacity-25","Warning..");
                        }

                    });
                });
            });
            getAllBusModel(resp);

        },
        error:function (e) {
            toastMassage("Error Route GET Server not working","bg-danger bg-opacity-25","Warning..");
        }

    });

}

function isValid() {//Validation text fields
    let serializeArray= $("#formRouteSave").serializeArray();
    if(($("#txtBusIDCity").val()==="")){
        toastMassage("Not Select Bus ID","bg-danger bg-opacity-25","Warning..");
        return false;

    }else{
        if(!regexDouble.test($("#txtCost").val())){
        toastMassage("Cost Invalid Input","bg-danger bg-opacity-25","Warning..");
            return false;
        }else{
    for (let i of serializeArray) {
        if(i.value.trim()===""){
        toastMassage("Please Select Date and Time","bg-danger bg-opacity-25","Warning..");
            return false;
        }
    }
        }
    }

    return true;
}

$("#btnRouteSave").click(function (){ // SAVE AND UPDATE btn
    if(isValid()){
        if(!isRouteUpdateStatus){
            $.ajax({
                url:"../route?routeID="+$("#txtRouteID").val()+"&busID="+$("#txtBusIDCity").val(),
                method:"POST",
                data:$("#formRouteSave").serialize(),
                success:function (res) {
                  getAllRoute();

                    toastMassage("Route Save Successfully","bg-success-subtle");
                },
                error:function (e){
                    toastMassage("Error Route POST Server not working","bg-danger bg-opacity-25","Warning..");
                }

            });
        }else{
            $.ajax({
                url:"../route?routeID="+$("#txtRouteID").val()+
                    "&city="+$("#txtCity").val()+
                    "&busID="+$("#txtBusIDCity").val()+
                    "&cost="+$("#txtCost").val()+
                    "&departureDate="+$("#dateDeparture").val()+
                    "&departureTime="+$("#timeDeparture").val()
                        ,
                method:"PUT",
                async:false,
                data:$("#formRouteSave").serialize(),
                success:function (resp) {
                    getAllRoute();
                    toastMassage("Route Update Successfully","bg-success-subtle");
                },
                error:function (e) {
                    toastMassage("Error Route PUT Server not working","bg-danger bg-opacity-25","Warning..");
                }

            });
        clearAllRouteData()
        }
    }
});
function clearAllRouteData(){
           isRouteUpdateStatus=false;
    $("#tblBodyBusModal>tr").removeClass("table-warning"); // Remove BusModel Select Row
            $("#tblRouteBody>tr button").prop( "disabled",false ); // Enable Element
           $("#btnRouteSave").removeClass("btn btn-success");
           $("#btnRouteSave").addClass("btn btn-primary");
           $("#btnRouteSave").text("Save Route");
    $("#tblRouteBody>tr").addClass("table-light");
            $("#tblRouteBody>tr").fadeTo(1000,1);
    $("#txtCity").val("");
    $("#txtBusIDCity").val("");
    $("#txtCost").val("");
    $("#dateDeparture").val("");
    $("#timeDeparture").val("");
}
function getAllBusModel(routes){
    $("#tblBodyBusModal").empty();
    var filedBus=null; // THIS ONE TEMPORARY
    let allBus = getAllBus(filedBus); // THIS ONE TEMPORARY
    for (let i=0;i<allBus.length-1;i++) {
        $("#tblBodyBusModal").append(`
                 <tr><td>${allBus[i].busID}</td><td>${allBus[i].busNumber}</td><td>${allBus[i].busSeat}</td><td>
                 <button type="button" class="btn btn-outline-primary btn-sm"  data-bs-dismiss="modal">
                 Add</button></td></tr>
            `);
    }
    $("#tblBodyBusModal>tr>td:last-child>button").click(function (){ //Model bottom btn click
        $("#txtBusIDCity").val($(this).parent().parent().children().eq(0).text());

    });
    $("#tblBodyBusModal>tr").click(function (){
        $("#tblBodyBusModal>tr").removeClass("table-danger");
        $("#btnAddBusIDModel").prop("disabled",false);
        $(this).addClass("table-danger"); // change color row
        let row=this;
        $("#btnAddBusIDModel").click(function (){ // footer Button click Model
            $("#btnAddBusIDModel").off();
            $("#txtBusIDCity").val($(row).children().eq(0).text());
            $("#modalBusNumber").modal("toggle");

        });

    });
    for (let i = 0; i < allBus.length-1; i++) {

    for (let j = 0; j < routes.length-1; j++) {
       if($(`#tblBodyBusModal tr:nth-child(${i+1})>td:nth-child(${1})`).text()===routes[j].busID){
           $(`#tblBodyBusModal tr:nth-child(${i+1})`).off();
           $(`#tblBodyBusModal tr:nth-child(${i+1})`).removeClass("table-danger");
           $(`#tblBodyBusModal tr:nth-child(${i+1})`).addClass("bg-warning");
           $(`#tblBodyBusModal tr:nth-child(${i+1}) td:last-child`).empty();
       }
    }

    }
}

$("#btnBusNumberCity").click(function (){
    $("#btnAddBusIDModel").prop("disabled",true);


});

var busSelectNumber=-1;
function generateBusSeat(busID){ // GENERATE SEAT BOOKING
    $.ajax({
        url:"../booking",
        method:"GET",
        success:function(res){
        let searchBusAr=Array();
            for (let b of res) {

                if(b.busID===busID){
                    searchBusAr.push(b.busSeat);
                }
            }
        let seatTotal=-1;
            for (let i = 0; i < getAllBusLoad.length-1; i++) {
                if(busID==getAllBusLoad[i].busID){
                    seatTotal=getAllBusLoad[i].busSeat;
                    break;
                }
            }
    let number=Number(seatTotal);
            console.log(number);
            $("#seatBookingModalBody>section").empty();
    for (let i = 1; i <= number; i++) {

            $("#seatBookingModalBody>section").append(`
                <div style="cursor: pointer" class="seatDiv">${i}</div>
            `);

            $("#seatBookingModalBody>section>div:last-child").click(function (){

                busSelectNumber=Number($(this).text());

            });

    }
            $("#seatBookingModalBody>section>div").click(function (){
                $("#seatBookingModalBody>section>div").removeClass("bg-success");
                $(this).addClass("bg-success");
            });
            for (let i = 1; i <=number ; i++) {
                for (let j = 0; j < searchBusAr.length; j++) {
                        $(`#seatBookingModalBody>section>div:nth-child(${i})`).removeClass("addedDiv");
                    if(i==searchBusAr[j]){
                        $(`#seatBookingModalBody>section>div:nth-child(${i})`).css({"background-color":"#F6891AFF","cursor":"default"});
                        $(`#seatBookingModalBody>section>div:nth-child(${i})`).addClass("addedDiv");
                        $(`#seatBookingModalBody>section>div:nth-child(${i})`).off();
                        break;
                    }
                }
            }
            $("#btnSeatBooking").show();
            $("#btnSeatBooking").fadeTo(1000,1);

        },
        error:function(e){
            toastMassage("Error Route GET Server not working","bg-danger bg-opacity-25","Warning..");
        }
    });

}
















