import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { 
  FormErrorMessage, 
  Guid, 
  PageHeader, 
  ImagePipe, 
  UploadImageComponent, 
  I001_TYPE_DOCUMENT, 
  I016_GENDER 
} from '@shared';
import { Grouper, GrouperDetail } from '@features/configuration/groupers/models/grouper.model';
import { selectAllGroupers } from '@features/configuration/groupers/state/grouper.selector';
import { User } from '@features/administration/users/models/user.model';

import { updateProfile, uploadImageProfile } from '../state/profile.actions';
import { selectProfile } from '../state/profile.selector';

@Component({
  selector: 'app-general.component',
  imports: [
    AsyncPipe,
    ImagePipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    PageHeader,
    UploadImageComponent
],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent implements OnInit, OnDestroy{
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);
  public nameImage: string = '';
  private readonly password: string = Guid(10);
  public formMessage = FormErrorMessage;
  private user$?: Subscription;
  public isLoadingImage: boolean = true;

  public groupers$: Observable<Grouper[]> = this.store.select(selectAllGroupers);
  public typeDocuments$: Observable<GrouperDetail[]> = this.groupers$.pipe(
    map((groupers) =>
      groupers.find((g) => g.idGrouper === I001_TYPE_DOCUMENT)?.grouperDetails ?? []
    )
  );
  public genders$: Observable<GrouperDetail[]> = this.groupers$.pipe(
    map((groupers) =>
      groupers.find((g) => g.idGrouper === I016_GENDER)?.grouperDetails ?? []
    )
  );

  public userForm = this.fb.nonNullable.group({
    idCompany: [0],
    idUser: [0],
    guidUser: [''],
    nameUser: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    fullName: [''],
    dateBrith: [''],
    i016Gender: [0, Validators.required],
    i001DocumentType: [0],
    numberDocument: [''],
    direction: ['', Validators.maxLength(100)],
    phone: ['', [Validators.required, Validators.min(99), Validators.max(999999999)]],
    email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    nameImage: [''],
    idState: [0]
  });

  ngOnInit(): void {
    this.user$ = this.store.select(selectProfile)
      .subscribe((user) => {
        if (user) {
          const { changePassword, ...sources } = user;
          this.nameImage = user.nameImage;
          this.userForm.setValue({...sources, password: this.password });
          this.isLoadingImage = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }

  public onSave(event: Event): void {
    event.preventDefault();
    const profile: User = this.userForm.getRawValue();
    profile.changePassword = profile.password !== this.password;
    this.store.dispatch(updateProfile({ profile }));
  }

  public onInitUploadImage(state: boolean): void {
    this.isLoadingImage = state;
  }

  public onEndUploadImage(params: any): void {
    this.isLoadingImage = false;
    const { name } = params;
    this.store.dispatch(uploadImageProfile({ nameImage: name }));
  }
}
