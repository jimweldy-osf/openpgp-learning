const fs = require('fs');
const openpgp = require('openpgp');
const process = require('process');
const clearfile = process.argv[2];
const encfile = clearfile + ".enc";
(async () => {
    const publicKeyArmored = fs.readFileSync('./public.key', 'utf-8');
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
    const messageFile = await fs.readFileSync(clearfile, 'utf-8');
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: messageFile }), // input as Message object
        encryptionKeys: publicKey
    });
    await fs.writeFileSync(encfile, encrypted);
})();
