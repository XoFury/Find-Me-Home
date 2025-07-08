function getFormValues() {
    return {
        location: document.getElementById("uiLocations").value,
        total_sqft: document.getElementById("sqft").value,
        bhk: document.getElementById("bedrooms").value,
        bath: document.getElementById("bathrooms").value
    };
}

function onPredictPrice() {
    const { location, total_sqft, bhk, bath } = getFormValues();

    // Simple validation
    if (!location || !total_sqft || !bhk || !bath) {
        alert("Please fill in all the fields before predicting.");
        return;
    }

    const url = "http://127.0.0.1:5000/predict_home_price";

    $.ajax({
        url: url,
        type: "POST",
        data: {
            location: location,
            total_sqft: total_sqft,
            bhk: bhk,
            bath: bath
        },
        success: function(data) {
            if (data.estimated_price) {
                document.getElementById("uiEstimatedPrice").innerHTML =
                    `<h2>Estimated Price: ₹ ${data.estimated_price} Lakhs</h2>`;
            } else {
                document.getElementById("uiEstimatedPrice").innerHTML =
                    `<h2>Could not estimate price. Please check inputs.</h2>`;
            }
        },
        error: function(xhr, status, error) {
            console.error("Error from server:", error);
            document.getElementById("uiEstimatedPrice").innerHTML =
                `<h2>Server error. Try again later.</h2>`;
        }
    });
}


function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;