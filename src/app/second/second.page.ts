import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DealerService } from '../services/dealer.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
  Receiver: string[]
  Reason: string
  Giver: string
  Price: number
  Average: number
  Amount = []
  constructor(private router: Router, private dealer: DealerService, private db: AngularFirestore, private loadingController: LoadingController) {

  }

  ngOnInit() {
    this.Reason = this.dealer.Reason
    this.Giver = this.dealer.Giver
    this.Price = this.dealer.Price
    this.Receiver = this.dealer.Receiver
    this.Average = this.Price / this.Receiver.length
    this.Receiver.forEach(p => {

      this.Amount.push(this.Average)
    })


  }


  Done() {

   
    

    const loading = this.loadingController.create({
      message: 'Please wait...',
    }).then(loader => {
      loader.present()
      var Rec = this.Receiver
      var Amt = this.Amount
      const inde = Rec.indexOf(this.Giver)
      var am = this.Amount
      if(inde>-1){
         am = []
        Amt.forEach((value : number, index : number)=>{
            if(index!== inde){
              am.push(value)
            }
        })
         Rec = Rec.filter(p => p!==this.Giver)
         
      }
      

      Rec.forEach((value: string, index: number) => {
        const id = this.db.createId()
        const time = new Date().getTime()
      

        this.db.collection(this.Giver).doc(id).set({
          Name: value,
          Amount: am[index],
          Timestamp: time,
          Reason: this.Reason,
          Etc: 'Get'

        }).then(() => {
          this.db.collection(value).doc(id).set({
            Name: this.Giver,
            Amount: am[index],
            Timestamp: time,
            Reason: this.Reason,
            Etc: 'Give'
          }).then(() => {
            if (index === Rec.length - 1) {

              loader.dismiss()
              this.router.navigateByUrl('/home', { replaceUrl: true })

            }
          })
        }
        )



      })



    })








  }




}
