<h1 align="center">Chat now: Mern-stack Chat Application</h1>
<br/>

<p align="center">
  <a href="https://github.com/dompham21/Imusicvn-SpringBoot-NextJs"><img alt="license" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
</p> 

## [View Demo](https://chatnow21.herokuapp.com)

#### Introduction

The MERN stack which consists of **Mongo DB**, **Express.js**, **Node.js**, and **React.js** is a popular stack for building full-stack web-based applications because of its simplicity and ease of use. In recent years, with the explosive popularity and the growing maturity of the JavaScript ecosystem, the MERN stack has been the goto stack for a large number of web applications. This stack is also highly popular among newcomers to the JS field because of how easy it is to get started with this stack.
<br/><br/>
This repo consists of a **Chat Application** built with the MERN stack. I built this sometime back when I was trying to learn the stack and I have left it here for anyone new to the stack so that they can use this repo as a guide.
<br/><br/>
The backend is built with Express.js and Node.js.
Real-time message broadcasting is developed using [Socket.IO](https://socket.io/).

### Features

This application provides users with the following features
<br/>
* Authentication using **JWT Tokens**
* A **Private Chat** functionality where users can chat with other users privately.
* A **Group Chat** functionality where users can chat with group friend users.
* Real-time updates to the user list, conversation list, and conversation messages.
* Real-time notification to add friend, remove friend. 
* Search and add friend with other users.
* Send mail to verify user.
* Change infomation user and password.

### Screenshots

##### Private Chat
![Private Chat](https://res.cloudinary.com/dmriwkfll/image/upload/v1656214479/Screen_Shot_2022-06-26_at_10.31.57_ljjgpu.png)
<br/><br/>
##### Group Chat
![Group Chat](https://res.cloudinary.com/dmriwkfll/image/upload/v1656214479/Screen_Shot_2022-06-26_at_10.32.16_f3pzju.png)
<br/><br/>
##### Login
![Login](https://res.cloudinary.com/dmriwkfll/image/upload/v1656214168/Screen_Shot_2022-06-26_at_10.28.42_hdtrc8.png)
<br/><br/>
##### Register
![Register](https://res.cloudinary.com/dmriwkfll/image/upload/v1656214168/Screen_Shot_2022-06-26_at_10.28.55_qtvahz.png)
<br/><br/>
##### Search
![Register](https://res.cloudinary.com/dmriwkfll/image/upload/v1656214480/Screen_Shot_2022-06-26_at_10.33.06_hk8mlb.png)
<br/><br/>
##### List contact
![Register](https://res.cloudinary.com/dmriwkfll/image/upload/v1656214480/Screen_Shot_2022-06-26_at_10.33.14_x2a5ow.png)
<br/><br/>
##### List waiting to accept 
![Register](https://res.cloudinary.com/dmriwkfll/image/upload/v1656214480/Screen_Shot_2022-06-26_at_10.33.42_yfp1er.png)
<br/><br/>
##### List notification
![Register](https://res.cloudinary.com/dmriwkfll/image/upload/v1656214479/Screen_Shot_2022-06-26_at_10.33.58_s4bqwg.png)
<br/><br/>
##### Infomation user
![Register](https://res.cloudinary.com/dmriwkfll/image/upload/v1656214480/Screen_Shot_2022-06-26_at_10.34.11_hvctpj.png)
<br/><br/>
##### Change password user
![Register](https://res.cloudinary.com/dmriwkfll/image/upload/v1656214480/Screen_Shot_2022-06-26_at_10.34.23_tjxymj.png)

### How to use

You can have this application up and running with just a few steps because it has both the frontend and the backend in a single repository. Follow the steps below to do so.

1. Clone this repo
2. Once you have the repo, you need to install its dependencies. So using a terminal, move into the root directory of the project and execute `npm install` to install the dependencies of the Node.js server and then run `npm run client-install` to install the dependencies of the frontend. The second command is a custom command that I wrote to simplify the installation process.
3. This application uses MongoDB as its Database. So make sure you have it installed. You can find detailed guides on how to do so [here](https://docs.mongodb.com/manual/administration/install-community/). Once installed, make sure that your local MongoDB server is not protected by any kind of authentication. If there is authentication involved, make sure you edit the `mongoURI` in the `config/keys.js` file.
4. Finally, all you have to do is simply run `npm run dev`. If this command fails, try installing the package [concurrently](https://www.npmjs.com/package/concurrently) globally by running `npm install -g concurrently` and then running the `dev` command.
5. The frontend of the application will be automatically opened in your web browser and you can test it away.


### Things to note

* The frontend is created using [create-react-app](https://github.com/facebook/create-react-app)
* Database connections in the backend are handled using the [Mongoose ORM](https://mongoosejs.com/)
