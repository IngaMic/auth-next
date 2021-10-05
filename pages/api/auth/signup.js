import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
    // skipping error handling for now
    if (req.method !== "POST") {
        return;
    }
    const data = req.body;
    const { email, password } = data;

    if (
        !email ||
        !email.includes("@") ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({ message: "Invalid credentials" });
        return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });
    console.log("existingUser", existingUser);
    if (existingUser) {
        res.status(422).json({ message: "User already exists" });
        client.close();
        return;
    }
    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
        email: email,
        password: hashedPassword,
    });

    res.status(201).json({ message: "Created user" });
    client.close();
}

export default handler;
