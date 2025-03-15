const regEx = /[0-9a-zA-ZăâîșțĂÂÎȘȚ\'\-\_]+/gi;

function sentencesToWords(messageArray) {
    const messages = new Object();
    for( const message of messageArray ) {
        if(messages[message.msgSender]) {
            messages[message.msgSender].push(message.msgContent);
        } else {
            messages[message.msgSender] = new Array();
            messages[message.msgSender].push(message.msgContent);
        }
    }
    return messages;
}

function wordCount(messages) {
    const stats = new Object();
    for ( const key of Object.keys(messages) ) {
        messages[key] = messages[key].map(msg => (msg.match(regEx) || []).join(' '))
                                     .flatMap(msg => msg.split(' ')).sort();

        stats[key] = new Object();

        const currentMessageArray = messages[key];

        for( let i = 1; i <= currentMessageArray.length; i++ ) {
            if(currentMessageArray[i-1] === currentMessageArray[i]) {
                if(!stats[key][currentMessageArray[i-1]]) {
                    stats[key][currentMessageArray[i-1]] = i-1;
                }
            }
            if(currentMessageArray[i-1] != currentMessageArray[i]) {
                if(!stats[key][currentMessageArray[i-1]]) {
                    stats[key][currentMessageArray[i-1]] = 1;
                } else {
                    stats[key][currentMessageArray[i-1]] -= i;
                    stats[key][currentMessageArray[i-1]] *= -1;
                }
            }
        }
    }
    return stats;
}

exports.topFiveWords = function topFiveWords(messageArray) {
    // All the words in the messages
    const messages = sentencesToWords(messageArray);
    const stats = wordCount(messages);

    const topFive = new Object();
    const returnObject = {};    

    for(const key of Object.keys(stats)) {
        topFive[key] = Object.entries(stats[key]).sort((a, b) => b[1] - a[1]).slice(0,5);
        returnObject[key] = new Array();
        for(const word of topFive[key]) {
            returnObject[key].push({
                'word': word[0],
                'count': word[1]
            });
        }
    }

    return returnObject;
};

exports.messageCount = function messageCount(messageArray) {
    const returnObject = {
        'title': 'Message Count',
        'youValue': '',
        'otherValue': '',
        'youLabel': '',
        'otherLabel': '',
    };
    const messages = sentencesToWords(messageArray);

    returnObject.youLabel = Object.keys(messages)[0];
    returnObject.youValue = messages[returnObject.youLabel].length;
    returnObject.otherLabel = Object.keys(messages)[1];
    returnObject.otherValue = messages[returnObject.otherLabel].length;

    return returnObject;
}

exports.avgResponseTime = function avgResponseTime(messageArray) {
    // Check name and time sent.
    const returnObject = {
        title: "Average Response Time",
        youValue: "",
        otherValue: "",
        youLabel: "",
        otherLabel: "",
    };

    const averageTime = {};

    for(let i = 0; i < messageArray.length - 1; i++) {
        const sender = messageArray[i + 1].msgSender;
        if(sender !== messageArray[i].msgSender) {
            if(!averageTime[sender]) averageTime[sender] = new Array();

            // Average time in minutes
            averageTime[sender].push( (new Date(messageArray[i + 1].msgDate) - new Date(messageArray[i].msgDate)) / 60000 );
        }
    };

    returnObject.youLabel = Object.keys(averageTime)[0];
    returnObject.youValue = averageTime[returnObject.youLabel].reduce((acc, val) => acc + val, 0) / averageTime[returnObject.youLabel].length;

    returnObject.otherLabel = Object.keys(averageTime)[1];
    returnObject.otherValue = averageTime[returnObject.otherLabel].reduce((acc, val) => acc + val, 0) / averageTime[returnObject.otherLabel].length;

    return returnObject;
}

exports.messages = [
    {
      "msgDate": "2022-09-09T06:59:00.000Z",
      "msgSender": "Guși",
      "msgContent": "locație: https://maps.google.com/?q=45.0664656,23.2943729"
    },
    {
      "msgDate": "2022-09-09T06:59:00.000Z",
      "msgSender": "Guși",
      "msgContent": "locație în timp real distribuită\n"
    },
    {
      "msgDate": "2022-09-09T07:02:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "Aight i'm here"
    },
    {
      "msgDate": "2022-09-09T07:02:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "Vad ca e poarta si gardieni la intrare"
    },
    {
      "msgDate": "2022-11-01T20:09:00.000Z",
      "msgSender": "Guși",
      "msgContent": "locație: https://maps.google.com/?q=45.7450828,21.239634"
    },
    {
      "msgDate": "2022-11-01T20:16:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Pe bloc la intrare scrie ripensia nr 8"
    },
    {
      "msgDate": "2022-11-01T20:16:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Vin eu jos după tine"
    },
    {
      "msgDate": "2022-11-01T20:18:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "Acum ies de la mine din bloc"
    },
    {
      "msgDate": "2022-11-01T20:21:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Where u"
    },
    {
      "msgDate": "2022-11-01T20:22:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "Pe drumuri"
    },
    {
      "msgDate": "2022-11-01T20:23:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Te vazusem"
    },
    {
      "msgDate": "2022-11-01T20:24:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "practic sunt aici"
    },
    {
      "msgDate": "2022-12-24T19:45:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Craciun fericit!🎄"
    },
    {
      "msgDate": "2022-12-24T20:05:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "Pe whatsapp? Did you make a program to send this message to your contacts? =)))))"
    },
    {
      "msgDate": "2022-12-24T20:05:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "Craciun fericit gusi =))))"
    },
    {
      "msgDate": "2022-12-24T20:05:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "🎄🎄🎄"
    },
    {
      "msgDate": "2022-12-24T21:02:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Trimisai de mana"
    },
    {
      "msgDate": "2022-12-24T21:02:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Dar acum ca zici"
    },
    {
      "msgDate": "2022-12-24T21:02:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Hmmmmmm"
    },
    {
      "msgDate": "2022-12-24T21:10:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "Si fa-l sa faca asta automat la fiecare craciun =))))"
    },
    {
      "msgDate": "2023-02-28T08:56:00.000Z",
      "msgSender": "Guși",
      "msgContent": "joi la 18 am dct-ul"
    },
    {
      "msgDate": "2023-02-28T08:56:00.000Z",
      "msgSender": "Guși",
      "msgContent": "avem"
    },
    {
      "msgDate": "2023-02-28T08:57:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "yoosh"
    },
    {
      "msgDate": "2023-02-28T08:59:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "si pe prof tot octavian il cheama"
    },
    {
      "msgDate": "2023-02-28T08:59:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "vai ce caterimca o sa fie"
    },
    {
      "msgDate": "2023-03-15T10:09:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Ma simt ca in gimnaziu"
    },
    {
      "msgDate": "2023-06-17T14:52:00.000Z",
      "msgSender": "Guși",
      "msgContent": "europass or https://www.cv-template.com/en/account/choose-template"
    },
    {
      "msgDate": "2023-06-17T14:52:00.000Z",
      "msgSender": "Guși",
      "msgContent": "europass e mai universal acceptat si pt universitate / alte chestii mai oficiale"
    },
    {
      "msgDate": "2023-06-17T14:57:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "oki danke"
    },
    {
      "msgDate": "2023-06-17T14:58:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "exista vreo metoda buna sa-l completez?"
    },
    {
      "msgDate": "2023-06-17T14:58:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "gen, cum mentionez proiectele sau nush"
    },
    {
      "msgDate": "2023-06-17T14:58:00.000Z",
      "msgSender": "Guși",
      "msgContent": "in europass it ida un formular si gen bagi informatii in el"
    },
    {
      "msgDate": "2023-06-17T14:58:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "oki thanks"
    },
    {
      "msgDate": "2023-06-17T14:59:00.000Z",
      "msgSender": "Guși",
      "msgContent": "la adresa timisoara si strada"
    },
    {
      "msgDate": "2023-06-17T14:59:00.000Z",
      "msgSender": "Guși",
      "msgContent": "la proiecte nume link de github(daca e )"
    },
    {
      "msgDate": "2023-06-17T14:59:00.000Z",
      "msgSender": "Guși",
      "msgContent": "si ce ai facut / studiat in proiect"
    },
    {
      "msgDate": "2023-06-17T15:03:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "oki, makes sense"
    },
    {
      "msgDate": "2023-06-17T15:03:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Cat mai scurt tho"
    },
    {
      "msgDate": "2023-06-17T15:04:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "that's helpful advice, thanks"
    },
    {
      "msgDate": "2023-06-18T20:59:00.000Z",
      "msgSender": "Guși",
      "msgContent": "cum l-ai facut pana la urma?"
    },
    {
      "msgDate": "2023-06-18T21:07:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "il fac maine"
    },
    {
      "msgDate": "2023-06-18T21:07:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "eu deja aveam unu ok facut in canva"
    },
    {
      "msgDate": "2023-06-18T21:08:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "da eram curios cum pot sa-mi fac unu mai decent ca sa am cu ce aplica la companii"
    },
    {
      "msgDate": "2023-06-18T21:08:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Oki"
    },
    {
      "msgDate": "2023-06-30T12:32:00.000Z",
      "msgSender": "Guși",
      "msgContent": "Ca pe tatal nostru"
    },
    {
      "msgDate": "2023-06-30T12:37:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "Danke capitane"
    },
    {
      "msgDate": "2023-06-30T12:37:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "cap coada sus jos invat testamentu de mi-l trimesasi"
    },
    {
      "msgDate": "2023-06-30T12:38:00.000Z",
      "msgSender": "Bubu",
      "msgContent": "si pe langa astea ma gandesc ca mai trebuie sa stiu cum functioneaza exact fiecare protocol in parte?"
    },
    {
      "msgDate": "2023-06-30T13:08:00.000Z",
      "msgSender": "Guși",
      "msgContent": "intreaba-l pe rosu ce intrebari ii picara"
    },
    {
      "msgDate": "2023-06-30T13:08:00.000Z",
      "msgSender": "Guși",
      "msgContent": "nu chiar"
    }
  ]  