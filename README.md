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
## integrating express
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

