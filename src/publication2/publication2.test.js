
const publication2 = require('./publication2');


describe('Testing parseLinkToProfile function', () => {
    test.each([
        {
            desc: 'Valid search query with profile link',
            searchQuery: 'Francesco_Moscato',
            expectedResult: 'https://scholar.google.it/citations?hl=it&user=wuPuQHUAAAAJ'
        },
        {
            desc: 'Valid search query without profile link',
            searchQuery: 'Camilla_Murati',
            expectedResult: null
        }
    ])('should return the correct profile link for $desc', async ({ desc, searchQuery, expectedResult }) => {
        const result = await publication2.parseLinkToProfile(searchQuery);
        expect(result).toEqual(expectedResult);
    });
})

describe('Testing parsePublications function', () => {
    test.each([
        {
            desc: 'Valid profile link with publications',
            profileLink: 'https://scholar.google.com/citations?user=brSCK-YAAAAJ',
            expectedResult: [
              {
                title: "PATIENT WITH CHRONIC CORONARY SYNDROME USE OF MULTIMODAL IMAGING FOR CORRECT DIAGNOSIS AND TREATMENT",
                authors: "D Formigli A Luongo V Franco F Moscato S Cocozza A Parente ",
                paperType: "European Heart Journal Supplements 26 Supplement2 ii187ii187 2024",
                year: "2024",
                citationCount: "0",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:JQOojiI6XY0C"
            },
            {
                title: "Unsupervised Anomaly Detection in Predictive Maintenance using Sound Data",
                authors: "A Ferraro A Galli V La Gatta V Moscato M Postiglione G Sperl ",
                paperType: "N/A",
                year: "2023",
                citationCount: "0",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:UHK10RUVsp4C"
            },
            {
                title: "Towards Semantic Description of Symbology and Heraldry Using Ontologies",
                authors: "A Amato G Cirillo F Moscato",
                paperType: "Computational Intelligence in Security for Information Systems Conference  2022",
                year: "2022",
                citationCount: "0",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:t6usbXjVLHcC"
            },
            {
                title: "C83 USE OF CANGRELOR IN A 63 YEARS OLD MEN SUFFERING FROM ACUTE INFERIOR STELEVATION MYOCARDIAL INFARCTION AND SEVERE IDIOPATHIC THROMBOCYTOPENIC PURPURA A CASE REPORT",
                authors: "S Cocozza D Formigli A Parente E Pirozzi V Franco F Moscato ",
                paperType: "European Heart Journal Supplements 24 SupplementC suac011 081 2022",
                year: "2022",
                citationCount: "1",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:_B80troHkn4C"
            },
            {
                title: "Credit Score Prediction Relying on Machine Learning",
                authors: "F Amato A Ferraro A Galli F Moscato V Moscato G Sperl",
                paperType: "SEBD 546553 2022",
                year: "2022",
                citationCount: "0",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:HE397vMXCloC"
            },
            {
                title: "INDICATIONS FOR THE USE OF OPTICAL COHERENCE TOMOGRAPHY OCT IN THE CATH LAB",
                authors: "D Formigli V Franco F Moscato A Parente E Pirozzi S Cocozza ",
                paperType: "EUROPEAN HEART JOURNAL SUPPLEMENTS 23 C C22C22 2021",
                year: "2021",
                citationCount: "0",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:PELIpwtuRlgC"
            },
            {
                title: "Enhancing random forest classification with NLP in DAMEH A system for DAta Management in eHealth Domain",
                authors: "F Amato L Coppolino G Cozzolino G Mazzeo F Moscato R Nardone",
                paperType: "Neurocomputing 444 7991 2021",
                year: "2021",
                citationCount: "15",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:mvPsJ3kp5DgC"
            },
            {
                title: "A security and privacy validation methodology for ehealth systems",
                authors: "F Amato V Casola G Cozzolino A De Benedictis N Mazzocca ",
                paperType: "ACM Transactions on Multimedia Computing Communications and Applications  2021",
                year: "2021",
                citationCount: "15",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:J-pR_7NvFogC"
            },
            {
                title: "A model for verification and validation of law compliance of smart contracts in IoT environment",
                authors: "F Amato G Cozzolino F Moscato V Moscato F Xhafa",
                paperType: "IEEE Transactions on Industrial Informatics 17 11 77527759 2021",
                year: "2021",
                citationCount: "22",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:V3AGJWp-ZtQC"
            },
            {
                title: "Canbus attack detection with deep learning",
                authors: "F Amato L Coppolino F Mercaldo F Moscato R Nardone A Santone",
                paperType: "IEEE Transactions on Intelligent Transportation Systems 22 8 50815090 2021",
                year: "2021",
                citationCount: "51",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:kRWSkSYxWN8C"
            },
            {
                title: "Smart Conversational User Interface for recommending Cultural Heritage Points of Interest",
                authors: "F Amato F Moscato V Moscato G Sperl",
                paperType: "CEUR Workshop Proceedings 2994 2021",
                year: "2021",
                citationCount: "1",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:XiVPGOgt02cC"
            },
            {
                title: "Cognitive analysis in social networks for viral marketing",
                authors: "A Castiglione G Cozzolino F Moscato V Moscato",
                paperType: "IEEE Transactions on Industrial Informatics 17 9 61626169 2020",
                year: "2020",
                citationCount: "19",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:eflP2zaiRacC"
            },
            {
                title: "An abstract reasoning architecture for privacy policies monitoring",
                authors: "F Amato L Coppolino S DAntonio N Mazzocca F Moscato L Sgaglione",
                paperType: "Future Generation Computer Systems 106 393400 2020",
                year: "2020",
                citationCount: "6",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:5Ul4iDaHHb8C"
            },
            {
                title: "Web artificial intelligence and network applications proceedings of the workshops of the 34th international conference on advanced information networking and applications ",
                authors: "L Barolli F Amato F Moscato T Enokido M Takizawa",
                paperType: "Springer Nature 2020",
                year: "2020",
                citationCount: "4",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:BrmTIyaxlBUC"
            },
            {
                title: "An agentbased approach for recommending cultural tours",
                authors: "F Amato F Moscato V Moscato F Pascale A Picariello",
                paperType: "Pattern Recognition Letters 131 341347 2020",
                year: "2020",
                citationCount: "30",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:8AbLer7MMksC"
            },
            {
                title: "Privacyaware design for EHealth Information Systems",
                authors: "F Amato G Cozzolino F Moscato V Moscato A Picariello G Sperl",
                paperType: "SEBD 175185 2020",
                year: "2020",
                citationCount: "0",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:D_sINldO8mEC"
            },
            {
                title: "Enabling Accountable Collaboration in Distributed Autonomous Systems by Intelligent Agents",
                authors: "F Amato P Femia F Moscato",
                paperType: "Complex Intelligent and Software Intensive Systems Proceedings of the  2020",
                year: "2020",
                citationCount: "2",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:l7t_Zn2s7bgC"
            },
            {
                title: "Analysis of consumers perceptions of food safety risk in social networks",
                authors: "A Amato W Balzano G Cozzolino F Moscato",
                paperType: "Advanced Information Networking and Applications Proceedings of the 33rd  2020",
                year: "2020",
                citationCount: "14",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:Tiz5es2fbqcC"
            },
            {
                title: "Exploiting workflow languages and semantics for validation of security policies in IoT composite services",
                authors: "F Amato V Casola G Cozzolino A De Benedictis F Moscato",
                paperType: "IEEE Internet of Things Journal 7 5 46554665 2019",
                year: "2019",
                citationCount: "18",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:geHnlv5EZngC"
            },
            {
                title: "Generation of game contents by social media analysis and mas planning",
                authors: "F Amato F Moscato F Xhafa",
                paperType: "Computers in Human Behavior 100 286294 2019",
                year: "2019",
                citationCount: "5",
                publicationLink: "https://scholar.google.it/citations?view_op=view_citation&hl=it&oe=ASCII&user=brSCK-YAAAAJ&sortby=pubdate&citation_for_view=brSCK-YAAAAJ:XiSMed-E-HIC"
            }
        ],
            expectedLength: 20
        },
    ])('should return the correct number of publications and the correct information for $desc', async ({ desc, profileLink, expectedResult, expectedLength }) => {
        const result = await publication2.parsePublications(profileLink);
        
        expect(result.length).toBe(expectedResult.length);
        for (let i = 0; i < result.length; i++) {
            expect(result[i].title).toEqual(expectedResult[i].title);
            expect(result[i].authors).toEqual(expectedResult[i].authors);
            expect(result[i].paperType).toEqual(expectedResult[i].paperType);
            expect(result[i].year).toEqual(expectedResult[i].year);
            expect(result[i].citationCount).toEqual(expectedResult[i].citationCount);
            expect(result[i].publicationLink).toEqual(expectedResult[i].publicationLink);
        }
    });
});