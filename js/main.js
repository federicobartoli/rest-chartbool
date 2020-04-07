$(document).ready(function () {

     var settings = {
       "url": "http://157.230.17.132:4001/sales",
       "method": "GET",
       "timeout": 0,
     };


     mesiDiVendita = []

     $.ajax(settings).done(function (response) {
       for (var i = 0; i < response.length; i++) {
           var venditaSingola = response[i];
           var dataVendita = venditaSingola.date;
          var tempo = moment(dataVendita, "DD-MM-YYYY");
          mesiDiVendita.push(tempo.month());
          }
     });
     console.log(mesiDiVendita);

});
