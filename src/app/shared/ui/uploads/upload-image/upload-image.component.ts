import { HttpEventType } from '@angular/common/http';
import { 
  Component, 
  ElementRef, 
  EventEmitter, 
  inject, 
  Input,
  Output, 
  ViewChild 
} from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, filter, delay } from 'rxjs/operators';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

import { 
  TokenService,
  FileData,
  TokenData,
  ResponseData
} from "@core";
import { 
  Guid,
  NotificationService
} from "@shared";

import { UploadService } from "../services/upload.service";

@Component({
  selector: 'app-upload-image',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {
  private readonly notificationService = inject(NotificationService);
  private readonly tokenService = inject(TokenService);
  private readonly uploadService = inject(UploadService);

  @Input() subFolder: 'users' | 'products' | 'logos' = 'users';
  @Input() buttonText: string = '';
  @Input() allowMultipleFiles = false;
  @Input() id: number = 0;
  @Input() nameColumn: string = '';
  @Output() endUploadClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() initUploadClicked: EventEmitter<any> = new EventEmitter<any>();

  public acceptedTypes: string = '.png, .jpg, .jpeg';
  public files: FileData[] = []
  @ViewChild("fileUpload", { static: false }) fileUpload!: ElementRef;

  uploadFile = (file: FileData) => {
    const tokenData: TokenData = this.tokenService.get();
    const guid: string = Guid(15);
    const formData = new FormData();

    formData.append('formFile', file.data);
    formData.append('fileName', guid);
    formData.append('subFolder', this.subFolder);
    formData.append('idCompany', tokenData.idCompany.toString());
    formData.append('id', this.id.toString());
    formData.append('idUser', tokenData.idUser.toString());
    formData.append('guidUser', tokenData.guidUser);
    formData.append('nameColumn', this.nameColumn);
    
    file.inProgress = true;
    file.progress = 0;
    this.uploadService.upload(formData).pipe(
      delay(1000), // Simula un retraso de 1 segundo
      map((event: any) => {
        switch (event.type) {
          case HttpEventType.Sent:
            file.progress = 0;
            return null;
          case HttpEventType.UploadProgress:
            if (event.total && event.total > 0) {
              const progress = Math.round((event.loaded * 100) / event.total);
              file.progress = progress;
            }
            return null;
          case HttpEventType.ResponseHeader:
            if (file.progress === 0) {
              file.progress = 50;
            }
            return null;
          case HttpEventType.Response:
            file.inProgress = false;
            file.progress = 100;
            return event;
          default:
            return null;
        }
      }),
      filter(event => event !== null),
      catchError(() => {
        file.inProgress = false;
        file.progress = 0;
        return of(`${file.data.name} error al subir.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          const responseData: ResponseData = event.body;
          this.endUploadClicked.emit({
            name: `${guid}.${file.data.name.split('.').pop()}`, 
            column: this.nameColumn 
          });
          this.notificationService.success(responseData.message);
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file: FileData) => {
      this.uploadFile(file);
    });
    this.initUploadClicked.emit(true);
  }

  public onClick() {
    this.files = [];

    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {      
      for (const file of fileUpload.files) {
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }

      this.uploadFiles();  
    };

    fileUpload.click();
  }
}
