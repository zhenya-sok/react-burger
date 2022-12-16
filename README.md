# React Burger App

**This project is an example of a full-fledged business application**.   
It could be a restaurant, a sports shop, or a fishing shop. In this case, it's a fictional burger joint located in another galaxy :hamburger: 

The purpose of creating this project was developing knowledge of React and Redux.  
Besides, the project includes a lot of useful technologies and a system of personal user account.

### Technologies
* React
* Redux
* Type Script
* Jest, Cypress
* CSS
* HTML

### You can check the deployed page [here](https://zhenya-sok.github.io/react-burger/).

# Application map

### `Constructor Page`

**This is a default page that contains a list of ingredients from which the user can assemble a burger to his taste.**

### Features:
* Drag and drop to move ingredients to the cart
* Drag and drop to move the selected ingredients in the basket in places

### `Order Feed Page`

**This page displays the overall flow of orders, with their numbers and full details.**

### Features:
* Constant flow of orders using web socket
* Modals with ingredient's detail information

### `Profile Page`

**This is a user's personal account with the ability to edit account data and a personal order feed where only user orders are displayed.**

### Features:
*  User account system with the process of registration, authorization and password recovery.
*  Private routing for registered users only.

# Getting Start

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To install the project, please, download it or clone, and then after downloading use 
```sh
  npm i
```



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress`

Launches the cypress test runner.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
