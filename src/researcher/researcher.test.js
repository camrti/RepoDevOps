const researcher = require('./researcher.js');

describe('Testing getCinecaData function', () => {
    let testCases = [
        { 
            desc: "Cineca Single Researcher Found",
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
                            }],
            expectedLength: 1
        },
        { 
            desc: "Cineca Multiple Researcher Found",
            name: 'Giovanni_Russo', 
            expectedResult:[
                            {
                                "fascia": "ORDINARIO",
                                "cognome": "RUSSO",
                                "nome": "GIOVANNI",
                                "genere": "M",
                                "ateneo": "CATANIA",
                                "facolta": "",
                                "ssd": "MAT/08",
                                "sc": "01/A5",
                                "struttura": "MATEMATICA E INFORMATICA",
                                "servizio_altro_ateneo": ""
                            },
                            {
                                "fascia": "ASSOCIATO",
                                "cognome": "RUSSO",
                                "nome": "GIOVANNI",
                                "genere": "M",
                                "ateneo": "SALERNO",
                                "facolta": "",
                                "ssd": "ING-INF/04",
                                "sc": "09/G1",
                                "struttura": "INGEGNERIA DELL'INFORMAZIONE ED ELETTRICA E MATEMATICA APPLICATA",
                                "servizio_altro_ateneo": ""
                            },
                            {
                                "fascia": "STRAORDINARIO TEMPO DETERMINATO",
                                "cognome": "RUSSO",
                                "nome": "GIOVANNI",
                                "genere": "M",
                                "ateneo": "UNIV. TELEMATICA \"E-CAMPUS\"",
                                "facolta": "INGEGNERIA",
                                "ssd": "ICAR/17",
                                "sc": "08/E1",
                                "struttura": "NON DISPONIBILE",
                                "servizio_altro_ateneo": ""
                            },
                            {
                                "fascia": "ASSOCIATO",
                                "cognome": "RUSSO",
                                "nome": "GIOVANNI",
                                "genere": "M",
                                "ateneo": "BARI",
                                "facolta": "",
                                "ssd": "AGR/10",
                                "sc": "07/C1",
                                "struttura": "SCIENZE DEL SUOLO, DELLA PIANTA E DEGLI ALIMENTI (DI.S.S.P.A.)",
                                "servizio_altro_ateneo": ""
                            }
                            ],
            expectedLength: 4
        },       
        {  
            desc: "Cineca No Researcher Found",
            name: 'Pasquale_Caggiano', 
            expectedResult: [],
            expectedLength: 0
        }
    ];

    test.each(testCases)('should return the correct number of reasearcher and the correct information for %s', async ({ desc, name, expectedResult, expectedLength }) => {
        console.log("Test Case: ", desc);
        
        const data = await researcher.getCinecaData(name);
        const minLength = Math.min(data.length, expectedResult.length);

        expect(data.length).toEqual(expectedLength);

        for (let i = 0; i < minLength; i++) {
            expect(data[i].ateneo).toEqual(expectedResult[i].ateneo);
            expect(data[i].cognome).toEqual(expectedResult[i].cognome);
            expect(data[i].nome).toEqual(expectedResult[i].nome);
            expect(data[i].facolta).toEqual(expectedResult[i].facolta);
            expect(data[i].genere).toEqual(expectedResult[i].genere);
            expect(data[i].sc).toEqual(expectedResult[i].sc);
            expect(data[i].servizio_altro_ateneo).toEqual(expectedResult[i].servizio_altro_ateneo);
            expect(data[i].ssd).toEqual(expectedResult[i].ssd);
            expect(data[i].struttura).toEqual(expectedResult[i].struttura);
        }
    });

    test.each(testCases)(`should return the correct type for each researcher field`, async ({ desc, name, expectedResult, expectedLength }) => {
        console.log("Test Case Type: ", desc);

        const data = await researcher.getCinecaData(name);
        const minLength = Math.min(data.length, expectedResult.length);

        for (let i = 0; i < minLength; i++) {
            expect(typeof data[i].ateneo).toBe('string');
            expect(typeof data[i].cognome).toBe('string');
            expect(typeof data[i].nome).toBe('string');
            expect(typeof data[i].facolta).toBe('string');
            expect(typeof data[i].genere).toBe('string');
            expect(typeof data[i].sc).toBe('string');
            expect(typeof data[i].servizio_altro_ateneo).toBe('string');
            expect(typeof data[i].ssd).toBe('string');
            expect(typeof data[i].struttura).toBe('string');
        }
    });
    
});
