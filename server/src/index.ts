import express from "express";
import { graphqlHTTP } from "express-graphql"; //initialize the graphql server
import cors from "cors"; //rect to graphql
import { createConnection } from "typeorm"; //fun in typeorm to make connection database to application

import {schema} from "./Schema"

const main = async () => {

  await createConnection({
    type:"mysql",
    database:"graphQLCRUD",
    username:"root",
    password:"",
    logging:true,
    synchronize:false,
    entities:[]
  })

  const app = express();
  app.use(cors());
  app.use(express.json());
    app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql: true,
      })
    );
  app.listen(3001, () => {
    console.log("Server Running on port 3001 🐳 ");
  });
};

main().catch((err) => {
  console.log(err);
});
