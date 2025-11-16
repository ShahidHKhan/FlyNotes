import admin from "firebase-admin";

export const verifyUser = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Missing token" });

    const token = header.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded;  // contains uid
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};
