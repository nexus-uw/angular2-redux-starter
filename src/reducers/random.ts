import { GET_RANDOM_ARI_NUMBER, SET_API_RANDOM_NUMER, SET_COMBINED_RANDOM_SEED, SET_PASSWORD, START_CALCULATING_PASSWORD } from '../actions/random';

export default function random(state = {
  apiRandomNumber: NaN,
  combinedSeed: NaN
}, action) {
  switch (action.type) {
    case SET_API_RANDOM_NUMER:

      return Object.assign({}, state, {
        apiRandomNumber: action.apiRandomNumber
      });

    case SET_COMBINED_RANDOM_SEED:

      return Object.assign({}, state, {
        combinedSeed: action.combinedSeed
      });
    case SET_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
        calculatingPassword : false
      });
    case START_CALCULATING_PASSWORD:
      return Object.assign({}, state, {
        calculatingPassword: true
      });
    // return;
    default:
      return state;
  }
}



// public getRemoteRandomNumber = () => {
//     const searchParams = new URLSearchParams()
//     searchParams.set('num', '1');
//     searchParams.set('base', '10');
//     searchParams.set('format', 'plain');
//     searchParams.set('min', '1');
//     searchParams.set('max', '1000');
//     searchParams.set('col', '1');

//     return this.http.get('https://www.random.org/integers/', { search: searchParams })
//       .subscribe(
//       (data) => this.randoNum = parseInt(data.text(), 10),
//       (err) => this.apiError = err
//       );
//   };
