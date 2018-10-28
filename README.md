## Code Challenge | Prospace
>The skeleton of this project was setup with **[create-react-app](https://github.com/facebook/create-react-app)**.
## Compiling Guide
>Make sure that your system has Node.js installed

* After cloning the repository from GitHub, Open the directory `./company` in a terminal, and install all the dependencies:
 ```
 > npm install
 ```
 * The database of this project is hosted in heroku server with clearDB addons. however, because it uses the free option, the server will be automatically turned off if inactive. So, instead of running the API with `node`, please install module `forever` to make sure that it will run continuously.
 ```
 > npm install forever -g
 ```
 * Then, Head to the API directory `./company/company_API` and run the following command
 ```
 > forever start index.js
 ```
* Using another terimal in `./company` directory, start the React app:
```
> npm start
```
* Now the app should be running and could be accessed by opening a browser and go to `http://localhost:3000/`
![alt text](https://github.com/vheres/Company/blob/master/images/overviewpage.png)
## Features
In the overview page above, there are 3 sections:
* Company Form (Top Left)
* Office Form (Top Right)
* Company Card List (Bottom)

If there are no companies created yet (as shown above), the company card list section will render 'There is no companies created yet'.

Input new Company

To input a new company, use the company form section

![alt text](https://github.com/vheres/Company/blob/master/images/companyform.png)

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

## System Design

### Overview Page

The overview page is the default page that will be displayed. The general process:
1. Retrieve company list from database by calling an update action from action creator and save it to global state `comp`
2. Render the overviewpage, which in turns will call other components (CompanyForm.js, OfficeForm.js and CompanyCard.js)
3. The component CompanyCard.js will be called multiple times by mapping the global state `comp`.

### CompanyForm.js and OfficeForm.js

Both component has similar process, therefore, only CompanyForm.js will be explained.

General process:
1. Set state `error` to an array of boolean which represent the input value of the form (false means the input is not empty when submited, while true means the input is empty when submited)
2. Set state `input` to an array of empty string which represent additional class for the input form (for changing the border of the input form)
3. Render the company form
4. After filling the form and clicking the create button, it will run onCompanyCreate() function

```
async onCompanyCreate() {
        await this.checkInput();
        this.selectClass();
        var errIndicator = false;
        this.state.error.map((item, index) => {
            if (item) {
                errIndicator = true;
                return;
            }
        })
        if (errIndicator === true) {
            return
        } else {
            var data = {
                name: this.refs.companyName.value,
                address: this.refs.companyAddress.value,
                revenue: this.refs.companyRevenue.value,
                code: this.state.country_code,
                phone: this.refs.companyPhoneNumber.value
            }
            this.props.addCompany(data);
            this.displayNotification();
            this.reset()
        }   
    }
```

First, it will check all the input form and change the state of `error` to true if there is any empty form.

```
checkInput() {
        var checkArr = [false, false, false, false, false]
        if (this.refs.companyName.value === '') {
            checkArr[0] = true;
        }
        if (this.refs.companyAddress.value === '') {
            checkArr[1] = true;
        }
        if (this.refs.companyRevenue.value === '') {
            checkArr[2] = true;
        }
        if (this.state.country_code === '') {
            checkArr[3] = true;
        }
        if (this.refs.companyPhoneNumber.value === '') {
            checkArr[4] = true;
        }
        this.setState({ error: checkArr})
    }
```

Second, it will change the state of `input`, based on the state of `error`

```
selectClass() {
        var inputArr = this.state.input.slice()
        this.state.error.map((item, index) => {
            if (this.state.error[index] == true && index != 3) {
                inputArr[index] = 'empty_input'
            } else if (this.state.error[index] == true && index == 3) {
                inputArr[index] = '2px solid red'
            } else {
                inputArr[index] = ''
            }
        })
        this.setState({input: inputArr})
    }
```

Third, if there is any error, it will execute `return` from the function, thus the creating process will be canceled and re-render will take place. Because of this, any input form that was empty will receive new class which will change its border to red.

Fourth, if there is no error, it will continue the creating process and call an action from the action creator with all the input-form's value as the parameter.

Fifth, all the input form will be reset to empty.

```
reset() {
        this.refs.companyName.value = '';
        this.refs.companyAddress.value = '';
        this.setState({revenue: '', phone: ''})
    }
```

### CompanyCard.js and OfficeCard.js

Both components works similarly, so only CompanyCard.js will be explained.

General Process:
1. When CompanyCard.js is being called, it receive two props from its parent, an object named `item` and a function named `pushPage`
2. the props `item` holds the information of a company, while `pushPage` is a function to change page to OfficePage.js with the company-id as parameter.
3. Using the information inside `item`, it will render the information given to form a company card.
4. There is a common component, ConfirmationModal.js that is being used inside CompanyCard.js. When the cross at the top right corner of the card is clicked, it will change the state of the modal to become visible. Accordingly, if the delete button inside the modal is clicked, it will call an action to delete the company and its offices from the database based on the company id.

### Office Page

Office page is the second page of this project. The general process:
1. componentWillMount() call an action to retrieve office list from database and save it in a global state `offi`.
2. During render process, there are two components that are called, CompanyDetail.js and OfficeCard.js
3. CompanyDetail.js receives two props from OfficePage.js when called, `company_id` and `pushPage`. the value of `company_id` is retrieved from URL `this.props.match.params.id`.
4. For OfficeCard.js (render office card by mapping global state `offi`), see CompanyCard.js section.

### CompanyDetail.js

General Process:
1. It will check whether the global state `comp` is empty or not.
2. If `comp` is not empty, it will push the selected company to a local state `selected_company`

```
selectCompany() {
        console.log(this.props.comp.companies)
        this.props.comp.companies.map((item, index) => {
            if (item.id == this.props.company_id) {
                this.setState({selected_company: item})
            }
        })
    }
```
3. If `comp` is empty, it will call a function to retrieve the company list and once again save it to global state `comp`. Then, componentWillReceiveProps will be triggered, which in accordance will push the selected company to a local state `selected_company`

```
getCompanyList() {
        this.props.updateCompanyList();
    }

    componentWillReceiveProps(newProps) {
        newProps.comp.companies.map((item, index) => {
            if (item.id == this.props.company_id) {
                this.setState({selected_company: item})
            }
        })
    }
```

4. Then using the information inside the local state `selected_company`, it will render the company detail.


