import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/FileUpload.model'
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

// This service uses @angular/fire‘s AngularFireStorage to interact with Firebase Storage. 
// It contains necessary functions for upload/get/delete file operations.
export class FileUploadService {

  private basePath = '/products-img-uploads';
  photoDwonloadURLFromFireStorage: any;

  constructor(private storage: AngularFireStorage) { }

  // photoName sera passe ave extension '.jpeg'
  private pushFileToStorage(fileToUpload: FileUpload, photoName: string): Observable<any> {
    const filePath = `${this.basePath}/${photoName}`;
    // const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    // permet d'ajouter la photo ds FireStorage si elle n'existe pas. Sinon, 
    // si le 'photoName' specifie ds 'filePath' existe deja, la photo existante sera remplacee par
    // la nouvelle photo uploadée tte en gardant le meme nom.
    const uploadTask = this.storage.upload(filePath, fileToUpload.file);

    uploadTask.snapshotChanges().pipe(
      //To get the url of the uploaded file, we use the RxJS finalize() method with getDownloadURL() 
      // which doesn’t rely on the task. So we can get notified when the download URL is available.
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          // ajoute par par moi, pr recup URL photo
          this.photoDwonloadURLFromFireStorage = downloadURL;
          fileToUpload.url = downloadURL;
          fileToUpload.name = fileToUpload.file.name;
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  public addPhotoToFireStorage(fileToUpload: FileUpload) {
    // ajoute par par moi, pr renommer la photo via un UUID avant stockage ds Firebase Storage
    let photoName = uuidv4();
    return this.pushFileToStorage(fileToUpload, photoName + ".jpeg");
  }

  public updatePhotoInFireStorage(fileToUpload: FileUpload, existingPhotoUrl: string) {
    let existingPhotoName: string = this.extractPhotoNameFromPhotoURL(existingPhotoUrl);
    // voir explication ds pushFileToStorage()>>storage.upload()
    return this.pushFileToStorage(fileToUpload, existingPhotoName + ".jpeg");
  }

  //delete file from Firebase Storage
  public deletePhotoFromFireStorage(fileUrl: string): void {
    const storageRef = this.storage.ref(this.basePath);
    //alert(this.getPhotoNameFromPhotoURL(fileUrl));
    // fileUrl contient l'URL absolut provenant de Firebase Storage
    let photoName: string = this.extractPhotoNameFromPhotoURL(fileUrl);
    if (photoName != "uknown") {
      storageRef.child(photoName + ".jpeg").delete();
    }
  }



  // extraire juste le nom de la photo(uuid) sans extension '.jpeg'
  private extractPhotoNameFromPhotoURL(fileUrl: string): string {
    // exp d'URL provenant de Firebase Storage
    /*https://firebasestorage.googleapis.com/v0/b/e-com-prod-storage.appspot.com/
    o/products-img-uploads%2F4941b5f0-e232-47f8-a4cd-95da9b5b6ac3.jpeg?alt=media&token=
    302211f5-892e-49d2-adfd-49a2dcaa22cd
    */
    let photoName = fileUrl.substring(
      fileUrl.indexOf("%") + 3,
      fileUrl.lastIndexOf(".jpeg")
    );
    return photoName;
  }

}
