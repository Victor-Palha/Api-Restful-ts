# Api Restful with TypeScript
***
**Install packages and dependencies**
***
## Start the project with command line.
    * `npm init -y` & ` tsc --init`
* Now, we gonna install the dependencies for development and separate they from dependencies like **express**
    * `npm install config dotenv express express-validator mongoose morgan winston` - (These dependencies are not for development state!)
    * `npm install @types/config @types/express @types/mongoose @types/morgan @types/node ts-node-dev typescript --save-dev` - (They are!)
* With all dependencies installed, we create one folder called `src` and inside, create one file called `app.ts`
* To hot reload of the application, inside of `package.json` we gonna write inside of `script` this code -> `"dev": "ts-node-dev --respawn --transpile-only src/app.ts"`
* To test, we gonna write a simple line on **app.ts**, this line is just a classic "HELLO WORLD". `console.log("Hello World From Node")`
* Your project folder should be like this:
![folder](img-reposi/folder.png)

(Observation: .gitignore, .gitattribute, README.md and img-reposi are for this repository where you are reading, so you can ignore in your project!)

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
* First thing you need to do is create a account on MongoDB [here](https://www.mongodb.com/atlas/database)
* Then you need create a database on mongoDB Atlas, i don't gonna explain all to you how to do this, but you can read how to do on offical documentation from mongoDB [here](https://www.mongodb.com/docs/atlas/atlas-ui/databases/) 
* BUT i gonna show you how to do it in a simple way!

1. Create a **new project**
![tuto](img-reposi/mongo/1.jpg)

2. Choice a **name** and click in **next**
![tuto](img-reposi/mongo/2.jpg)

3. Click in **create project**
![tuto](img-reposi/mongo/3.jpg)

4. Then in **DATABASES**, click in **Build Database**
![tuto](img-reposi/mongo/4.jpg)

5. Choice the plain **free**
![tuto](img-reposi/mongo/5.jpg)

6. Just click in **Create Cluster**
![tuto](img-reposi/mongo/6.jpg)

7. Go to **Network Acess**
![tuto](img-reposi/mongo/7.jpg)

8. Click in **Add IP Address**, then click in **Add Current IP Adress** and **confirm**
![tuto](img-reposi/mongo/8.jpg)

9. Go to **Database Acess** and click in **Add New Database User**
![tuto](img-reposi/mongo/9.jpg)

10. Choice one name to our user and click in **Autogenerate Secure Password**, copy the password and user name to one safe place... We gonna need this later
![tuto](img-reposi/mongo/10.jpg)

11. In the end just gonna click in **Add User**
![tuto](img-reposi/mongo/11.jpg)

I strongly recommend you reed the documentation to know what are you doing!

***
## connecting to database
***
First let's to mongoDB website and copy the URL from our database!
1. Go to **databases** and click on **Connect**
![db](img-reposi/mongo2/1.jpg)
2. Then click in **Connect your application**
![db](img-reposi/mongo2/2.jpg)
3. Finally **copy the URL** from your database
![db](img-reposi/mongo2/3.jpg)

* Creating configs to database
    * Now we have the URL from ours database, so lets go to file of configurations that we created previously `config/default.ts`.
    * Inside of object he already created, let's create a new variable called `dbUrl` and it gonna receive our URL.
        * `dbUrl: "mongodb+srv://AshPalha:<password>@cluster0.xdzpwwf.mongodb.net/?retryWrites=true&w=majority"`
    * ![db](img-reposi/mongo2/dbconfig.png)
        * Then we gonna change were is `<passworld>` to yours password that we generate!
* Creating connection to database
    * Now let's create one file called `db.ts` in `config` folder.
    * Import two modules we installed on the beginning of the project: `mongoose` and `config`
        * ```ts
            import mongoose from "mongoose"
            import config from "config"
            ```
    * Now we gonna create one *async function* to connect, called **connect**
    * Then we gonna catch our URL to database using the module `config`.
        * `const url = config.get<string>("dbUrl")`
    * Done it we create a Try Catch to connection to tratament for errors!
        * ```ts
                try {
            
                } catch (err) {
                    
                }
        ```
    * Inside the Try, we gonna call from mongoose and use one method called `connect` and pass our URL as parameter.
        * ```ts
            await mongoose.connect(url)
            console.log("Successful connection to database!")
        ```
    * Inside the catch, we just gonna make a log to the error!
        * ```ts
            console.log("Error to connect to database")
            console.log(`Error: ${err}`)
        ```
    * Now we export the function!
        * `export default connect`
    * ![db](img-reposi/mongo2/connection.png)
* Importing to main file!
    * Inside of `app.ts` we gonna make two modifications.
    * First we gonna import the file `db.ts`.
        * `import db from "../config/db"`
    * Second on the `listen` we gonna call db as `await`, in this way the application just gone run if was connect to the database!
    * ![db](img-reposi/mongo2/import.jpg)
***
## Creating environment variables
***
* We gonna create one file to keep yours sensitives varibles, like API key, Database password etc...
    * First on root, create one file called `.env`.
    ![dotenv](img-reposi/env.png)
    * Inside of file we keep any variable what we want.
    * In your case, lets keep the *username* and *password* from database for now
    * Observation: **The variables always are in upcase**
        * Like that: `VAR_NAME=data`
    * Observation 2: **If you want to post your pessoal project on GitHub, on `.gitignore` put the file `.env` inside! I don't gonna do that because i want you to learn from this!**
    * For you see better, this is the code:
    ![dotenv](img-reposi/env2.png)
    * Remember to change this variables to yours, this variables are from my fictional database from this repository!
* Now let's go to `config/default.ts` and call ours environment variables!
    * But first we need to call the module `dotenv`, so let's go to `src/app.ts` and in the first line call the module.
        * `require("dotenv").config()`
        ![dotenv](img-reposi/dotenv.png)
    * To call the variables from file `.env` in `config/default.ts` we use the function `process.env.NAME_FROM_VARIABLE`
    * We gonna keep the two of yours variables on constants
        * Like that: 
        ```ts
            const db_name = process.env.DB_NAME
            const db_pass = process.env.DB_PASS
        ```
    * Then in variable `dbUrl` let's concatenate on the string
    ```ts
    const db_name = process.env.DB_NAME
    const db_pass = process.env.DB_PASS
    export default {
        port: 3000,
        dbUrl: `mongodb+srv://${db_name}:${db_pass}@cluster0.xdzpwwf.mongodb.net/?retryWrites=true&w=majority`
    }
    ```
    ![dotenv](img-reposi/concatenate.png)