# AgExcel

AgExcel is an Angular Wrapper for [JExcel V3](https://www.npmjs.com/package/jexcel).
JExcel has an angular library but it is paid. Javascript version can be implemented, but scripts and styles needs to be loaded before hand, AgExcel takes care of loading all the files for you and AgExcel can be installed to your angular project directly from npm. 

## Installation
###### Install ag-excel
`npm i ag-excel`
###### Import Assets
Import the assets in angular.json
```json
{
  "architect": {
    "assets": [
		{
		  "glob": "**/*",
		  "input": "./node_modules/ag-excel/assets/AgExcel",
		  "output": "./assets/AgExcel"
		}
	]
  }
}
```

## Documentation
[Documentation](https://gamble4846.github.io/AgExcel/Documentation/)

## Demo
[Demo](https://gamble4846.github.io/AgExcel/Demo/)

## Github Repository Link
[Github](https://github.com/gamble4846/AgExcel)