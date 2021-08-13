import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AppareilService{

  constructor(private httpClient: HttpClient) { }

  appareilSubject = new Subject<any[]>();
  private appareils : any[] = [];

  emitAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice());
  }

  switchOnAll(){
    for(let i =0; i < this.appareils.length; i++){
      this.switchOnOne(i);
    }
  }

  switchOffAll(){
    for(let i =0; i < this.appareils.length; i++){
      this.switchOffOne(i);
    }
  }

  switchAll(){
    if(this.appareils[0].status === 'éteint')
      this.switchOnAll();
    else
      this.switchOffAll();
  }

  switchOne(index:number){
    if(this.appareils[index].status === 'allumé')
      this.switchOffOne(index);
    else
      this.switchOnOne(index);
  }

  switchOffOne(index:number){
    this.appareils[index].status ='éteint';
    this.emitAppareilSubject();
  }

  switchOnOne(index:number){
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  getAppareilById(id: number){
    return this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
  }

  addAppareil(name: string, status: string){
    const appareilObject = {
      id: this.appareils.length + 1,
      name: name,
      status: status.toLowerCase()
    };

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilsToServer(){
    this.httpClient
      .put('https://http-client-demo-7c0ce-default-rtdb.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
      () => {
        console.log("Enregistrement terminé!");
      },
      (error) => {
        console.log("Erreur de sauvegarde! " + error);
      }
    );
  }

  getAppareilsFromServer(){
    this.httpClient
      .get<any[]>('https://http-client-demo-7c0ce-default-rtdb.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log("Erreur de chargement! "+ error);
        }
      );
  }
}
