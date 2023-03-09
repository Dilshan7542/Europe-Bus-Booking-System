var isUpdateBookingStatus=false;
getAllBooking();
getAllRouteModal();
$("#btnSeatBooking").hide();
function getAllBooking(){

    $.ajax({ // GET ALL BOOKINGS
        url:"../booking",
        method:"GET",
        success:function (res) {
            getAllCustomerModal(res);
            clearAllBookingData();
            $("#tblBooking").empty();
            for (let i = 0; i < res.length - 1; i++) { // Add Table All Values
            console.log(res[i].bookingID);
                $("#tblBooking").append(`
             <tr class="fw-semibold fs-5 table-light"><td>${res[i].bookingID}</td><td>${res[i].name}</td><td>${res[i].tel}</td><td>${res[i].busID}</td><td>${res[i].city}</td>
             <td>${res[i].busSeat}</td><td>${res[i].cost}</td><td>${res[i].departureDate}<br>${res[i].departureTime}</td><td>${res[i].bookingDate}<br>${res[i].bookingTime}</td><td>
             <button type="button" class="btn btn-outline-success btn-sm">edit</button>
             <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModel">remove</button></td></tr>`);
            }
            $("#txtBookingID").val(res[res.length-1].bookingID); // Generate new ID
            $("#tblBooking>tr td>button:first-child").click(function (){ // Edit BTN click
                let row = $(this).parent().parent();
                $("#txtBookingID").val(row.children().eq(0).text());
                $("#txtBookingCusName").val(row.children().eq(1).text());
                $("#txtBookingBus").val(row.children().eq(3).text());
                $("#txtBookingSeat").val(row.children().eq(5).text());
                $("#tblBooking>tr").fadeTo(1000,0.2);
                $("#tblBooking>tr td button").prop( "disabled", true ); // Disable Buttons
                $(row).addClass("table-success");
                $(row).fadeTo(1000,1);
                $("#btnBookingSave").addClass("btn btn-success");
                $("#btnBookingSave").text("Update Booking");
                isUpdateBookingStatus=true;
            });
            $("#tblBooking>tr td>button:last-child").click(function (){
                let row = $(this).parent().parent();
                $("#btnRemoveModel").click(function (){
                    $("#btnRemoveModel").off();
                    $.ajax({
                        url:"../booking?bookingID="+$(row).children().eq(0).text(),
                        method:"DELETE",
                        success:function (resp) {
                            getAllBooking();
                            $(row).empty();
                        },
                        error:function (e) {
                            toastMassage("Error Booking 'DELETE' Server not working","bg-danger bg-opacity-25","Warning..");
                        }
                    });
                });
            });

        },
        error:function (e){
           clearAllBookingData();
            toastMassage("Error Booking POST Server not working","bg-danger bg-opacity-25","Warning..");
        }
    });

}

function getAllCustomerModal(booking){
    $.ajax({ // GET ALL CUSTOMER
        url:"../customer",
        method:"GET",
        success:function (res){
            $("#tblCustomerModel").empty();
            for (let i = 0; i < res.length-1; i++) {
                $("#tblCustomerModel").append(`
                <tr class="fw-semibold fs-5"><td>${res[i].custID}</td><td>${res[i].name}</td><td>${res[i].email}</td><td>${res[i].tel}</td><td>
                 <button type="button" class="btn btn-outline-primary btn-sm"  data-bs-dismiss="modal">Add</button></td></tr>
                `);
            }
            $("#tblCustomerModel tr td>button").click(function (){
                let row = $(this).parent().parent();
                $("#txtBookingCustID").val(row.children().eq(0).text());
                $("#txtBookingCusName").val(row.children().eq(1).text());
            });
            $("#tblCustomerModel>tr").click(function (){
                $("#tblCustomerModel>tr").removeClass("table-danger");
                $("#tblCustomerModel").prop("disabled",false);
                $(this).addClass("table-danger"); // change color row

            });
            for (let i = 0; i < res.length-1; i++) {
                for (let j = 0; j < booking.length-1; j++) {
                   if(res[i].custID===booking[j].custID){
                       $(`#tblCustomerModel >tr:nth-child(${i+1})`).removeClass("table-danger");
                       $(`#tblCustomerModel >tr:nth-child(${i+1})`).addClass("bg-warning");
                       $(`#tblCustomerModel >tr:nth-child(${i+1}) button`).off();
                       $(`#tblCustomerModel >tr:nth-child(${i+1})`).off();
                       $(`#tblCustomerModel >tr:nth-child(${i+1})>td:last-child`).empty();
                   }
                }
            }
        },
        error:function (e){
            clearAllBookingData();
            toastMassage("Error Booking GET Server not working","bg-danger bg-opacity-25","Warning..");
        }
    });
}
$("#btnSeatAddModel").click(function (){
    $("#txtBookingSeat").val(busSelectNumber);

});

function getAllRouteModal() {
    $.ajax({
        url:"../route",
        method:"GET",
        success:function (res){
            $("#tblModalBookingRouteBody").empty();
            for (let i = 0; i < res.length-1; i++) {
                $("#tblModalBookingRouteBody").append(`
     <tr class="fw-semibold fs-5"> <td>${res[i].routeID}</td><td>${res[i].city}</td> <td>${res[i].busID}</td><td>${res[i].departureDate}</td> <td>${res[i].departureTime}</td><td>${res[i].cost}</td>
      <td><button type="button" class="btn btn-outline-primary btn-sm" data-bs-dismiss="modal">Add</button</td></tr>
`);

            }
            $("#tblModalBookingRouteBody>tr").click(function (){
                $("#tblModalBookingRouteBody>tr").removeClass("table-danger");
                $(this).addClass("table-danger");
            });


            $("#tblModalBookingRouteBody>tr td:last-child>button").click(function (){
                let row = $(this).parent().parent();
                $("#txtBookingRoute").val(row.children().eq(0).text());
                $("#txtBookingBus").val(row.children().eq(2).text());
                $("#txtDepartureDate").val(row.children().eq(3).text());
                $("#txtDepartureTime").val(row.children().eq(4).text());
                $("#txtBookingAmount").val(row.children().eq(5).text());
                $("#txtBookingSeat").val("");
                generateBusSeat(row.children().eq(2).text());
            });

        },
        error:function (e){
            toastMassage("Error Route GET Server not working","bg-danger bg-opacity-25","Warning..");
        }
    });

}

function isBookingValid() {
       if($("#txtBookingCustID").val()===""){
           toastMassage("Customer ID Empty", "bg-danger bg-opacity-25", "Warning..")
           return false;
       }else{
           if($("#txtBookingRoute").val()===""){
               toastMassage("Route ID Empty", "bg-danger bg-opacity-25", "Warning..")
               return false;
           }else{
               if($("#txtBookingSeat").val()===""){
                   toastMassage("Seat is Empty", "bg-danger bg-opacity-25", "Warning..")
                   return false;
               }else{
                   if($("#bookedDate").val()===""){
                   toastMassage("Booking Date not select", "bg-danger bg-opacity-25", "Warning..")
                       return false;
                   }else{
                       if($("#bookedTime").val()===""){
                   toastMassage("Booking Time not select", "bg-danger bg-opacity-25", "Warning..")
                           return false;
                       }else{
                           return true;
                       }
                   }
               }
           }
       }
}

$("#btnBookingSave").click(function (){
        if(isBookingValid()){
            if(!isUpdateBookingStatus){
        $.ajax({
            url:"../booking?bookingID="+$("#txtBookingID").val()+
                "&busSeat="+$("#txtBookingSeat").val()+
                "&bookigDate="+$("#bookedDate").val()+
                "&bookingTime="+$("#bookedTime").val()+
                "&busID="+$("#txtBookingBus").val()+
                "&routeID="+$("#txtBookingRoute").val()+
                "&custID="+$("#txtBookingCustID").val()
            ,
            method:"POST",
            data:$("#formBooking").serialize(),
            success:function (res){
                getAllBooking();
                toastMassage("Booking Save Successfully","bg-success-subtle");
            },
            error:function (e){
                toastMassage("Error Booking POST Server not working","bg-danger bg-opacity-25","Warning..");
            }

        });
            }else{
                $.ajax({
                    url:"../booking?bookingID="+$("#txtBookingID").val()+
                        "&busSeat="+$("#txtBookingSeat").val()+
                        "&bookigDate="+$("#bookedDate").val()+
                        "&bookingTime="+$("#bookedTime").val()+
                        "&busID="+$("#txtBookingBus").val()+
                        "&routeID="+$("#txtBookingRoute").val()+
                        "&custID="+$("#txtBookingCustID").val()
                    ,
                    method:"PUT",
                    data:$("#formBooking").serialize(),
                    success:function (res){
                        getAllBooking();
                toastMassage("Booking Update Successfully","bg-success-subtle");
                    },
                    error:function (e){
                        toastMassage("Error Booking PUT Server not working","bg-danger bg-opacity-25","Warning..");
                    }

                });
            }

        }
});

function clearAllBookingData(){
    $("#btnBookingSave").removeClass("btn btn-success")
    $("#btnBookingSave").addClass("btn btn-primary");
    $("#btnBookingSave").text("Save Booking");
    $("#seatGridSection").empty();
    $("#txtBookingCustID").val("");
    $("#txtBookingRoute").val("");
    $("#txtBookingAmount").val("");
    $("#txtBookingCusName").val("");
    $("#txtBookingBus").val("");
    $("#txtBookingSeat").val("");
    $("#txtDepartureTime").val("");
    $("#txtDepartureDate").val("");
    $("#bookedDate").val("");
    $("#bookedTime").val("");
    $("#btnSeatBooking").hide(); // HIDE SEAT BUTTON
    isUpdateBookingStatus=false;
}