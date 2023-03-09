
// CUSTOMER
getAllRoute();
function getAllRoute() {
    $.ajax({
        url:"../route",
        method:"GET",
        success:function (resp) {
            $("#tblCusRouteBody").empty();
            for (let i=0;i<resp.length-1;i++) {
                $("#tblCusRouteBody").append(`
              <tr class="fs-5 fw-semibold table-light"><td>${resp[i].routeID}</td><td>${resp[i].city}</td><td>${resp[i].busID}</td><td>${resp[i].departureDate}</td><td>${resp[i].departureTime}</td><td>${resp[i].cost}</td></tr>`);
            }
        },
        error:function (e) {
            toastMassage("Error Route GET Server not working","bg-danger bg-opacity-25","Warning..");
        }

    });

}
