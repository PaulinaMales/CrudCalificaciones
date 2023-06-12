import { Component, Input, OnInit } from '@angular/core';
import { DataService, Note } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() note: Note; // Recibe la nota completa como entrada

  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    // No se necesita llamar a dataService.getNoteById() ya que la nota se pasa directamente desde home.page.ts
  }

  async deleteNote() {
    await this.dataService.deleteNote(this.note)
    this.modalCtrl.dismiss();
  }
  

  updateMessage: string = null;

  async updateNote() {
    await this.dataService.updateNote(this.note);
    const toast = await this.toastCtrl.create({
      message: 'Note updated!.',
      duration: 2000
    });
    toast.present();
    this.updateMessage = 'Note updated!';
  }

  calculateFinalGrade(): string {
    const weights = [0.2, 0.2, 0.2, 0.1, 0.3];
    const grades = this.note.grades;
    let finalGrade = 0;
  
    if (weights.length === grades.length) {
      for (let i = 0; i < weights.length; i++) {
        finalGrade += (weights[i] * grades[i]);
      }
    }
  
    // Escalar la nota final de 20 a 100
    finalGrade = finalGrade * 5;
  
    // Redondear la nota final a 2 decimales
    finalGrade = Math.round(finalGrade * 100) / 100;
  
    return finalGrade.toString();
  }
  
  
  
}
