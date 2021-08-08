import {Subject} from "rxjs/Subject";

export class AppareilService{

  appareilSubject = new Subject<any[]>();
  private appareils = [
    {
      id: 1,
      name : "Machine à laver",
      status : "éteint"
    },
    {
      id: 2,
      name : "Télévision",
      status : "allumé"
    },
    {
      id:3,
      name : "Ordinateur",
      status : "éteint"
    }
  ];

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
}
