# Ekotest - routes

## Description
Simple ReactJS application lets user to set connections between cities and calculated routes between.

## Installation
```bash
$ git clone https://github.com/AHAPX/ekotest.git
$ cd ekotest
$ npm install
```

## Usage
```bash
$ cd ekotest
$ npm start
```
open https://localhost:3000

### Cities

* to add city to list press **Add city**
* to delete city press red button on left side
* to set delivery cost between A and B press button in table on A row and B column and type cost (if you type not integer number cost will be deleted)

### Routes

1. select **origin** city
2. select **destination** city
3. if needs set max stops parameter
4. press **Calculate** button to get count of possible routes, the cheapest route and its cost

### Manual route

* press button with name of cities to build route
* cost of that route will be calculated automatically

## Testing
```bash
$ cd ekotest
$ npm test
```
