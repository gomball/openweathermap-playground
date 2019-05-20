# OpenWeatherMap Playground

## Before run or build

run `npm ci` for installing project dependencies.

### Running local server

Run `npm run serve.app.local` for a dev server. Navigate to `http://localhost:4200/`.

### Build

Run `npm run build.app.local` to build the project with development profile. Run `npm run build.app.pro` to build the project with production profile. The build artifacts will be stored in the `dist/` directory. You can serve the app with any web server, f.e. nginx.

### o.w.m. appid

Once you open de app in your browser it will ask you to enter the open weather map api _appid_. You can get an owm _appid_ [here](https://home.openweathermap.org/users/sign_up). The _appid_ will be remembered: you wont need to type/paste it again.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

As this is a p.o.c. project, its mainly focused on features and functionallity. __Test are not passing yet__; spec files are there just as 'placeholders' for the near future. One of the main next steps is to first: fix all 'it works' and 'it instantiates' by mocking the dependecies of all services and components. Second: increase progressively the code coverage.

## Tech stack
 - OpenWeatherMap: provides weather and climate information through a series of api endpoints.
 - Base framework: Angular 7: the last stable release at the time of writing this lines
 - UI: Google's Material Design: interates seamesly with Angular, provides lots of useful components and functionality, and eases a lot responsiveness tasks
 - State management: Datorama's Akita: althogh there other solutions (like ngrx/store, ngxs and others) Akita's approach to Redux is a mix onf OOP and functional/reactive programiming, which drastically simplifies the boilerplate when creating and maintaining the store and all its stuff (actions, effects, etc). Akita also integrates with 'ngdevtools' chormium plugin, which is very helpful in development stage.
 - I18N: NgxTranslate: only one locale supported by now ('es'), but every literal on the app is translated from a 'key'. Angular's LOCALE_ID is also managed, so dates, numbers and currencies are also 'internationalized'. Everithing is reactive.
 - Openlayers: map provider: open source and easy to develop/use javascript/typescript map platform. The app consumes layers fron OpenWeatherMap and [OpenStreenMap](https://www.openstreetmap.org).

## Pending things
 - Upgrade to Angular 8 (and maybe try Ivy).
 - Localize weather records with a package like [Moment Timezone](https://momentjs.com/timezone/), so that the date property of the weather history records of each city appears on its local timezone.
 - Add graphs to city weather history.
