const researcher = require('./researcher.js');

describe('Testing getCinecaData function', () => {
    let testCases = [
        { 
            name: 'Francesco_Moscato', 
            expectedResult:[{ 
                                "ateneo": "SALERNO",
                                "cognome": "MOSCATO",
                                "nome": "FRANCESCO",
                                "facolta": "",
                                "fascia": "ASSOCIATO",
                                "genere": "M",
                                "sc": "09/H1",
                                "servizio_altro_ateneo": "",
                                "ssd": "ING-INF/05",
                                "struttura": "INGEGNERIA DELL'INFORMAZIONE ED ELETTRICA E MATEMATICA APPLICATA"
                            }]
        },
        {  
            name: 'Pasquale_Caggiano', 
            expectedResult: []
        }
    ];

    it('should have test cases loaded', () => {
        expect(testCases.length).toBeGreaterThan(0);
    });

    it(`should return the Francesco Moscato information`, async () => {
        const data = await researcher.getCinecaData(testCases[0].name);
        expect(data[0].ateneo).toEqual(testCases[0].expectedResult[0].ateneo);
        expect(data[0].cognome).toEqual(testCases[0].expectedResult[0].cognome);
        expect(data[0].nome).toEqual(testCases[0].expectedResult[0].nome);
        expect(data[0].facolta).toEqual(testCases[0].expectedResult[0].facolta);
        expect(data[0].genere).toEqual(testCases[0].expectedResult[0].genere);
        expect(data[0].sc).toEqual(testCases[0].expectedResult[0].sc);
        expect(data[0].servizio_altro_ateneo).toEqual(testCases[0].expectedResult[0].servizio_altro_ateneo);
        expect(data[0].ssd).toEqual(testCases[0].expectedResult[0].ssd);
        expect(data[0].struttura).toEqual(testCases[0].expectedResult[0].struttura);
    });

    it(`should return the correct type for each researcher field`, async () => {
        const data = await researcher.getCinecaData(testCases[0].name);
        expect(typeof data[0].ateneo).toBe('string');
        expect(typeof data[0].ateneo).toBe('string');
        expect(typeof data[0].cognome).toBe('string');
        expect(typeof data[0].nome).toBe('string');
        expect(typeof data[0].facolta).toBe('string');
        expect(typeof data[0].genere).toBe('string');
        expect(typeof data[0].sc).toBe('string');
        expect(typeof data[0].servizio_altro_ateneo).toBe('string');
        expect(typeof data[0].ssd).toBe('string');
        expect(typeof data[0].struttura).toBe('string');
    });

    it(`should return an empty object`, async () => {
        const data = await researcher.getCinecaData(testCases[1].name);
        expect(data).toEqual(testCases[1].expectedResult);
    });
    
});
