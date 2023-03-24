/*
THIS IS THE CODE THAT ENCRYPTS THE DATA:

const myopenpgp = window.openpgp; // use as CommonJS, AMD, ES6 module or via window.openpgp

(async () => {
    const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n` +
    `xjMEY+02aBYJKwYBBAHaRw8BAQdA7nkhPRsGbsJWMMdA+aKHtKrZ3VZpzeda4eYsgVG0K37NJWppbSB3ZWxkeSA8amJ3ZWxkeUBvc2ZoZWFsdGhjYXJlLm9yZz7CjAQQFgoAPgUCY+02aAQLCQcICRA0kpztewlJyAMVCAoEFgACAQIZAQIbAwIeARYhBCze0jqPlJ7voSxfUzSSnO17CUnIAAANQAD/W9sP0thXt2HmLKogkK5EtiSvhUTp1ALEMROiFXvNjwABAN557ks6TBdgLJxH87DDgfRrTVZMqq0o/QsrA+PW6awLzjgEY+02aBIKKwYBBAGXVQEFAQEHQPG2QbSpZAfp1OsUxbGoKJtvm406N9grhppB1QpyDn1HAwEIB8J4BBgWCAAqBQJj7TZoCRA0kpztewlJyAIbDBYhBCze0jqPlJ7voSxfUzSSnO17CUnIAAD32QD7BYkxX2j7yWhCwrP4RFJo8G//sJI/iNRDjoYe1Njnzb8BALpT7tfQAVKtlFW80DGSgy26tufDb7p30UmG/fhsid8P=fKhW\n` + 
    `-----END PGP PUBLIC KEY BLOCK-----`;
    const publicKey = await myopenpgp.readKey({ armoredKey: publicKeyArmored });
    const encrypted = await myopenpgp.encrypt({
        message: await myopenpgp.createMessage({ text: 'Hello, World!' }), // input as Message object
        encryptionKeys: publicKey
    });
    console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
})();

*/

const fs = require('fs');
const openpgp = require('openpgp');
const passphrase = 'migro prospective security';

const privateKeyArmored = fs.readFileSync('./private.key', 'utf-8');
console.log("privatekeyarmored is " + privateKeyArmored);

(async () => {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }); //   .keys[0];
  //const decryptkey = await privateKey.decryptKey(passphrase);
  const decryptionkey = await openpgp.decryptKey({ privateKey: privateKey,
    passphrase
    });
  const encryptedData = await fs.readFileSync('armsg', 'utf-8');
  const mymessage = await openpgp.readMessage({ armoredMessage: encryptedData });
  const decrypted = await openpgp.decrypt({
    message: mymessage,
    decryptionKeys: decryptionkey
//    passphrase: passphrase
  });
  console.log(`successfully decrypted data... 👇`);
  console.log(decrypted.data);
})();

/*
(async () => {
    const privateKeyFile = fs.readFileSync('./private.key', 'utf-8');
    //const privateKey = await openpgp.readKey({ armoredKey: privateKeyArmored });
    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyFile }),
        passphrase
    });

    const encrypted = fs.readFileSync('./armsg', 'utf-8');
*/

/*
    const message = await openpgp.readMessage({
        armoredMessage: openpgp.message.readArmored(encrypted) // parse armored message
    });
*/


/*
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: 'Hello, World!' }), // input as Message object
        encryptionKeys: publicKey
    });
    console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
*/

