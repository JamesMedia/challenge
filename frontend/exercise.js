document.addEventListener("DOMContentLoaded", function() {

    var app = (function app() {

        var showExpired = document.getElementById('button-expired');
        console.log(showExpired);

        showExpired.addEventListener('click', function(e) {
            var records = document.getElementsByClassName("dea-record");
            for(var i = 0; i < records.length; i++)
            {
                var record = records.item(i);
                var status = record.dataset.status
               console.log(status);
                if (status != 'expired') {
                    record.style.display = 'none';;
                }
            }
        });

        var cs = function(result) {

            result.sort(function(a,b){
                var aDate = new Date(a.expiration_date)
                var bDate = new Date(b.expiration_date)
                return aDate.getTime() - bDate.getTime()
            });

            outputResults(result, 'all');

        };
        csApi.getData(cs);

    });

    app();
});


function toggleDetail(npi) {
    var displayValue = document.getElementById('detail_' + npi).style.display;
    if(displayValue === 'block'){
        document.getElementById('detail_' + npi).style.display = 'none';
    }else{
        document.getElementById('detail_' + npi).style.display = 'block';
    }
}

function outputResults(result, status){
    var records = '';
    var now = new Date();
    var status = '';

    for(var i = 0; i<=30; i++){
        console.log(result[i]);

        var expiryDate = new Date(result[i].expiration_date);
        var statusHtml = '';
        if(expiryDate >= now){
            status = 'active';
            statusHtml = '<div class="alert alert-active pull-right" >Active</div>'
        }else{
            status = 'expired';
            statusHtml = '<div class="alert alert-expired pull-right" >Expired</div>'
        }

        records += '<div class="dea-record" data-status="'+ status + '">' +
            '<div class="row record-header" onclick="toggleDetail(' + result[i].npi + ')">' +
            '<div class="col-xs-6">' +
            '<h3>' + result[i].name + '</h3>' +
            '</div>' +
            '<div class="col-xs-6">' + statusHtml + '</div>' +
            '</div>' +
            '<div id="detail_' + result[i].npi + '" class="record-detail"> ' +
            '<div class="row">' +
            '<div class="col-xs-6">' +
            '<p>Dea Number: ' + result[i].dea_number + '</p>' +
            '</div>' +
            '<div class="col-xs-6">Expiration Date: ' + result[i].expiration_date + '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-xs-6">' +
            '<p>NPI: ' + result[i].npi + '</p>' +
            '</div>' +
            '<div class="col-xs-6">Provider ID: ' + result[i].provider_id + '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    document.getElementById('dea-records').innerHTML = records;
}



