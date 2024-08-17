// const bcrypt = require("bcryptjs");

// // Simulate the stored hash from the database
// const storedHash = "$2a$10$3NE1jHAKsb.hsnCfqIlhYOFIdn4sSJ2tiRKbLpJSu.iDM4o7XqRtu"; 

// // Password entered by the user
// const passwordEntered = "vissi123"; // This should match the password used during signup

// bcrypt.compare(passwordEntered, storedHash, (err, result) => {
//     if (err) {
//         console.error("Error during comparison:", err);
//     } else {
//         console.log("Password match result:", result); // Should log 'true' if the passwords match
//     }
// });


// const bcrypt = require("bcryptjs");

// const password = "vissi123";

// // Create a new hash
// bcrypt.hash(password, 10, (err, newHash) => {
//     if (err) {
//         console.error("Error during hashing:", err);
//     } else {
//         console.log("New Hash:", newHash);
        
//         // Compare the new hash with the original password
//         bcrypt.compare(password, newHash, (err, result) => {
//             if (err) {
//                 console.error("Error during comparison:", err);
//             } else {
//                 console.log("Password match result with new hash:", result);
//             }
//         });
//     }
// });

const bcrypt = require("bcryptjs");

const enteredPassword = "vissi123"; // The password you want to hash

// Hash the password
bcrypt.hash(enteredPassword, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error during hashing:', err);
    } else {
        console.log('Hashed password:', hashedPassword); // Display the hashed value of "vissi123"
        
        // Now compare the entered password with the stored hash
        // const storedPasswordHash = "$2a$10$Yc6.dxGJnkXmYcJ01//CY./94zvMbmV96jUfOkSvYuzJxNMdMXlOO";
        const storedPasswordHash = "$2a$10$wkHWlIsdBuMFJgqe.YjofuIEPHlxUoVuu2sCrAPcvV3o1oEMvA.gK";

        bcrypt.compare(enteredPassword, storedPasswordHash, (err, isMatch) => {
            if (err) {
                console.error('Error during comparison:', err);
            } else {
                console.log('Password match:', isMatch); // Check if the password matches
            }
        });
    }
});
