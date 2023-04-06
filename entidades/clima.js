export class Clima{
    is_day;
    gradosC;
    gradosF;
    humedad;
    condicion;

    constructor(is_day, gradosC, gradosF, humedad, condicion){
        this.is_day = is_day;
        this.gradosC = gradosC;
        this.gradosF = gradosF;
        this.humedad = humedad;
        this.condicion = condicion;
    }

    retornarDatosFormateados(){
        let retorno = new Clima();

        retorno.is_day = this.is_day;
        retorno.gradosC = `Grados Centigrados: ${this.gradosC}°C`;
        retorno.gradosF = `Grados Farenheite: ${this.gradosF}°F`;
        retorno.humedad = `Porcentaje de Humedad: ${this.humedad}%`;
        retorno.condicion = this.traducirCondicion(this.condicion);
         
        return retorno;
    }

    traducirCondicion(condicion){
        let despejado = ['sunny', 'clear'];
        let nublado = ['overcast', 'cloudy'];
        let lluvia = ['rain', 'showers', 'storm'];
        let neblina = 'mist';
        let nieve = 'snow';

        if(condicion.toLowerCase().includes(despejado[0]) || condicion.toLowerCase().includes(despejado[1])){
            return 'Soleado';
        }
        else if(condicion.toLowerCase().includes(nublado[0]) || condicion.toLowerCase().includes(nublado[1])){
            return 'Nublado';
        }
        else if(condicion.toLowerCase().includes(lluvia[0]) || condicion.toLowerCase().includes(lluvia[1]) || condicion.toLowerCase().includes(lluvia[2])){
            return 'Lluvioso';
        }
        else if(condicion.toLowerCase().includes(neblina)){
            return 'Neblina';
        }
        else if(condicion.toLowerCase().includes(nieve)){
            return 'Nieve';
        }
        
        return 'Indefinido';
    }

}