
import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DealerService } from '../services/dealer.service';
import { TransactionsComponent } from '../transactions/transactions.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  Reason : string
  Price : number
  Giver : string
  Receiver : string[]
  Name : string

  constructor(private db : AngularFirestore, private toastController : ToastController, private dealer : DealerService ,private router :Router , private modalController : ModalController ) {}
ngOnInit(){

  
}

  NextPage(){
     if(this.Reason && this.Price && this.Giver &&this.Receiver){
      this.dealer.Reason = this.Reason
      this.Reason=null
      this.dealer.Price = this.Price
      this.Price=null
      this.dealer.Giver = this.Giver
      this.Giver=null
      this.dealer.Receiver = this.Receiver
      this.Receiver=null
      this.router.navigateByUrl('/second')
    }
    else{
      this.presentToast('Please fill all the details')
    }

   
    
  }



  async presentToast(mes : string) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 1200
    });
    toast.present();
  }







  

  async Modal() {

    if(!this.Name){
      this.presentToast('Please select a Name')
      return
    }
 
    const modal = await this.modalController.create({
      component:  TransactionsComponent,
      componentProps : {
        Name : this.Name
      }
      
    });
    return await modal.present();
   
  }


  
}
