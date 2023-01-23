import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from '../api/api-service';
import { EstadoCielo, PrevisionTiempo } from '../model/PrevisionTiempo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  estadosCielo:EstadoCielo[];
  municipio = "41091"

  constructor(private apiService: ApiServiceProvider) {
  }
  ngOnInit(): void {
    this.getPrevisionMunicipios();
}
  getPrevisionMunicipios():void{
    this.apiService.getPrevisionDiariaMunicipio(this.municipio).then((data:PrevisionTiempo[]) =>{
      //prevision del tiempo de hoy
      console.log(data[0].prediccion.dia[0].estadoCielo[0]);
      //se tiene que poner ? para prevenir que es null, ya que la interfaz no tiene un constructor
      this.estadosCielo?.push(data[0].prediccion.dia[0].estadoCielo[0]);
      this.estadosCielo?.push(data[0].prediccion.dia[0].estadoCielo[4]);
      this.estadosCielo?.push(data[0].prediccion.dia[0].estadoCielo[5]);
      this.estadosCielo?.push(data[0].prediccion.dia[0].estadoCielo[6]);
      //Prevision del tiempo mañana
      this.estadosCielo?.push(data[0].prediccion.dia[1].estadoCielo[3]);
      this.estadosCielo?.push(data[0].prediccion.dia[1].estadoCielo[4]);
      this.estadosCielo?.push(data[0].prediccion.dia[1].estadoCielo[5]);
      this.estadosCielo?.push(data[0].prediccion.dia[1].estadoCielo[6]);
      

    }).catch((error: string) => {
      console.log(error);
    });
  }

}
