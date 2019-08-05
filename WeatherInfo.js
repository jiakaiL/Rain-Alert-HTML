// check rain or not for today and following 5 days
// when checking, mark the chekced date green background color 
// if rain, that date will have umberella sign beside the date number
function check_six(){
    var today = get_current();
    var predicts = forecast();
    var result = [today].concat(predicts);
    var current = document.getElementById('today');
    var curr_date = current.innerHTML;
    current.style.backgroundColor="green";
    if (result[0]){
        current.innerHTML = curr_date + "&#127746";
    }
    var all_ids = document.querySelectorAll('[id]');
    var last_day_calendar = Number(all_ids[all_ids.length-1].id);
    for (i=1;i<6;i++){  
        var predict_id = Number(curr_date)+i;
        var predict = document.getElementById(predict_id);
        predict.style.backgroundColor="green";
        if (result[i]){
        predict.innerHTML = predict_id+ "&#127746";}
        // prevent search for date not existing
        if (predict_id==last_day_calendar){
            break;
        }
    }
}

// get current weather 
// parameter: string cityID
// return: Boolean
// True: rain currently.  False: not rain currently

function get_current(){
    var cityName = document.getElementById("cityName").value;
    var countryCode= document.getElementById("countryCode").value;
    // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    var str = "http://api.openweathermap.org/data/2.5/weather?q=".concat(cityName);
    var country = ",".concat(countryCode);
    var str2 = str.concat(country);
    var web = str2.concat("&APPID=32f1b7f4fb31b5a375c2693a9276263f");

    // initiating a XMLHttpRequest Synchronous request
    request.open('GET',web,false);

    // send the request
    request.send();

    // this will be called when a result is received

    if (request.status === 200){
        var resp = JSON.parse(request.responseText);
        var curr_weather = resp['weather'][0]['main'];
        var result = !(curr_weather !== "Thunderstorm" && curr_weather !== "Drizzle" &&
            curr_weather !== "Rain" && curr_weather !== "Snow");
            // alert("successful: " + result);
            return result;
        }else{
            const input = (cityName.concat("-")).concat(countryCode);
            const msg = "error finding the current location: ".concat(cityName);
            alert(msg)
            throw msg;
        }
    // };


}


// given a city, get forcast of rain or not for the incoming 5 days 
// parameter: string cityID
// return: list of Boolean
// True: will rain  False: will not rain in that day
function forecast(){
    var cityName = document.getElementById("cityName").value;
    var countryCode= document.getElementById("countryCode").value;
    var request = new XMLHttpRequest();
    var str = "http://api.openweathermap.org/data/2.5/forecast?q=".concat(cityName);
    var country = ",".concat(countryCode);
    var str2 = str.concat(country);
    var web = str2.concat("&APPID=32f1b7f4fb31b5a375c2693a9276263f");

    // initiating a XMLHttpRequest Synchronous request
    request.open('GET',web,false);

    // send the request
    request.send();

    // this will be called when a result is received
    if (request.status === 200){
        var predicts = JSON.parse(request.responseText).list;
        var count = 0;
        var f;
        var rain_list = [];
        for (f of predicts){
            var f_weather = f['weather'][0]['main'];
            var index = Math.floor(count/8);
            if (f_weather !== "Thunderstorm" && f_weather !== "Drizzle" && f_weather !== "Rain"
                && f_weather !== "Snow"){
            if (rain_list.length === index){
                rain_list.push(false);
            }
        }
        else{
            if (rain_list.length === index+1){
                if (rain_list[index] === false){
                    rain_list[index] = true;
                }
            }
            if (rain_list.length === index){
                rain_list.push(true);
            }
        }
        count +=1;
    }
    return rain_list;
}
else {
    const input = (cityName.concat("-")).concat(countryCode);
    const msg = "wrong input: ".concat(input);
    throw msg;
}
}


