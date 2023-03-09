
var busID="";
var routeID="";
getCustomerAllBooking();
getAllCusRouteModal();
$("#btnSeatBooking").hide();
function getCustomerAllBooking() {
    $("#btnSeatBooking").hide();
            $.ajax({
                url:"../booking",
                method:"GET",
                success:function (res){
                    for (let i = 0; i < res.length-1; i++) {
                        if(res[i].custID===customerID){
                            $("#btnSaveBooking").attr("disabled",true);
                            $("#tblBookingBody").append(`
                               <tr class="fw-semibold fs-5"><td>${res[i].bookingID}</td>
                               <td>${res[i].busID}</td>
                               <td>${res[i].city}</td>
                               <td>${res[i].busSeat}</td>
                               <td>${res[i].cost}</td>
                               <td>${res[i].departureDate}<br>${res[i].departureTime}</td>
                               <td>${res[i].bookingDate}<br>${res[i].bookingTime}</td><td>
                               <button type="button" class="btn btn-outline-danger btn-sm mt-2" data-bs-toggle="modal" data-bs-target="#deleteModel">cancel</button></td></tr>
                            `);
                            $("#tblBookingBody>tr button").click(function (){
                                let row = $(this).parent().parent();
                                $("#btnRemoveModel").click(function () {
                                    $("#btnRemoveModel").off();
                                    $.ajax({
                                        url: "../booking?bookingID=" + row.children().eq(0).text(),
                                        method: "DELETE",
                                        success: function (isDelete) {
                                            if (isDelete[0].status) {
                                                toastMassage("Delete Successfully", "bg-success bg-opacity-25");
                                                $(row).empty();
                                                $("#btnSaveBooking").attr("disabled", false);
                                                $("#btnSeatBooking").hide();
                                            }
                                        },
                                        error: function (e) {
                                            toastMassage("Error Booking DELETE Failed", "bg-danger bg-opacity-25", "Warning..");
                                        }

                                    });
                                });
                            });

                            break;
                        }
                    }
                },
                error:function (e){
                    toastMassage("Error Booking GET Server not working","bg-danger bg-opacity-25","Warning..");
                }
            });
}
function getAllCusRouteModal() {
    $.ajax({
        url:"../route",
        method:"GET",
        success:function (res){
            $("#tblModalCus_BookingRouteBody").empty();
            for (let i = 0; i < res.length-1; i++) {
                $("#tblModalCus_BookingRouteBody").append(`
     <tr class="fw-semibold fs-5"> <td>${res[i].routeID}</td><td>${res[i].city}</td> <td>${res[i].busID}</td><td>${res[i].departureDate}</td> <td>${res[i].departureTime}</td><td>${res[i].cost}</td>
      <td><button type="button" class="btn btn-outline-primary btn-sm" data-bs-dismiss="modal">Add</button</td></tr>
`);

            }
            $("#tblModalCus_BookingRouteBody>tr").click(function (){
                $("#tblModalCus_BookingRouteBody>tr").removeClass("table-danger");
                $(this).addClass("table-danger");
            });


            $("#tblModalCus_BookingRouteBody>tr td:last-child>button").click(function (){
                let row = $(this).parent().parent();
                routeID=row.children().eq(0).text();
                $("#txtCity").val(row.children().eq(1).text());
               busID=row.children().eq(2).text();
                $("#departureDate").val(row.children().eq(3).text());
                $("#departureTime").val(row.children().eq(4).text());
                $("#txtAmount").val(row.children().eq(5).text());
                $("#txtSeat").val("");
                $("#btnSeatBooking").show();
                generateBusSeat(row.children().eq(2).text());

            });

        },
        error:function (e){
            toastMassage("Error Route GET Server not working","bg-danger bg-opacity-25","Warning..");
        }
    });

}
var busSelectNumber=-1;
function generateBusSeat(busID){ // GENERATE SEAT BOOKING
    $.ajax({
        url:"../booking",
        method:"GET",
        success:function(res){
            $.ajax({
                url:"../bus",
                method:"GET",
                success:function (busLoad){
                    let searchBusAr=Array();
                    for (let b of res) {

                        if(b.busID===busID){
                            searchBusAr.push(b.busSeat);
                        }
                    }
                    let seatTotal=-1;
                    for (let i = 0; i < busLoad.length-1; i++) {
                        if(busID==busLoad[i].busID){
                            seatTotal=busLoad[i].busSeat;
                            $("#txtBusName").val(busLoad[i].busNumber);
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
                error:function (e){
                    toastMassage("Error BUS GET Server not working","bg-danger bg-opacity-25","Warning..");
                }
            });



        },
        error:function(e){
            toastMassage("Error Route GET Server not working","bg-danger bg-opacity-25","Warning..");
        }
    });

}
$("#btnSeatAddModel").click(function (){
    $("#txtSeat").val(busSelectNumber);

});

function isValidBooking() {
        if($("#txtCity").val()===""){
           toastMassage("Please Select City","bg-danger bg-opacity-25","Warning..");
           return false;
        }else{
            if($("#txtSeat").val()===""){
                toastMassage("Please Select Your Seat","bg-danger bg-opacity-25","Warning..");
                return false;
            }else{
                if($("#bookedDate").val()==="" || $("#bookedTime").val()===""){
                toastMassage("Please Select Date and Time","bg-danger bg-opacity-25","Warning..");
                    return false;
                }else{
                    return true;
                }
            }
        }
}

$("#btnSaveBooking").click(function (){
                if(isValidBooking()){

                    $.ajax({
                        url:"../booking?busSeat="+$("#txtSeat").val()+
                            "&bookingDate="+$("#bookedDate").val()+
                            "&bookingTime="+$("#bookedTime").val()+
                            "&routeID="+routeID+
                            "&custID="+customerID
                        ,
                        method:"POST",
                        success:function (isSave){
                            if(isSave[0].status){
                toastMassage("Booking Successfully","bg-primary ","Massage");
                                getCustomerAllBooking();
                                $("#formCustomerBooking input").val("");
                            }
                        },
                        error:function (e){
                toastMassage("Booking POST server Error","bg-danger bg-opacity-25","Warning..");

                        }
                    });

                }

            });
































