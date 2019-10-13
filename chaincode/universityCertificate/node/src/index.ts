import {Shim} from 'fabric-shim';
import {UniversityCertificate} from "./universityCertificate";

export class UniversityCertificateContract {

    async Init(stub) {
        console.info(stub.getFunctionAndParameters())
        console.info('=========== Instantiated University Certificate Chaincode ===========')
        return Shim.success()
    }

    async Invoke(stub) {
        console.info('Transaction ID: ' + stub.getTxID())

        let ret = stub.getFunctionAndParameters()
        console.info(ret)

        let method = this[ret.fcn]
        if (!method) {
            console.log('no function of name:' + ret.fcn + ' found')
            throw new Error('Received unknown function ' + ret.fcn + ' invocation')
        }
        try {
            let payload = await method(stub, ret.params, this)
            return Shim.success(payload)
        } catch (err) {
            console.log(err)
            return Shim.error(err)
        }
    }

    async createCertificate(stub, args) {
        if (args.length != 8) {
            throw new Error('Incorrect number of arguments. Expecting 2');
        }
        //Additional validation

        const certificateId = args[0]
        const participantName = args[1]
        const universityId = args[2]
        const status = args[3]
        const isValidated = args[4]
        const timestamp = args[5]
        const notaryId = args[6]
        const reporterId = args[7]


        const certificateState = await stub.getState(certificateId)
        if (certificateState.toString()) {
            throw new Error('This certificate already exists: ' + certificateId)
        }

        const universityCertificate = new UniversityCertificate(certificateId, participantName, universityId, status, isValidated, reporterId, notaryId, timestamp)

        await stub.putState(certificateId, Buffer.from(JSON.stringify(universityCertificate)));
        let indexName = 'certificateId~notaryId'
        let nameOwnerIndex = await stub.createCompositeKey(indexName, [certificateId, notaryId]);

        await stub.putState(nameOwnerIndex, Buffer.from('\u0000'));
    }

    async initMarble(stub, args, thisClass) {
        if (args.length != 4) {
            throw new Error('Incorrect number of arguments. Expecting 4');
        }
        // ==== Input sanitation ====
        console.info('--- start init marble ---')
        if (args[0].lenth <= 0) {
            throw new Error('1st argument must be a non-empty string');
        }
        if (args[1].lenth <= 0) {
            throw new Error('2nd argument must be a non-empty string');
        }
        if (args[2].lenth <= 0) {
            throw new Error('3rd argument must be a non-empty string');
        }
        if (args[3].lenth <= 0) {
            throw new Error('4th argument must be a non-empty string');
        }
        let marbleName = args[0];
        let color = args[1].toLowerCase();
        let owner = args[3].toLowerCase();
        let size = parseInt(args[2]);
        if (typeof size !== 'number') {
            throw new Error('3rd argument must be a numeric string');
        }

        // ==== Check if marble already exists ====
        let marbleState = await stub.getState(marbleName);
        if (marbleState.toString()) {
            throw new Error('This marble already exists: ' + marbleName);
        }

        // ==== Create marble object and marshal to JSON ====
        let marble: any = {};
        marble.docType = 'marble';
        marble.name = marbleName;
        marble.color = color;
        marble.size = size;
        marble.owner = owner;

        // === Save marble to state ===
        await stub.putState(marbleName, Buffer.from(JSON.stringify(marble)));
        let indexName = 'color~name'
        let colorNameIndexKey = await stub.createCompositeKey(indexName, [marble.color, marble.name]);
        console.info(colorNameIndexKey);
        //  Save index entry to state. Only the key name is needed, no need to store a duplicate copy of the marble.
        //  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
        await stub.putState(colorNameIndexKey, Buffer.from('\u0000'));
        // ==== Marble saved and indexed. Return success ====
        console.info('- end init marble');
    }

    async getAllResults(iterator, isHistory) {
        let allResults = [];
        while (true) {
            let res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                let jsonRes: any = {};

                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.Timestamp = res.value.timestamp;
                    jsonRes.IsDelete = res.value.is_delete.toString();
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                } else {
                    jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return allResults;
            }
        }
    }

    async getQueryResultForQueryString(stub, queryString, thisClass) {
        let resultsIterator = await stub.getQueryResult(queryString);
        let method = thisClass['getAllResults']

        let results = await method(resultsIterator, false)

        return Buffer.from(JSON.stringify(results))
    }

    async queryMarblesByOwner(stub, args, thisClass) {
        //   0
        // 'bob'
        if (args.length < 1) {
            throw new Error('Incorrect number of arguments. Expecting owner name.')
        }

        let owner = args[0].toLowerCase();
        let queryString: any = {};
        queryString.selector = {};
        queryString.selector.docType = 'marble';
        queryString.selector.owner = owner;
        let method = thisClass['getQueryResultForQueryString'];
        let queryResults = await method(stub, JSON.stringify(queryString), thisClass);
        return Shim.success(queryResults);
    }

    async queryCertificatesByNotaryId(stub, args, thisClass) {

        if (args.length !== 1) {
            throw new Error('Incorrect number of arguments. Expecting notary id.')
        }

        let notaryId = args[0].toLowerCase()
        let queryString: any = {}
        queryString.selector = {}
        queryString.selector.notaryId = notaryId
        queryString.selector.isValidated = "false"
        let method = thisClass['getQueryResultForQueryString']
        let queryResults = await method(stub, JSON.stringify(queryString), thisClass)
        console.log(queryResults)
        return queryResults
    }
}

Shim.start(new UniversityCertificateContract())
