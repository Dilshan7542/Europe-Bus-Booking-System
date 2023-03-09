

function toastMassage(text,color,headerText){
    if(headerText===undefined){
    $("#toastHeaderText").text("Massage");
    }else{
    $("#toastHeaderText").text(headerText);
    }
    $("#toastBody").text(text);
    $("#toastHeader").removeClass("bg-success-subtle");
    $("#toastHeader").removeClass("bg-primary-subtle");
    $("#toastHeader").removeClass("bg-danger-subtle");
    $("#toastHeader").removeClass("bg-danger bg-opacity-25");
    $("#toastHeader").addClass(color);
    new bootstrap.Toast($("#liveToast")).show();
}

const regexNic=/^([0-9]){5,15}([v|V]{1,1})$|^([0-9]{5,12})$/;
const regexName=/^[A-z|\\s]{3,}$/;
const regexPhone=/^([+]94{1,3}|[0])([1-9]{2})([0-9]){7}$/;
const regexEmail=/^([A-z])([A-z0-9.]){1,}[@]([A-z0-9]){1,10}[.]([A-z]){2,5}$/;
const regexPwd=/^([0-9A-z @_]){4,20}$/;
const regexDouble=/^([0-9]*['.']?[0-9]{2,2})$/;
const regexNumber3=/^([0-9]){1,3}$/;
