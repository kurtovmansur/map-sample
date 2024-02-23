import { Component } from '@angular/core';
import { Observable, of  } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ob1$ = new Observable<string>((observer) => {
    setTimeout(() => {
      observer.next('test');
      console.log('finished');
    }, 5000);
  });
  constructor() {
    this.sample1();
    this.sample2();
  }

  sample1() {
    let sub1 = this.ob1$
      .pipe(
        tap(() => {
          console.log('working...');
        }),
        finalize(() => {
          console.log('completed...');
        })
      )
      .subscribe((s) => console.log('natija:', s));
  }

  sample2(){
    let ob2$ = of(1,2,3);
    let sub2 = ob2$.pipe(
      tap((t)=>{
      console.log('tap block:',t);
    }), 
    map((m)=> 
    {
      return {id:m, name:`name${m}`};
    })).subscribe((s=> console.log('result:',s)));
}
}
