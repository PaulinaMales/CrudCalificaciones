import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';

//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //FUNCIONES CALFICACIONES 
  //credentials: FormGroup;

  profile = null;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    //private formBuilder: FormBuilder,

  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });

    /*this.credentials = this.formBuilder.group({
      estudiante: ['', Validators.required],
      calificacion: ['', Validators.required],
    });*/
  }

  /*ngOnInit() {
    this.credentials = this.formBuilder.group({
      estudiante: ['', Validators.required],
      calificacion: ['', Validators.required]
    });
  }*/
  

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  //FUNCIONES CALIFICACIONES 
  /*crearCalificacion() {
    const estudiante = this.credentials.value.estudiante;
    const calificacion = this.credentials.value.calificacion;

    this.avatarService.crearCalificacion(estudiante, calificacion)
      .then(() => {
        // Calificación creada exitosamente
        // Realiza cualquier acción adicional necesaria
      })
      .catch((error) => {
        // Error al crear la calificación
        console.error(error);
      });
  }

  editarCalificacion() {
    const estudiante = this.credentials.value.estudiante;
    const calificacion = this.credentials.value.calificacion;

    this.avatarService.editarCalificacion(estudiante, calificacion)
      .then(() => {
        // Calificación editada exitosamente
        // Realiza cualquier acción adicional necesaria
      })
      .catch((error) => {
        // Error al editar la calificación
        console.error(error);
      });
  }
*/
  /*borrarCalificacion() {
    const estudiante = this.credentials.value.estudiante;

    this.avatarService.borrarCalificacion(estudiante)
      .then(() => {
        // Calificación borrada exitosamente
        // Realiza cualquier acción adicional necesaria
      })
      .catch((error) => {
        // Error al borrar la calificación
        console.error(error);
      });
  }*/

  //FUNCIONES NOTAS
  
}
