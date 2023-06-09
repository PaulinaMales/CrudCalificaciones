import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl,
      });
      return true;
    } catch (e) {
      return null;
    }
  }

  //FUNCIONES CALIFICACIONES 
    // Crear calificación
   /* crearCalificacion(estudiante: string, calificacion: number) {
      const user = this.auth.currentUser;
      const calificacionDocRef = doc(this.firestore, `calificaciones/${user.uid}`);
  
      return setDoc(calificacionDocRef, {
        [estudiante]: calificacion,
      }, { merge: true });
    }
  
    // Editar calificación
    editarCalificacion(estudiante: string, calificacion: number) {
      const user = this.auth.currentUser;
      const calificacionDocRef = doc(this.firestore, `calificaciones/${user.uid}`);
  
      return updateDoc(calificacionDocRef, {
        [estudiante]: calificacion,
      });
    }*/
  
    /* Borrar calificación
    borrarCalificacion(estudiante: string) {
      const user = this.auth.currentUser;
      const calificacionDocRef = doc(this.firestore, `calificaciones/${user.uid}`);
  
      return updateDoc(calificacionDocRef, {
        [estudiante]: Firestore.FieldValue.delete(),
      });
    }*/
}
