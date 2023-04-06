import { Clima }  from './entidades/clima.js';

window.onload = () => {
    abrirConsola();
    cerrarConsola();
    aplicarFx();
    ocultarParrafoProyecto();
    abrirModalClima();
};

const error_ref = document.getElementById('error');

const abrirConsola = () => {
    const a_ref = document.getElementById('consola');
    const terminal_ref = document.getElementById('terminal');
    const pointer_ref = document.getElementById('pointer');

    a_ref.addEventListener('click', () => {
        terminal_ref.style.display = 'block';
        pointer_ref.style.display = 'none';
    });
}

const cerrarConsola = () => {
    const cerrar_ref = document.getElementById('cerrarConsola');
    const terminal_ref = document.getElementById('terminal');


    cerrar_ref.addEventListener('click', () => {
        terminal_ref.style.display = 'none';
    });
}

const aplicarFx = () => {
    const underline_ref = document.getElementById('underline');
    const presentacion_ref = document.getElementById('presentacion');
    const anclas_ref = document.getElementsByClassName('ancla');
    const main2_ref = document.getElementById('main-2');
    const main3_ref = document.getElementById('main-3')

    for(let i = 0; i < anclas_ref.length; i++){
        anclas_ref[i].addEventListener('click', (e) => {
            e.preventDefault();

            if(i == 0)
            main2_ref.scrollIntoView({block: "start", behavior: "smooth"});
            else
            main3_ref.scrollIntoView({block: "start", behavior: "smooth"});

        });
    }
    
    window.addEventListener('scroll', () => {
        let top = underline_ref.getBoundingClientRect().top;

        if(top < 700){
            underline_ref.style.width = '90%';
        }
        else if(top < 1500){
            presentacion_ref.style.opacity = '1';
            presentacion_ref.style.transform = 'translate(0)';
            
        }
    });
}

const ocultarParrafoProyecto = () => {
   
    const proyectos_ref = document.getElementsByClassName('divProyecto');
    
    for(let i = 0; i < 4; i++){

        proyectos_ref[i].addEventListener('mouseover', (e) => {
            proyectos_ref[i].firstElementChild.style.display = 'none'; 
        });

        proyectos_ref[i].addEventListener('mouseleave', (e) => {
            proyectos_ref[i].firstElementChild.style.display = 'flex';
        });
    }
}

const abrirModalClima = () => {
    const opcion3_ref = document.getElementById('opcion3');
    const modal_ref = document.getElementById('modal');
    const cerrarModal_ref = document.getElementsByClassName('cerrarModal')[0].firstElementChild;
    const consultar_ref = document.getElementsByClassName('consultaClima')[0].firstElementChild;
    const ciudad_ref = document.getElementsByName('ciudad')[0];

    opcion3_ref.addEventListener('click', () => {
        modal_ref.style.display = 'flex';
        modal_ref.showModal(); 
    });

    cerrarModal_ref.addEventListener('click', () => {
        modal_ref.style.display = 'none';
        modal_ref.close();
    });

    consultar_ref.addEventListener('click', () => {
        

        if(validarInputsClima(ciudad_ref.value)){
            error_ref.style.visibility = 'hidden';
            consultarClima(ciudad_ref.value);
        }
        else{
            error_ref.style.visibility = 'visible';
        }        
    });
    
}

function consultarClima(ciudad){
    const options = {
            method: 'GET',
            headers: {
            'X-RapidAPI-Key': '9b02cd9199msh4a4b6fd609b408fp1f3326jsnbd3421d41521',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }};
    
        fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${ciudad}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            error_ref.style.visibility = 'hidden';

            let is_day = response.current.is_day;
            let gradosC = response.current.temp_c;
            let gradosF = response.current.temp_f;
            let humedad = response.current.humidity;
            let condicion = response.current.condition.text;
            
            let clima = new Clima(is_day, gradosC, gradosF, humedad, condicion);
            let region = response.location.region;
            let pais = response.location.country;
            
            insertarDatosClima(clima, ciudad, region, pais);
        })
        .catch(() => error_ref.style.visibility = 'visible'); 
}

const insertarDatosClima = (objClima, ciudad, region, pais) => {
    const datosClima_ref = document.getElementById('datosClima');
    let climaFormateado = objClima.retornarDatosFormateados();
    let parrafo = document.createElement('p');
    let texto = document.createTextNode(`Clima de hoy en ${ciudad} - ${region} - ${pais}`);

    eliminarNodosHijos(datosClima_ref);
    cambiarImg(climaFormateado);
    datosClima_ref.style.display = 'flex';

    parrafo.appendChild(texto);
    datosClima_ref.appendChild(parrafo);
    
    for(let key in climaFormateado){

        if(key != 'is_day'){
            parrafo = document.createElement('p');
            texto = document.createTextNode(climaFormateado[key]);
        
            parrafo.appendChild(texto);
            datosClima_ref.appendChild(parrafo);
        }
    }
}

function validarInputsClima(ciudad){
    let regExp = new RegExp('[a-zA-Z ]{2,20}');

    return regExp.test(ciudad);
}

function cambiarImg(objClima){
    const respuestaApi_ref = document.getElementById('respuesta');
    const divImg = respuestaApi_ref.firstElementChild;
    let img = document.createElement('img');

    if(divImg.hasChildNodes()){
        divImg.removeChild(divImg.firstElementChild);
    }

    if(objClima.is_day == 1){
        respuestaApi_ref.classList.remove('respuestaApiNoche');
        respuestaApi_ref.classList.add('respuestaApi');

        if(objClima.condicion == 'Soleado'){
            img.setAttribute('src', './assets/clima/soleado.png');
            img.setAttribute('alt', 'soleado.png');
        }
    }
    else if(objClima.is_day == 0){
        respuestaApi_ref.classList.remove('respuestaApi');
        respuestaApi_ref.classList.add('respuestaApiNoche');

        if(objClima.condicion == 'Soleado'){
            img.setAttribute('src', './assets/clima/luna.png');
            img.setAttribute('alt', 'luna.png');
        }
    }

    
    switch(objClima.condicion){
        case 'Nublado':
            img.setAttribute('src', './assets/clima/nublado.png');
            img.setAttribute('alt', 'nublado.png');
                break;
                case 'Lluvioso':
                img.setAttribute('src', './assets/clima/lluvia.png');
                img.setAttribute('alt', 'lluvia.png');
                    break;
                    case 'Neblina':
                        img.setAttribute('src', './assets/clima/nublado.png');
                        img.setAttribute('alt', 'neblina.png');
                        break;
                        case 'Nieve':
                            img.setAttribute('src', './assets/clima/nieve.png');
                            img.setAttribute('alt', 'nieve.png');
                            break;
    }

    divImg.appendChild(img);
}

function eliminarNodosHijos(nodo){
    let nodoHijo;
    while(nodo.hasChildNodes()){
        nodoHijo = nodo.removeChild(nodo.firstElementChild);
    }
}