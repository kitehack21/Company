## Code Challenge | Prospace
>The skeleton of this project was setup with **[create-react-app](https://github.com/facebook/create-react-app)**.
### Compiling Guide
>Make sure that your system has Node.js installed

* After cloning the repository from GitHub, Open the directory `./company` in a terminal, and install all the dependencies:
 ```
 > npm install
 ```
 * API: Open another terminal and head to the directory of the API `./company/company_API`. To start the API, 
 ![alt text](https://github.com/vheres/Company/blob/master/images/node.png)
 ```
 > node index.js
 ```
* Using the first terminal, start the React app:
```
> npm start
```
* Now the app should be running and could be accessed by opening a browser and go to `http://localhost:3000/`
![alt text](https://github.com/vheres/Company/blob/master/images/overviewpage.png)
### How it works
In the overview page above, there are 3 sections:
* Company Form (Top Left)
* Office Form (Top Right)
* Company Card List (Bottom)
<br/>
If there are no companies created yet (as shown above), the company card list section will render 'There is no companies created yet'.<br/>
Input new Company<br/>
To input a new company, use the company form section<br/>
![alt text](https://github.com/vheres/Company/blob/master/images/emptyinput.png)<br/>
If you click `create` without filling the form, the input area will change its border to red and a warning label will be displayed.<br/>
![alt text](https://github.com/vheres/Company/blob/master/images/emptyinput.png)<br/>
If you fill one of the input form and click `create`, the input area with a value will remove both the red border and the warning label.<br/>
![alt text](https://github.com/vheres/Company/blob/master/images/input1.png)<br/>
When clicking the dropdown on the `Phone No` section, a selection of country code will be displayed.<br/>
![alt text](https://github.com/vheres/Company/blob/master/images/countrycode.png)<br/>
> Revenue, country code, and phone number only accept positive integer
