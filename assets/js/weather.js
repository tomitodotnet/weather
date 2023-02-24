

import { weather_data } from './data.js';

let listaciu = document.getElementById("dropdownMenuButton");

let loadDayForecastData = () => {
	
    let claveciudad = listaciu.value;

    cargar(claveciudad);
 
 
}

function cargar (claveciudad)
{

    let dato = obtener(claveciudad, "city" );
    document.getElementById("city").innerHTML = dato;

     dato = obtener(claveciudad, "date" );
    document.getElementById("date").innerHTML = dato;

    dato = obtener(claveciudad, "maxtemperature" );
    document.getElementById("maxtemperature").innerHTML = dato;

    dato = obtener(claveciudad, "mintemperature" );
    document.getElementById("mintemperature").innerHTML = dato;

    

    dato = obtener(claveciudad, "cloudiness" );
    document.getElementById("cloudiness").innerHTML = dato;

    dato = obtener(claveciudad, "wind" );
    document.getElementById("wind").innerHTML = dato;

    dato = obtener(claveciudad, "rainfall" );
    document.getElementById("rainfall").innerHTML = dato;

     dato = obtenerHoy(claveciudad, "late", "text");
    document.getElementById("late_text").innerHTML = dato;

    dato = obtenerHoy(claveciudad, "late", "temperature");
    document.getElementById("late_temperature").innerHTML = dato;

    dato = obtenerHoy(claveciudad, "late", "forecast");
    document.getElementById("late_forecast").innerHTML = dato;

    dato = obtenerHoy(claveciudad, "late", "icon");
    document.getElementById("late_icon").innerHTML = dato;


    dato = obtenerHoy(claveciudad, "night", "text");
    document.getElementById("night_text").innerHTML = dato;

    dato = obtenerHoy(claveciudad, "night", "temperature");
    document.getElementById("night_temperature").innerHTML = dato;

    dato = obtenerHoy(claveciudad, "night", "forecast");
    document.getElementById("night_forecast").innerHTML = dato;
    dato = obtenerHoy(claveciudad, "night", "icon");
    document.getElementById("night_icon").innerHTML = dato;

}

function obtener( clave , valor){
    let dato ="";
    weather_data.forEach(element => {
        if ( element.city_code === clave)
            dato = element[valor]
    });

    return dato;
}
function obtenerHoy( clave, lapso , campo ){
    let lapsos = [];
    weather_data.forEach(element => {
        if ( element.city_code === clave)
             lapsos = element.forecast_today;
    });

    

    let valor ="";
    lapsos.forEach(element => {
        if ( element.lapse === lapso)
             valor = element[campo];
    });

    return valor;
   
}


function obtenerWeek( clave, listado ){
    let semana = [];
    weather_data.forEach(element => {
        if ( element.city_code === clave)
        semana = element.forecast_week;
    });


let comi = String.fromCharCode(34);
    let valor ="";
    let valorI ="";
    semana.forEach(element => {

        let lista = document.createElement("li");

        valorI = "<li class=";
        valorI = valorI + comi + "list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg" + comi + ">";
        valorI = valorI + "<div class=" + comi + "d-flex flex-column" + comi +">"
        valorI = valorI + "<h6 class=" + comi + "mb-1 text-dark font-weight-bold text-sm" + comi +">" + element.text + "</h6>";
        valorI = valorI + "<span class=" + comi + "text-xs" + comi +">" + element.date + "</span>";
        valorI = valorI + "</div>";
        valorI = valorI + "<div class=" + comi + "d-flex align-items-center" + comi +">"
   
        valorI = valorI + "<span class=" + comi + "font-weight-bold text-dark mx-2" + comi +">" + element.temperature.max + "</span>";  
        valorI = valorI + "<span class=" + comi + "text-dark mx-2" + comi +">" + element.temperature.min + "</span>";  

        valorI = valorI + "<div class=" + comi + "ms-4" + comi +"><i class=" + comi + "material-icons fs-2 me-1 rainy" + comi +">" +  element.icon + "</i></div>";
        valorI = valorI + "</div>";
        valorI = valorI + "</li>";
    
        lista.innerHTML = valorI;
        //document.getElementsByClassName(listado)[0].appendChild(lista);
        valor = valor + valorI;
    
    });

    return valor;
   
}

function cargarweek (claveciudad)
{

    let dato = obtenerWeek(claveciudad, "list-group");
    
    document.getElementsByClassName("list-group")[0].innerHTML = dato;
    
   //alert(dato);
}

let loadWeekForecastData = () => {
	
	let claveciudad = listaciu.value;

    cargarweek(claveciudad);
}


//loadDayForecastData();
//loadWeekForecastData();

function cargarlistado()
{

    let opcion0 = '<option value="" selected disabled hidden>Seleccione una ciudad</option> ';
    let mensaje = "";
    weather_data.forEach(element => {
         let { city_code: city_code_var , city : city_var } = element;
         let opcion = `<option class="dropdown-item" value=${city_code_var} > ${city_var} </option> `;

         //let city_code_var = element.city_code;
         //let city_var = element.city;
         //let opcion = '<option class="dropdown-item" value=' + city_code_var + '>' + city_var + '</option> ';

          mensaje = mensaje + opcion;
    });

     mensaje =  opcion0 + mensaje;

     listaciu.innerHTML = mensaje;


}


document.addEventListener("DOMContentLoaded", (event) => {
    
    cargarlistado();

});

let element = document.getElementById("loadinfo");

element.addEventListener('click', (event) => {
    loadWeekForecastData();

});

listaciu.addEventListener('click', (event) => {
    loadDayForecastData();

    document.getElementsByClassName("list-group")[0].innerHTML = "" ;
  
});


