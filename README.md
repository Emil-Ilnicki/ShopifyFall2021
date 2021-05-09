# ShopifyFall2021
Shopify UI &amp; Web Dev Intern Challenge (Fall 2021)

# Link to app

https://floating-mesa-11748.herokuapp.com/

# Set-Up
```
1. git clone https://github.com/Emil-Ilnicki/ShopifyFall2021.git
```
## Front End (shopifyfall2021)
```
1. yarn install
2. yarn start
```

Because there is no .env file you must put your own OMDB API key inside of the network/API.tsx
```typescript
  };
};

export const moviedatabasecall = async (props: string) => {
// PUT YOUR API KEY HERE
  return await fetch(
    `http://omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}&type=movie&s=` +
      props
  )
    .then((res) => res.json())
    .then((data) => data);
};
```
    
## Back End (shopifyserver)
```
1. yarn install
2. yarn start
```

Because there is no .env file you must create your own free tier MongoDB Atlas Cluster. Follow the link below to set one up
https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/

```
1. Once the cluster is finished being provisioned click the 'connect' button located inside SANDBOX
2. Under `1. Add a connection IP address` select `Allow Access from Anywhere`
3. Under `2. Create a Database User` create any user name and password that you see fit
4. Next go to `Choose a connection method` and select `Connect your application` that will generate a connection string
This will generate a connection string (Ex. mongodb+srv://test:<password>@cluster0.5ahm8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority)
5. Copy the connection string
```

Take the connection string from the above and paste it within ./src/index.ts

```typescript
// PLACE CONNECTION STRING HERE
const DBURL = process.env["MONGODB_URL"];

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(router);

Server.buildServices(app);

mongoose.Promise = global.Promise;
mongoose.connect(DBURL!, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
```
