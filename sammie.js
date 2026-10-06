
/*
 SIMPLE LOGIN SYSTEM WITH LOCKOUT

 Description:
 The user logs in with a username and password. They get 3 attempts.
 If all 3 are wrong, the account is locked.

 How to run:
 1. Open a terminal in the folder containing this file.
 2. Run: node A00000_simple.js   (rename the file to your access number)

 How to use:
 Type the username and password when asked.
 Demo accounts: admin / Admin123   and   student / Study456
*/

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// The list of users. "locked" starts as false for everyone.
const users = [
  { username: "admin", password: "Admin123", locked: false },
  { username: "student", password: "Study456", locked: false },
];

// FUNCTION 1: asks a question and waits for the user's answer.
function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// FUNCTION 2: looks for a username in the list and returns that user.
function findUser(name) {
  for (const user of users) {       // LOOP: check every user
    if (user.username === name) {
      return user;                  // found them
    }
  }
  return null;                      // not found
}

// FUNCTION 3: handles the login and the 3 attempts.
async function login() {
  const name = await ask("Username: ");
  const user = findUser(name);

  if (user === null) {
    console.log("No such user.");
    return;
  }
  if (user.locked) {
    console.log("This account is LOCKED.");
    return;
  }

  let attempts = 0;
  while (attempts < 3) {            // LOOP: only 3 tries allowed
    const password = await ask("Password: ");
    if (password === user.password) {
      console.log("Login successful. Welcome, " + user.username + "!");
      return;                       // stop the function, login worked
    }
    attempts++;
    console.log("Wrong password. Attempts left: " + (3 - attempts));
  }

  user.locked = true;               // 3 wrong tries, so lock the account
  console.log("Account LOCKED after 3 failed attempts.");
}

// MAIN PROGRAM: shows a menu until the user chooses to exit.
async function main() {
  let choice = "";
  while (choice !== "2") {
    console.log("\n1. Login");
    console.log("2. Exit");
    choice = await ask("Choose: ");

    if (choice === "1") {
      await login();
    } else if (choice !== "2") {
      console.log("Please type 1 or 2.");
    }
  }
  console.log("Goodbye!");
  rl.close();
}

main();
