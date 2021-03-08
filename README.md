# COVID-19 Dashboard - England

This is a cross-platform app built using React Native to display the UK's COVID-19 statistics, including cases and deaths from the UK Government coronavirus [API](https://coronavirus.data.gov.uk/). 

![Image](assets/landing-image.png)

Currently does not show vaccinations as the API does not have an endpoint for that. 

## Acquiring the project

### iOS
1. Clone the repository
2. Install ```react-native``` (you will need ```npm``` if you don't already have it) and Xcode for the iOS simulator
3. ``` cd``` into the repository and run
```bash
npm install
```
4. Run
```bash
npx react-native run-ios
```
or if you installed react-native directly
```bash
react-native run-ios
````
#### Common issues
```npm``` issues: delete the ```package-lock.json``` and run ```npm install```. 

```podfile``` issues: ```cd``` into ```/ios```, delete ```podfile.lock``` and run ```pod install```. 

### Android
The first step is the same, however you will need Android studio instead of Xcode as well as React Native. 

## Enquiries
Regarding the app itself, please [email](mailto:siddharth.srivastava@warwick.ac.uk) me. For enquiries regarding the data, please email the UK government directly as the data is not mine. 

## License
[MIT](https://choosealicense.com/licenses/mit/)
