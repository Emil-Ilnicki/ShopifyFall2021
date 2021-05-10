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

# Goals
Technical Requirements (TR)
```
1. Search results should come from OMDB's API (free API key:\http://www.omdbapi.com/apikey.aspx).
2. Each search result should list at least its title, year of release and a button to nominate
that film
3. Updates to the search terms should update the result list
4. Movies in search results can be added and removed from the nomination list
5. If a search result has already been nominated, disable its nominate button
6. Display a banner when the user has 5 nominations.
```

Extras (E)
```
1. Save nomination lists if the user leaves the page
2. Animations for loading, adding/deleting movies, notifications
3. Create shareable links
```

# ScreenShots
The screen shots below will demonstrate how each of the above goals have been adressed 

1. Users can search for a movie (TR: 1,2)
![Search Results](https://github.com/Emil-Ilnicki/ShopifyFall2021/blob/main/ShopifyChallengeScreenshots/resultsaftersearch.png)
2. Users can view their nominees and remove them (TR: 4)
![Nominee List](https://github.com/Emil-Ilnicki/ShopifyFall2021/blob/main/ShopifyChallengeScreenshots/nomineelist.png)
![Removed Nominee from list](https://github.com/Emil-Ilnicki/ShopifyFall2021/blob/main/ShopifyChallengeScreenshots/removednominee.png)
3. Nominated movies will have their buttons disabled (TR: 5)
![Disabled buttons for nominated movies](https://github.com/Emil-Ilnicki/ShopifyFall2021/blob/main/ShopifyChallengeScreenshots/nominatedmoviesdisabled.png)
5. Notifcations will popup for certain events (invalid movie, > 5 nominations, etc...) (TR: 6, E: 2)
![Nominated 5 movies]
![Invalid Movie Title](https://github.com/Emil-Ilnicki/ShopifyFall2021/blob/main/ShopifyChallengeScreenshots/invalidmovietitle.png)
![No movie enter](https://github.com/Emil-Ilnicki/ShopifyFall2021/blob/main/ShopifyChallengeScreenshots/searchbarchecking.png)
![Too many results](https://github.com/Emil-Ilnicki/ShopifyFall2021/blob/main/ShopifyChallengeScreenshots/toomanyresultschecking.png)
6. Skeletons will load in place while users are searching for a movie (E: 2)
![Skeleton loading](https://github.com/Emil-Ilnicki/ShopifyFall2021/blob/main/ShopifyChallengeScreenshots/skeletonloading.png)
7. Users nominations will be saved as they are stored within a MongoDB Atlas Cluster and are retrieved on render/re-renders  (E: 1)
8. Users can get a sharable link via modal (E: 3)

![Sharable Link](https://github.com/Emil-Ilnicki/ShopifyFall2021/blob/main/ShopifyChallengeScreenshots/sharablelinkmodal.png)
![Shared Nominee List](https://github.com/Emil-Ilnicki/ShopifyFall2021/blob/main/ShopifyChallengeScreenshots/sharednomineelist.png)

Other users will be able to view the list but not be able to make any changes to it
