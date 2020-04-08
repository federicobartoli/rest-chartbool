$(document).ready(function () {

     var leMieVendite = {};
     var venditeRappresentanti = {};
     var totaleVendite = 0;
     $.ajax({
          url: "http://157.230.17.132:4001/sales",
          method: 'GET',
          success: function(response){
               var costruttore = costruttoreDati(response);
               creoGrafico('line','#grafico-delle-vendite',costruttore.mesiDiVendita , costruttore.datiVenditeMxM);
          },
          error: function(){
               alert('errore');
          }
     });
     $.ajax({
          url: "http://157.230.17.132:4001/sales",
          method: 'GET',
          success: function(response){
               var costruttore = costruttoreDati(response);
               creoGrafico('pie','#graficotorta-delle-vendite',costruttore.rappresentantiNomi , costruttore.datiRappNomi);
          },
          error: function(){
               alert('errore');
          }
     });

     $('input[type=submit]').click(function () {
          if($('#venditori').val() != undefined && $('#soldi').val() != 0 && $('#date').val()!= 0){
               var nomeVenditore = $('#venditori').val();
               var dataOperazione= $('#date').val(); //!!!!!Data presa da input da non utilizzare!!!
               var importoOperazione= parseInt($('#soldi').val());
               //-----Passaggio per prendere un formato giusto della data------
               var dataArray = dataOperazione.split('-');
               var arrayRev = dataArray.reverse();
               var dataCorretta = arrayRev.join("/");
               //-------------Fine------------

               //----INIZIO CHIAMATA AJAX------
               var settings = {
               "url": "http://157.230.17.132:4001/sales/",
               "method": "POST",
               "timeout": 0,
               "headers": {
                 "Content-Type": "application/json"
               },
               "data": JSON.stringify({"salesman":nomeVenditore,"amount":importoOperazione,"date":dataCorretta}),
};

          $.ajax(settings).done(function (response) {
          console.log(response);
          //----FINE CHIAMATA AJAX------
          });



          }else {
               alert('Componi il form in maniera corretta')
          }
     })

     // id: 1
     // salesman: "Marco"
     // amount: 9000
     // date: "12/02/2017"

     function costruttoreDati(response) {
          for (var i = 0; i < response.length; i++) {
               var venditaSingolaGenerale = response[i];
               var dataVendita = venditaSingolaGenerale.date;
               console.log(venditaSingolaGenerale);
               var tempo = moment(dataVendita, "DD-MM-YYYY"); //uso moment
               var mese = tempo.format('M');
               var rappresentante = venditaSingolaGenerale.salesman
               var venditeMonetarie = venditaSingolaGenerale.amount
               var venditeMonetarieCorrette = parseInt(venditeMonetarie); //tolgo gli apici '' in un numero
               var venditeApprossimate = Math.floor(venditeMonetarieCorrette)
               if (venditeRappresentanti[rappresentante] === undefined){
                    venditeRappresentanti[rappresentante] = 0;
               }
               venditeRappresentanti[rappresentante] += venditeApprossimate;
               totaleVendite += venditeMonetarieCorrette;
               if (leMieVendite[mese] === undefined) {
                    leMieVendite[mese] = 0;
               }
               leMieVendite[mese] += venditeMonetarieCorrette;
          }

          var mesiDiVendita = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
          var datiVenditeMxM = [];
          var rappresentantiNomi = [];
          var datiRappNomi = [];
          for (var key in venditeRappresentanti) {
               rappresentantiNomi.push(key);
               var n = (venditeRappresentanti[key]/totaleVendite * 100).toFixed(2);
               console.log(n);
               datiRappNomi.push(n);
          }

          for (var chiave in leMieVendite) {
               datiVenditeMxM.push(leMieVendite[chiave])
          }
          return {
               mesiDiVendita: mesiDiVendita,
               datiVenditeMxM: datiVenditeMxM,
               rappresentantiNomi: rappresentantiNomi,
               datiRappNomi: datiRappNomi
          }
     }

     //IL MIO GRAFICO
     function creoGrafico(tipologiagrafico,grafico,mesiDiVendita , datiVenditeMxM) {
          var myChart = new Chart($(grafico), {
              type: tipologiagrafico,
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
                          'rgba(255, 159, 64, 1)',
                          'black',
                          'red',
                          'yellow',
                          'lightgreen',
                          'purple',
                          'lightblue'
                      ],
                      data: datiVenditeMxM,
                      lineTension: 0,

                 }],
                 options:{
                      dataIndex: '%'
                 }
              },
         });
     }


});
