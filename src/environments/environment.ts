// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:40402',
  crypt: {
    keySize: 256,
    ivSize: 128,
    iterations: 100,
    ytfasf: 'dzNgvTmxit',
    hh: 'dvqsyj30zb',
    udhesaw: 'taskManager',
  },
  firebaseConfig: {
    apiKey: "AIzaSyDtROFhNfzGg2ahLkfxytzYY8LOfi0T-5Y",
    authDomain: "licenta-2e238.firebaseapp.com",
    databaseURL: "https://licenta-2e238.firebaseio.com",
    projectId: "licenta-2e238",
    storageBucket: "licenta-2e238.appspot.com",
    messagingSenderId: "870873924284",
    appId: "1:870873924284:web:c1f704bc9426d6db"
  }
}

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */

import 'zone.js/dist/zone-error' // Included with Angular CLI.
