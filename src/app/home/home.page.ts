import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from '../api/api-service';
import { EstadoCielo, InterfaceMunicipio, PrevisionTiempo } from '../model/PrevisionTiempo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  estadosCielo:Array<EstadoCielo> = new Array();
  municipio = "41091"
  municipios:InterfaceMunicipio[]=new Array;
  constructor(private apiService: ApiServiceProvider) {
  }
  ngOnInit(): void {
    this.getPrevisionMunicipios();
    this.getAllMunicipios();
}
  getPrevisionMunicipios():void{
    this.apiService.getPrevisionDiariaMunicipio(this.municipio).then((data:PrevisionTiempo[]) =>{
      //prevision del tiempo de hoy
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
  getAllMunicipios():void{
    this.apiService.getMunicipios().then((data:InterfaceMunicipio[] ) =>{
      //console.log(data);
      for (var i =0; i<data.length;i++){
        this.municipios?.push(data[i]);
      }
        console.log(this.municipios);
    }).catch((error:string)=>{
      console.log(error);
    })
  }

}
