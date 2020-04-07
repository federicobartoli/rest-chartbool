$(document).ready(function () {

     var settings = {
       "url": "http://157.230.17.132:4001/sales",
       "method": "GET",
       "timeout": 0,
     };


     leMieVendite = {

     }

     $.ajax(settings).done(function (response) {
            for (var i = 0; i < response.length; i++) {
                var venditaSingolaGenerale = response[i];
                var dataVendita = venditaSingolaGenerale.date;
                var tempo = moment(dataVendita, "DD-MM-YYYY"); //uso moment
                var mese = tempo.format('MMMM');
                var venditeMonetarie = venditaSingolaGenerale.amount
                var venditeMonetarieCorrette = parseInt(venditeMonetarie);
                console.log(venditeMonetarieCorrette);
                if (leMieVendite[mese] === undefined) {
                    leMieVendite[mese] = 0;
               }
               leMieVendite[mese] += venditeMonetarieCorrette;
               console.log(leMieVendite);

               }
     });
     // console.log(mesiDiVendita);
     // console.log(moment.months());

});
