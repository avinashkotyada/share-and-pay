import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TransModel } from '../Model/transacmodel';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  @Input() Name : string
  constructor(private toastController : ToastController, private alertController : AlertController, private modalctrl : ModalController, private db : AngularFirestore) { }
  Trans : TransModel[]
  Give : number
  Get : number
  ngOnInit() {

    this.db.collection<TransModel>(this.Name, q=> q.orderBy('Timestamp')).snapshotChanges().subscribe(trans => {
      this.Trans =[]
      this.Give=0
      this.Get = 0
      trans.forEach(tran => {
        const trn = tran.payload.doc.data()
        const id = tran.payload.doc.id
        this.Trans.push({...trn, tranid : id })
        if(trn.Etc==="Give"){
          this.Give= this.Give + trn.Amount
        }else{
          this.Get= this.Get + trn.Amount
        }
        
      
        
      }
     
      )
     
    }

    )

  }


  dismiss(){
    this.modalctrl.dismiss()

  }


   async Delete(id : string , name : string){
  
      const alert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Are you sure do want to delete this transaction ?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          }, {
            text: 'Yeah',
            handler: () => {
              this.db.collection(this.Name).doc(id).delete().then(()=>{
                this.db.collection(name).doc(id).delete().then(()=>{
                  this.presentToast()
                })
              })
              

            }
          }
        ]
      });
  
      await alert.present();
  
    
  }

  

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Deleted Successfully',
      duration: 1200
    });
    toast.present();
  }



}
