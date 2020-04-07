$(document).ready(function () {

     leMieVendite = {

     };

     var mesiDiVendita = [];
     var datiVenditeMxM = [];

     $.ajax({
          url: "http://157.230.17.132:4001/sales",
          method: 'GET',
          success: function(response){
            for (var i = 0; i < response.length; i++) {
                var venditaSingolaGenerale = response[i];
                var dataVendita = venditaSingolaGenerale.date;
                var tempo = moment(dataVendita, "DD-MM-YYYY"); //uso moment
                var mese = tempo.format('MMMM');
                var venditeMonetarie = venditaSingolaGenerale.amount
                var venditeMonetarieCorrette = parseInt(venditeMonetarie); //tolgo gli apici '' in un numero
                if (leMieVendite[mese] === undefined) {
                    leMieVendite[mese] = 0;
               }
               leMieVendite[mese] += venditeMonetarieCorrette;
               }

               for (var chiave in leMieVendite) {
                    mesiDiVendita.push(chiave);
                    datiVenditeMxM.push(leMieVendite[chiave])
               }

               console.log(mesiDiVendita);
               console.log(datiVenditeMxM);
          },
          error: function(){
               alert('errore');
          }
     });



     //IL MIO GRAFICO
     var myChart = new Chart($('#grafico-delle-vendite'), {
         type: 'line',
         data: {
             labels: mesiDiVendita,
             datasets: [{
                  label: 'Vendite mensili',
                 backgroundColor: [
                     'rgba(255, 99, 132, 0.2)',
                 ],
                 borderColor: [
                     'rgba(255, 99, 132, 1)',
                     'rgba(54, 162, 235, 1)',
                     'rgba(255, 206, 86, 1)',
                     'rgba(75, 192, 192, 1)',
                     'rgba(153, 102, 255, 1)',
                     'rgba(255, 159, 64, 1)'
                 ],
                 data: datiVenditeMxM
             }]
         },
    });


});
