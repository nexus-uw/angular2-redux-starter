import {Component, View, Inject} from 'angular2/core';
import {Http, RequestOptionsArgs, URLSearchParams} from 'angular2/http';
import {Router} from 'angular2/router';
@Component({
  selector: 'final'
})

@View({
  template: `
  <div>
    <h2>Final Random password</h2>
    {{password}}
  </div>
  `
})
export class Final {
  public password: string;
  private combinedSeed: number;
  protected unsubscribe: Function;
  /**
   * @param  {Http} privatehttp
   * @param  {Router} privaterouter
   */
  constructor(private http: Http,
    private router: Router,
    @Inject('ngRedux') private ngRedux) {

  }

  ngOnInit() {

    this.unsubscribe = this.ngRedux.connect(
      this.mapStateToThis)(this);
    if (!this.combinedSeed) {
      this.router.navigate(['/PageOne']);
    } else {
      this.doStuff();
    }
  }

  mapStateToThis(state) {
    return {
      combinedSeed: state.random.combinedSeed
      // todo map the rando number this
    };
  }


  doStuff() {
    const searchParams = new URLSearchParams()
    searchParams.set('num', '5');
    searchParams.set('format', 'plain');
    searchParams.set('len', '4');
    searchParams.set('unique', 'on');
    searchParams.set('upperalpha', 'on');
    searchParams.set('loweralpha', 'on');
    searchParams.set('digits', 'on');
    searchParams.set('rnd', this.combinedSeed.toString());
    searchParams.set('col', '1');

    this.http.get('https://www.random.org/strings/', { search: searchParams })
      .subscribe(
      (data) => this.password = data.text().replace('\n', '')
      );
  }


}
