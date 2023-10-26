# Be High

[![Be High - Camtronics Logo](src/assets/images/camtronics_logo.png)](https://github.com/nduwarugirabruno/BeHigh)

Be High, is an Ionic application to manage the matrix screens modules.

It can be previewed on my GitHub repository here: https://github.com/nduwarugirabruno/BeHigh

## Getting Started

To start building, clone this repository:

```bash
git clone https://github.com/nduwarugirabruno/BeHigh.git
```

Once cloned, run the following to install dependencies and run the app:

```bash
cd /path/to/the/cloned/repository/folder
npm i
ionic serve
```

## Production

To build for production, run:

```bash
ionic build
```

## Create apk

To build an apk package, run:

```bash
ionic cap add android
ionic cap sync
cd android
./gradlew assembleDebug 
```
Note: Gradle is necessary to use `./gradlew assembleDebug`. If it's asked, install it.   


## Unit Tests

To run the unit tests once, run:

```bash
ionic test
```

To run the unit tests and watch for file changes during development, run:

```bash
ionic test --watch
```
