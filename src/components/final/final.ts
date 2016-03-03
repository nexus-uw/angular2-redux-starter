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
    if (!this.password) {
      this.router.navigate(['/PageOne']);
    }
  }

  mapStateToThis(state) {
    return {
      password: state.random.password
    };
  }





}
