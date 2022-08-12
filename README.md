# Api Restful with TypeScript
***
**Install packages and dependencies**
***
## Start the project with command line.
    * `npm init -y` & ` tsc --init`
* Now, we gonna install the dependencies for development and separate they from dependencies like **express**
    * `npm install config dotenv express express-validator mongoose morgan winston` - (This dependencies are not for development state!)
    * `npm install @types/config @types/express @types/mongoose @types/morgan @types/node ts-node-dev typescript --save-dev` - (They are!)
* With all dependencies installed, we create one folder called `src` and inside, create one file called `app.ts`
* To hot reload of the application, inside of `package.json` we gonna write inside of `script` this code -> `"dev": "ts-node-dev --respawn --transpile-only src/app.ts"`
* To test, we gonna write a simple line on **app.ts**, this line is just a classic "HELLO WORLD". `console.log("Hello World From Node")`
* Your project folder should be like this:
![folder](img-reposi/folder.png)

(Observation: .gitignore, .gitattribute, README.md and img-reposi are for this repository where you are reading)

* Let's run our project in command line, call the script *dev*: `npm run dev`

***
## Integrating express
***
* Let's start express on `app.ts` importing the modules, create middleware to accept JSON data and start the server.
    * We are using the module *config*, then we gonna create one folder called `config` and create a file called `default.ts` to store sensitive variables.
    * Inside the file we export the variables, creating one object like that:
    * ![config](img-reposi/config.png)
    ```ts
    export default {
        port: 3000,
    }
    ```
* Now we import to ours main file.
```ts
import express from "express"
import config from "config"

const app = express()

//JSON middleware
app.use(express.json())

// Config PORT
const port = config.get<number>("port")


app.listen(port,async()=>{
    console.log(`Server online on port: ${port}`)
})
```

***
## API test routes
***
* To start with routes, we gonna create a new file called `router.ts` inside the file *src*.
* With the file created, let's import functionalities from express, start the code creating one variable to recibe the this functionalities.
![router](img-reposi/router.png)

* Okay! now we wanna create the first router from this project!
    * **First i gonna to remember you that this is a outer filer, so we need to export to our main file!**
* The syntax is not much difference that we already seen, but we need to export each one of ours routers! like that:
```ts
export default router.get("/test", (req:Request, res:Response)=>{
    res.status(200).send("API working!")
})
``` 
* Your file should be like this:
![router2](img-reposi/router2.png)

* Now to finish, let's back to our main file `app.ts` and import our router!
```ts
//Router
import router from './router'
app.use("/api/", router)

```
* Now, all routers arriving from the `routes` receives the prefix /api/
* Your `app.ts` should be like this:
![mainFile](img-reposi/main.png)
***
## Creating database with MongodoDB Atlas
***
* First thing you need to do is crate a account on MongoDB [here](https://www.mongodb.com/atlas/database)
* Then you need create a database on mongoDB Atlas, i don't gonna explain all to you how to do this, but you can read how to do on offical documentation from mongoDB [here](https://www.mongodb.com/docs/atlas/atlas-ui/databases/) 
* BUT i gonna show you how to do it in a simple way!

Create a **new project**
1. ![tuto](img-reposi/mongo/1.jpg)
Choice a **name** and click in **next**
2. ![tuto](img-reposi/mongo/2.jpg)
Click in **create project**
3. ![tuto](img-reposi/mongo/3.jpg)
Then in **DATABASES**, click in **Build Database**
4. ![tuto](img-reposi/mongo/4.jpg)
Choice the plain **free**
5. ![tuto](img-reposi/mongo/5.jpg)
Just click in **Create Cluster**
6. ![tuto](img-reposi/mongo/6.jpg)
Go to **Network Acess**
7. ![tuto](img-reposi/mongo/7.jpg)
Click in **Add IP Address**, then click in **Add Current IP Adress** and **confirm**
8. ![tuto](img-reposi/mongo/8.jpg)
Go to **Database Acess** and click in **Add New Database User**
9. ![tuto](img-reposi/mongo/9.jpg)
Choice one name to our user and click in **Autogenerate Secure Password**, copy the password and user name to one safe place... We gonna need this later
10. ![tuto](img-reposi/mongo/10.jpg)
In the end just gonna click in **Add User**
11. ![tuto](img-reposi/mongo/11.jpg)

I strongly recommend you reed the documentation to know what are you doing!