const openpgp = require('openpgp');

/*
generate();

async function generate() {
    const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
        userIDs: [{ name: 'jweldy', email: 'jbweldy@osfhealthcare.org'}],
        curve: 'ed25519',
        passphrase: 'jimmigro'
    })

};

console.log(privateKeyArmored);     // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
console.log(publicKeyArmored);      // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
*/

(async () => {
    const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
        type: 'ecc', // Type of the key, defaults to ECC
        curve: 'curve25519', // ECC curve name, defaults to curve25519
        userIDs: [{ name: 'jim weldy', email: 'jbweldy@osfhealthcare.org' }], 
        passphrase: 'migro prospective security', // protects the private key
        format: 'armored' // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    });

    console.log(privateKey);     // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
    console.log(publicKey);      // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
    console.log(revocationCertificate); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
})();
