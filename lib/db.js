import { MongoClient } from "mongodb";
import { DBNAME, DBPASSWORD, DBCOLLECTION } from "../secrets.json";

export async function connectToDatabase() {
    const client = await MongoClient.connect(
        `mongodb+srv://${DBNAME}:${DBPASSWORD}@cluster0.qdemx.mongodb.net/${DBCOLLECTION}?retryWrites=true&w=majority`
    );

    return client;
}
