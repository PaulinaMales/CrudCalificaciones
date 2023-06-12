import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService, Note } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})



export class HomePage {
  notes: Note[] = [];

  constructor(private dataService: DataService, private authService: AuthService,private router: Router, private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getNotes().subscribe(res => {
      this.notes = res;
      this.cd.detectChanges();
    });
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Calificaciones',
      cssClass: 'my-custom-alert',
      inputs: [
        {
          name: 'title',
          placeholder: 'Nombre del Estudiante',
          type: 'text'
        },
        {
          name: 'grade1',
          placeholder: 'Calificación 1',
          type: 'number'
        },
        {
          name: 'grade2',
          placeholder: 'Calificación 2',
          type: 'number'
        },
        {
          name: 'grade3',
          placeholder: 'Calificación 3',
          type: 'number'
        },
        {
          name: 'grade4',
          placeholder: 'Calificación 4',
          type: 'number'
        },
        {
          name: 'grade5',
          placeholder: 'Calificación 5',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: res => {
            const grades = [
              res.grade1,
              res.grade2,
              res.grade3,
              res.grade4,
              res.grade5
            ];
            this.dataService.addNote({
              title: res.title,
              grades: grades
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { note: note }, // Pasa la nota completa como prop en lugar del ID
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
  
    await modal.present();
  }
  

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}