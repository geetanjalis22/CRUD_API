import fs from "fs";
import path from "path";
import crypto from "crypto";

// Create 'keys' folder if it doesn't exist
const keysDir = path.join(__dirname, "../../src/keys");
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir);
}

// Generate RSA keys
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "pkcs1", format: "pem" },
  privateKeyEncoding: { type: "pkcs1", format: "pem" },
});

// Save the keys to files
fs.writeFileSync(path.join(keysDir, "private.key"), privateKey);
fs.writeFileSync(path.join(keysDir, "public.key"), publicKey);

console.log("Public and Private keys have been generated successfully!");
