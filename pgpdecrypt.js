const fs = require('fs');
const openpgp = require('openpgp');
const process = require('process');
const passphrase = 'migro prospective security';
const encfile = process.argv[2];
const privateKeyArmored = fs.readFileSync('./private.key', 'utf-8');

(async () => {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }); //   .keys[0];
  const decryptionkey = await openpgp.decryptKey({ privateKey: privateKey,
    passphrase
    });
  const encryptedData = await fs.readFileSync(encfile, 'utf-8');
  const mymessage = await openpgp.readMessage({ armoredMessage: encryptedData });
  const decrypted = await openpgp.decrypt({
    message: mymessage,
    decryptionKeys: decryptionkey
  });
  process.stdout.write(decrypted.data + "\n");
})();



