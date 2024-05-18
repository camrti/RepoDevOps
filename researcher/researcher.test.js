const path = require('path')
const researcher = require('./researcher.js');

const csvFilePath = path.join(__dirname, './testCases/researcher.csv'); 

describe('Testing getCinecaData function', () => {
    let testCases = [
        { name: 'Francesco_Moscato', expectedResult: [{ "ateneo":"SALERNO",
                                                        "cognome_nome":"MOSCATO Francesco",
                                                        "facolta":"","fascia":"Associato",
                                                        "genere":"M",
                                                        "sc":"09/H1",
                                                        "servizio_altro_ateneo":"",
                                                        "ssd":"ING-INF/05",
                                                        "struttura":"Ingegneria dell\'Informazione ed Elettrica e Matematica applicata"}]},
        { name: 'Pasquale_Caggiano', expectedResult: []}
    ];

    it('should have test cases loaded', () => {
        expect(testCases.length).toBeGreaterThan(0);
    });

    it(`should return the Francesco Moscato information`, async () => {
        const data = await researcher.getCinecaData(testCases[0].name);
        expect(data.ateneo).toEqual(testCases[0].expectedResult.ateneo);
        expect(data.cognome_nome).toEqual(testCases[0].expectedResult.cognome_nome);
        expect(data.facolta).toEqual(testCases[0].expectedResult.facolta);
        expect(data.genere).toEqual(testCases[0].expectedResult.genere);
        expect(data.sc).toEqual(testCases[0].expectedResult.sc);
        expect(data.servizio_altro_ateneo).toEqual(testCases[0].expectedResult.atservizio_altro_ateneoeneo);
        expect(data.ssd).toEqual(testCases[0].expectedResult.ssd);
        expect(data.struttura).toEqual(testCases[0].expectedResult.struttura);

    });

    it(`should return an empty array`, async () => {
        const data = await researcher.getCinecaData(testCases[1].name);
        expect(data).toEqual(testCases[1].expectedResult);
    });
    
});
