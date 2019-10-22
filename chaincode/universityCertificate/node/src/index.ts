import {Shim} from 'fabric-shim';
import {UNIVERSITY_CERTIFICATE, UniversityCertificate, UniversityCertificateStatus} from "./universityCertificate";
import {
    UNIVERSITY_CERTIFICATE_PROPOSAL,
    UniversityCertificateProposal,
    UniversityCertificateProposalStatus
} from "./universityCertificateProposal";

const contract = class UniversityCertificateContract {

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
        console.log(this, ret.fcn, ret), "tuuu"
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

    /**
     * Attest certificate based on certificate proposal
     * @param stub
     * @param args
     */
    async attestCertificate(stub, args, thisClass) {
        console.info('============= START : Attest Certificate  ===========')

        if (args.length !== 2) {
            throw new Error('Incorrect number of arguments.')
        }

        const certificateProposalId = args[0]
        const certificateId = args[1]

        const certificateProposalAsBytes = await stub.getState(certificateProposalId)

        if (!certificateProposalAsBytes.toString()) {
            throw new Error(` Certificate proposal does not exists.`);
        }
        let certificateProposal = JSON.parse(certificateProposalAsBytes.toString())

        //Validate if correct organisation and if fileHash is same as original
        //certificate in university chaincode, if valid create certificate

        //Validate if certificate with give certificate exists

        const universityCertificate = new UniversityCertificate(
            UNIVERSITY_CERTIFICATE,
            UniversityCertificateStatus.ATTESTED,
            certificateProposal.universityId,
            certificateProposal.fileHash,
            certificateProposal.ownerId,
            new Date().toTimeString()
        )

        certificateProposal.status = UniversityCertificateProposalStatus.VALIDATED

        await stub.putState(certificateId, Buffer.from(JSON.stringify(universityCertificate)))


        await stub.putState(certificateProposalId, Buffer.from(JSON.stringify(certificateProposal)))

    }

    /**
     * Creates new certificate proposal
     * @param stub
     * @param args
     */
    async createCertificateProposal(stub, args, thisClass) {
        console.info('============= START : Create Certificate Proposal ===========')

        if (args.length !== 4) {
            throw new Error('Incorrect number of arguments.');
        }

        //Additional validation if certificate proposal exists etc.

        const certificateProposalId = args[0]
        const participiantKey = args[1]
        const fileHash = args[2]
        const universityId = args[3]
        const timestamp = new Date().toTimeString()

        const universityCertificateProposal = new UniversityCertificateProposal(
            UNIVERSITY_CERTIFICATE_PROPOSAL,
            participiantKey,
            fileHash,
            universityId,
            UniversityCertificateProposalStatus.TO_BE_VALIDATED,
            timestamp
        )

        await stub.putState(certificateProposalId, Buffer.from(JSON.stringify(universityCertificateProposal)));
        console.info('============= END : Create Certificate Proposal ===========')
    }

    /**
     * Returns certificateProposals by status
     * @param stub
     * @param args
     * @param thisClass
     */
    async queryCertificateProposalsByStatus(stub, args, thisClass) {

        if (args.length !== 1) {
            throw new Error('Incorrect number of arguments.');
        }

        const queryStatus = parseInt(args[0])

        let queryString: any = {}
        queryString.selector = {}
        queryString.selector.docType = UNIVERSITY_CERTIFICATE_PROPOSAL
        queryString.selector.status = queryStatus
        let method = thisClass['getQueryResultForQueryString']
        let queryResults = await method(stub, JSON.stringify(queryString), thisClass)
        console.log(queryResults)
        return queryResults
    }

    /**
     * Returns attested certificates
     * @param stub
     * @param args
     * @param thisClass
     */
    async queryCertificates(stub, args, thisClass) {
        let queryString: any = {}
        queryString.selector = {}
        queryString.selector.docType = UNIVERSITY_CERTIFICATE
        queryString.selector.status = UniversityCertificateStatus.ATTESTED
        let method = thisClass['getQueryResultForQueryString']
        let queryResults = await method(stub, JSON.stringify(queryString), thisClass)
        console.log(queryResults)
        return queryResults
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
}

Shim.start(new contract())
