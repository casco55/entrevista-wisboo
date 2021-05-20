# Implementación del proyecto

Este es el intructivo para poder implementar la aplicación en la maquina local

## Implementación de aplicación ReactJS

### Crear React APP e instalar librerías

 Se debe crear una aplicación de react con las siguientes librerías: 
 
* "axios": "^0.21.1",
* "jquery": "^3.6.0",
* "react": "^17.0.2",
* "react-dom": "^17.0.2",
* "react-redux": "^7.2.4",
* "react-router-dom": "^5.2.0",
* "react-scripts": "4.0.3",
* "redux": "^4.1.0",
* "redux-thunk": "^2.3.0",
    con el siguiente comando: npm install --save axios jquery react-redux react-router-dom redux redux-thunk


Luego debe clonar el repositorio en la carpeta del proyecto con el comando:
git clone https://github.com/casco55/entrevista-wisboo.git
O bien crear las carpetas y archivos correspondientes y copiar el código dentro de ellos


## Implementación de api local con PHP

### crear la base de datos
* debe crear una base de datos con el siguiente nombre: urls
 y luego correr el siguiente script:
    
CREATE TABLE `urls`.`url` (
`id` INT NOT NULL AUTO_INCREMENT,
`url` LONGTEXT NOT NULL,
PRIMARY KEY (`id`));

### Copiar archivos necesarios
* luego debe pegar dentro de la ruta de su servidor(xampp, lampp, etc), la carpeta 'api_rest', cambiando el usuario y la contraseña por las suyas en el archivo 'conexion.php', de esta forma:

$conexion = new mysqli("localhost","su_usuario","su_contraseña","urls");

## Correr el proyecto

* Correr servidor local para funcionamiento de la api

* abrir consola en carpeta del proyecto react y ejecutar el sigiente comando: npm start

## Implementación de api local con node JS

### crear la base de datos
* debe crear una base de datos con el siguiente nombre: urls
 y luego correr el siguiente script:
    
CREATE TABLE `urls`.`url` (
`id` INT NOT NULL AUTO_INCREMENT,
`url` LONGTEXT NOT NULL,
PRIMARY KEY (`id`));

### Copiar archivos necesarios

 Se debe crear una aplicación de node con las siguientes librerías: 
 
* "JSONStream": "^1.3.5",
* "axios": "^0.21.1",
* "body-parser": "^1.19.0",
* "cors": "^2.8.5",
* "express": "^4.17.1",
* "mysql2": "^2.2.5",
* "sequelize": "^6.6.2",
* "sequelize-paginate": "^1.1.6"

Se recomienda instalar nodemon, de manera de reflejar los cambios sin tener que reiniciar el servidor



* luego debe copiar los archivos y carpetas correspondientes y ejecutar el comando 
        nodemon index.js

* Es importante cambiar los datos en db.js a los de su propia base de datos






# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
