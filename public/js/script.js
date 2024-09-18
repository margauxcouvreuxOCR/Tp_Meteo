$(function () {
    $('#errorLocation').hide();
    $('#resultats').hide();

    $('#titre1').on('click', function () {
        location.reload();
    });

    // Requête API pour la géolocalisation de l'utilisateur
    $('#boutonPosition').on('click', function () {
        viderContenu();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                console.log("latitude : " + latitude);
                console.log("longitude : " + longitude);
                var locationValue = "lat=" + latitude + "lng=" + longitude; // Récupérer la valeur de l'input
                console.log(locationValue);
                meteo_data(locationValue);
            });
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    });


    // Gestionnaire d'événements pour le bouton Recherche
    $('#boutonRecherche').click(function () {
        viderContenu();
        var inputValue = "";
        inputValue = $('#searchBar').val(); // Récupérer la valeur de l'input
        console.log("value bouton recherche : " + inputValue);
        afficherResultat(inputValue); // Appeler la fonction avec la valeur de l'input
        
    });


        // Fonction pour gérer l'affichage des résultats
        function afficherResultat(valeur) {
            console.log("afficher recherche : " + valeur);
            if (valeur.trim() === '') {
                $('#errorLocation').text('Le champ de recherche est vide. Veuillez entrer une ville.');
                $('#errorLocation').show();
            } else {
                $('#errorLocation').hide();
                meteo_data(valeur);
            }
        };

    async function meteo_data(inputValue) {

        try {

            console.log("Mon entree : " + inputValue);
            const promesse = await fetch('https://www.prevision-meteo.ch/services/json/' + inputValue);

            console.log("promise : " + promesse);
            console.log(promesse);

            if (!promesse.ok) {
                throw new Error(`Erreur HTTP: ${promesse.status}`);
            }

            const monJson = await promesse.json();
            console.log("monJson :");
            console.log(monJson);


            
            console.log("Pays : " + monJson.city_info.country);


            $('#resultats').show();
            if (monJson.city_info.name != "NA") {
                $('#lieuGeographique').append('<p>' + monJson.city_info.name + '</p>');
            } else {
                $('#lieuGeographique').append('<p>' + "Latitude : " + monJson.city_info.latitude + '</p>' + '<p>' + "Longitude : " + monJson.city_info.longitude + '</p>');
            }

            $('#j0').append('<p><img src="' + monJson.fcst_day_0.icon + '" alt="" class="inline"></img>' + " " + monJson.fcst_day_0.day_short + " " + monJson.fcst_day_0.date + " " + monJson.fcst_day_0.tmax + "°C" + '</p>');
            $('#j1').append('<p><img src="' + monJson.fcst_day_1.icon + '" alt="" class="inline"></img>' + " " + monJson.fcst_day_1.day_short + " " + monJson.fcst_day_1.date + " " + monJson.fcst_day_1.tmax + "°C" + '</p>');
            $('#j2').append('<p><img src="' + monJson.fcst_day_2.icon + '" alt="" class="inline"></img>' + " " + monJson.fcst_day_2.day_short + " " + monJson.fcst_day_2.date + " " + monJson.fcst_day_2.tmax + "°C" + '</p>');
            $('#j3').append('<p><img src="' + monJson.fcst_day_3.icon + '" alt="" class="inline"></img>' + " " + monJson.fcst_day_3.day_short + " " + monJson.fcst_day_3.date + " " + monJson.fcst_day_3.tmax + "°C" + '</p>');
            $('#j4').append('<p><img src="' + monJson.fcst_day_4.icon + '" alt="" class="inline"></img>' + " " + monJson.fcst_day_4.day_short + " " + monJson.fcst_day_4.date + " " + monJson.fcst_day_4.tmax + "°C" + '</p>');

        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération depuis le web service :", error);
        }

    };

    function viderContenu() {
        $('#errorLocation').hide();
        $('#resultats').hide();
        $('#lieuGeographique').empty();
        $('#j0').empty();
        $('#j1').empty();
        $('#j2').empty();
        $('#j3').empty();
        $('#j4').empty();
    }

});