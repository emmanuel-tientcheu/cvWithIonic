import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentails: any;

  constructor(
    private fb:FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private authService:AuthService,
    private router:Router //to route the user after login
  ) { }

  //Easy access to our html field
  get email(){
    return this.credentails.get('email')
  }

  get password(){
    return this.credentails.get('password')
  }

  ngOnInit() {
    this.credentails = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
    });
  }

  async register(){ //this function will use our register Service function to create/register a user
    const loading = await this.loadingController.create()
    await loading.present();

    const user =await this.authService.register(this.credentails.value)
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/home',{replaceUrl:true})
    }
    else{
      this.showAlert('Registration failed','please try again')
    }
  }

  async login(){
    const loading = await this.loadingController.create()
    await loading.present();

    const user =await this.authService.login(this.credentails.value)
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/home',{replaceUrl:true})
    }
    else{
      this.showAlert('Login failed','please try again')
    }
  }

  async showAlert(header,message){ //it will generate an alertbox
    const alert=await this.alertController.create({
      header,
      message,
      buttons:['OK']
    });
    await alert.present();
  }

}
