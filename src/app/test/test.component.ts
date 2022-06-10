import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  myArray: any[] = []
  docs: any[];
  single: any;
  docref: any;
  id: string = '';
  edit: boolean = false
  doc: any;
  print: any;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.docs = [];
    const collectionRef = this.firestore.collection('items');
    const collectionInstance = collectionRef.valueChanges();
    collectionInstance.subscribe(ss => this.myArray = ss);
  }

  onSubmit() {
    const mem = document.getElementById('text1') as HTMLInputElement
    this.firestore.collection('items').doc('test').set({field: mem.value})
    .then(res => {
        console.log(res);
        //this.form.reset();
        alert("thanks")
    })
    .catch(e => {
        console.log(e);
    })
}

onQuery() {
  const t = document.getElementById("text2") as HTMLInputElement
  if (!t.value) {
    alert('Cannot be empty');
    this.single = null;
  } else {
    this.docref = this.firestore.collection('items', ref => ref.where("field", "==", t.value));
    this.docref.get().subscribe(ss => {
        if (ss.docs.length === 0) {
         alert('Document not found! Try again!');
          this.single = null;
        } else {
          ss.docs.forEach(doc => {
            alert('thanks alot');
            this.single = doc.data();
          })
        }
      })

      this.docref.snapshotChanges().forEach((changes) => {
        changes.map((a) => {
          this.id = a.payload.doc.id;
        });
      });
  }
}

openEdit() { this.edit = !this.edit};

onRename() {
  const t1 = document.getElementById('text3') as HTMLInputElement
  if (!t1.value) {
      alert("Cannot Be Empty!");
  } else {
      this.firestore.collection('items').doc(this.id).update({ field: t1.value });
      this.edit = false;
      this.single = null;
  }
}

give()
{
  const t2 = document.getElementById('text4') as HTMLInputElement
  this.doc = this.firestore.collection('items').doc(t2.value)
  this.doc.get().subscribe(
    ss => {
      if (ss.doc.length === 0) {
       alert('Document not found! Try again!');
        this.print = null;
      } else {
        ss.docs.forEach(doc => {
          alert('thanks alot');
          this.print = doc.data();
        })
      }
    })
}

}
