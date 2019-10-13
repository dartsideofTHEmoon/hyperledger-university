const hash = require('fabric-client/lib/hash');
const elliptic = require('elliptic');
const EC = elliptic.ec;
const jsrsa = require('jsrsasign');
const {KEYUTIL} = jsrsa;

export const sign = (privateKey: any, proposalBytes: any, algorithm: any, keySize: any) => {
    const hashAlgorithm = algorithm.toUpperCase();
    const hashFunction = hash[`${hashAlgorithm}_${keySize}`];
    const ecdsaCurve = elliptic.curves[`p${keySize}`];
    const ecdsa = new EC(ecdsaCurve);
    const key = KEYUTIL.getKey(privateKey);

    const signKey = ecdsa.keyFromPrivate(key.prvKeyHex, 'hex');
    const digest = hashFunction(proposalBytes);

    let sig = ecdsa.sign(Buffer.from(digest, 'hex'), signKey);
    sig = _preventMalleability(sig, key.ecparams);

    return Buffer.from(sig.toDER());
}

const _preventMalleability = (sig: any, curveParams: any) => {
    const halfOrder = ordersForCurve[curveParams.name].halfOrder;
    if (!halfOrder) {
        throw new Error('Can not find the half order needed to calculate "s" value for immalleable signatures. Unsupported curve name: ' + curveParams.name);
    }

    if (sig.s.cmp(halfOrder) === 1) {
        const bigNum = ordersForCurve[curveParams.name].order;
        sig.s = bigNum.sub(sig.s);
    }

    return sig;
}

const ordersForCurve: any = {
    'secp256r1': {
        'halfOrder': elliptic.curves.p256.n.shrn(1),
        'order': elliptic.curves.p256.n
    },
    'secp384r1': {
        'halfOrder': elliptic.curves.p384.n.shrn(1),
        'order': elliptic.curves.p384.n
    }
};