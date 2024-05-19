const researcher = require('./researcher.js');

describe('Testing getCinecaData function', () => {
    let testCases = [
        { name: 'Francesco_Moscato', expectedResult: { "ateneo":"salerno",
                                                        "cognome":"moscato",
                                                        "nome": "francesco",
                                                        "facolta":"",
                                                        "fascia":"associato",
                                                        "genere":"m",
                                                        "sc":"09/h1",
                                                        "servizio_altro_ateneo":"",
                                                        "ssd":"ing-inf/05",
                                                        "struttura":"ingegneria dell'informazione ed elettrica e matematica applicata"}},
        { name: 'Pasquale_Caggiano', expectedResult: {}}
    ];

    it('should have test cases loaded', () => {
        expect(testCases.length).toBeGreaterThan(0);
    });

    it(`should return the Francesco Moscato information`, async () => {
        const data = await researcher.getCinecaData(testCases[0].name);
        console.log(data)
        expect(data.ateneo).toEqual(testCases[0].expectedResult.ateneo);
        expect(data.cognome).toEqual(testCases[0].expectedResult.cognome);
        expect(data.nome).toEqual(testCases[0].expectedResult.nome);
        expect(data.facolta).toEqual(testCases[0].expectedResult.facolta);
        expect(data.genere).toEqual(testCases[0].expectedResult.genere);
        expect(data.sc).toEqual(testCases[0].expectedResult.sc);
        expect(data.servizio_altro_ateneo).toEqual(testCases[0].expectedResult.servizio_altro_ateneo);
        expect(data.ssd).toEqual(testCases[0].expectedResult.ssd);
        expect(data.struttura).toEqual(testCases[0].expectedResult.struttura);
    });

    it(`should return the correct type for each researcher field`, async () => {
        const data = await researcher.getCinecaData(testCases[0].name);
        expect(typeof data.ateneo).toBe('string');
        expect(typeof data.ateneo).toBe('string');
        expect(typeof data.cognome).toBe('string');
        expect(typeof data.nome).toBe('string');
        expect(typeof data.facolta).toBe('string');
        expect(typeof data.genere).toBe('string');
        expect(typeof data.sc).toBe('string');
        expect(typeof data.servizio_altro_ateneo).toBe('string');
        expect(typeof data.ssd).toBe('string');
        expect(typeof data.struttura).toBe('string');
    });

    it(`should return an empty object`, async () => {
        const data = await researcher.getCinecaData(testCases[1].name);
        expect(data).toEqual(testCases[1].expectedResult);
    });
    
});
