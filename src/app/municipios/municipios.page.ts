import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiServiceProvider } from '../api/api-service';
import { InterfaceMunicipio } from '../model/PrevisionTiempo';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.page.html',
  styleUrls: ['./municipios.page.scss'],
})
export class MunicipiosPage implements OnInit {
  public municipios: InterfaceMunicipio[] = new Array();
  public municipiosBuscados: InterfaceMunicipio[] = new Array();
  public municipioBuscar: string = '';

  constructor(
    private apiService: ApiServiceProvider,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.apiService
      .getMunicipios()
      .then((data: InterfaceMunicipio[]) => {
        this.municipios = data;
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_ngOnInit

  buscarMunicipio() {
    if (this.municipioBuscar.trim() == '') {
      this.municipiosBuscados = new Array();
      return;
    }
    this.municipiosBuscados = new Array();
    this.municipios.forEach((municipio) => {
      if (
        municipio.MUNICIPIO.toUpperCase().startsWith(
          this.municipioBuscar.trim().toUpperCase()
        )
      ) {
        this.municipiosBuscados.push(municipio);
      }
    });
  }

  municipioClick(municipio: InterfaceMunicipio) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        municipio: JSON.stringify(municipio),
      },
    };
    this.navCtrl.navigateForward('/home', navigationExtras);
  }
}
