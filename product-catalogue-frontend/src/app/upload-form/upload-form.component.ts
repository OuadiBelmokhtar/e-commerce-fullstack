import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/FileUpload.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage?: number;

  // la valeur de ce champ sera passee pas le component appelant. Il represente l URL stocke ds la BD
  @Input() photoURL: string = "";
  // Le param 'typeUpload' permet de specifier l'action d'upload a faire ('add' or 'update') ds FireStorage.
  // Ajouter ou pr modifier les photos ds FireStorage.
  @Input() typeUpload: string = "";


  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  // Cette mtd est utilisee pr ajouter et pr modifier les photos ds FireStorage.
  uploadPhoto(): void {
    let file: any = this.selectedFiles?.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
   // alert(this.typeUpload);
   // '@Input() typeUpload' permet de specifier l'action d'upload a faire ('add' or 'update')
    if (this.typeUpload == 'add') {
      this.uploadService.addPhotoToFireStorage(this.currentFileUpload).subscribe(
        percentage => {
          this.percentage = Math.round(percentage);

        },
        error => {
          console.log(error);
        }
      );

    } else if (this.typeUpload == 'update') {
      // je passe photoURL qui represente l URL stocke ds la BD
      this.uploadService.updatePhotoInFireStorage(this.currentFileUpload, this.photoURL).subscribe(
        percentage => {
          this.percentage = Math.round(percentage);

        },
        error => {
          console.log(error);
        }
      );
    }
  }


}
