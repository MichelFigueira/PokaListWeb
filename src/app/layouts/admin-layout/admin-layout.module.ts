import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { ProfileComponent } from '@app/pages/user/profile/profile.component';
import { ProfileCardComponent } from '@app/pages/user/profile/profile-card/profile-card.component';
import { ProfileDetailsComponent } from '@app/pages/user/profile/profile-details/profile-details.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCardComponent,
    ProfileDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    ClipboardModule,
    ImageCropperModule
  ]
})

export class AdminLayoutModule {}
