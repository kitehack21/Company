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

If there are no companies created yet (as shown above), the company card list section will render 'There is no companies created yet'.

Input new Company

To input a new company, use the company form section

![alt text](https://github.com/vheres/Company/blob/master/images/emptyinput.png)

Clicking `create` without filling the form, the input area will change its border to red and a warning label will be displayed.

![alt text](https://github.com/vheres/Company/blob/master/images/emptyinput.png)

Filling one of the input form and click `create`, the input area with a value will change its border back to normal.

![alt text](https://github.com/vheres/Company/blob/master/images/input1.png)

When clicking the dropdown on the `Phone No` section, a selection of country code will be displayed.

![alt text](https://github.com/vheres/Company/blob/master/images/countrycode.png)

> Revenue, country code, and phone number only accept positive integer

After filling up the form properly and click create button, a notification will be displayed at the bottom left corner of the screen and a new company card will be displayed in the company card list section

![alt text](https://github.com/vheres/Company/blob/master/images/insertcompany.png)

Adding other company will display a new card beside the first one

![alt text](https://github.com/vheres/Company/blob/master/images/insertcompany2.png)

To delete an existing company, click the cross inside an existing company card. Then it will trigger a confirmation pop up to delete the selected company from database.

![alt text](https://github.com/vheres/Company/blob/master/images/deletecompany.png)

To add an office to an existing company, use the Office Form Section (Top Right)

![alt text](https://github.com/vheres/Company/blob/master/images/officeform.png)

Just like the Company Form, the input area of the Office Form will turn red if it is empty when submited.

> Latitude and Longitude in the Location section only accept float number

Clicking the `Office Start Date` form will display a calendar to choose the date from.

![alt text](https://github.com/vheres/Company/blob/master/images/datedropdown.png)

Clicking the dropdown in the `Company` form will display existing companies.

![alt text](https://github.com/vheres/Company/blob/master/images/companydropdown.png)

After filling all the form in the `Office Form` section and clicking the create button, a notification will be displayed at the bottom left corner of the screen.

To go to the office page, simply click any of the company card. The office page is divided into 2 sections: 
* Company Detail (Top)
* Office Card List (Bottom)

If there are no offices created yet, the office card list section will render `There is no offices created yet.`

![alt text](https://github.com/vheres/Company/blob/master/images/emptyoffice.png)

Clicking cross inside the office card will trigger a confirmation pop up to delete the selected office from database.
