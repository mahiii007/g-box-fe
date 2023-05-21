import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessageService } from 'primeng/api';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GboxHttpInterceptor } from './interceptors/http.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CreateFolderComponent } from './components/create-folder/create-folder.component';
import { UploadComponent } from './components/upload/upload.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavBarComponent,
    TopNavBarComponent,
    LandingPageComponent,
    MainContentComponent,
    LoginComponent,
    SignupComponent,
    LoaderComponent,
    CreateFolderComponent,
    UploadComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    TableModule,
    BreadcrumbModule,
    FormsModule,
    InputTextModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    MenuModule,
    AvatarModule,
    PasswordModule,
    HttpClientModule,
    DynamicDialogModule,
    FileUploadModule,
    ToastModule,
    InputSwitchModule,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GboxHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
