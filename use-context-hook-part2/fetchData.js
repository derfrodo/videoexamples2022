const path = require("path");
const fs = require("fs");
const https = require("https");

https.get(
  {
    // pathname:"https://www.regionalstatistik.de/genesisws/downloader/00/tables/41312-01-01-4_00.csv",
    hostname: "www.regionalstatistik.de",
    // port: 80,
    path: "/genesisws/downloader/00/tables/41312-01-01-4_00.csv",
    agent: false, // Create a new agent just for this one request
  },
  (res) => {
    const dataFile = path.join(__dirname, "src", "demo", "data", "data.csv");
    if (fs.existsSync(dataFile)) {
      fs.rmSync(dataFile);
    }
    const stream = fs.createWriteStream(dataFile);
    res.on("data", (data) => {
      stream.write(Buffer.from(data).toString('latin1'));
    });
    res.on("end", () => {
      stream.close();
    });
  }
);
// Data taken from 
// https://www.govdata.de/web/guest/suchen/-/details/rinderbestand-stichtag-regionale-tiefe-kreise-und-krfr-stadte
// Data might get manipulated to be displayed, so expect no actual data for scientific or statistic use!
// 
// licensed by Dataprovider at the time when added to this project (10th April 2022): DL-DE->BY-2.0
/*

Rinderbestand - Stichtag - regionale Tiefe: Kreise und krfr. Städte

Letzte Änderung: -Verfügbarkeit: 
-Offenheit der Lizenz:  Freie NutzungNutzungsbedingungen: 
Datenlizenz Deutschland Namensnennung 2.0Namensnennungstext: 
-URL: https://www.regionalstatistik.de/genesisws/downloader/00/tables/41312-01-01-4_00.csv

----------

Offenheit der Lizenz: Freie Nutzung
Nutzungsbedingungen: Datenlizenz Deutschland Namensnennung 2.0
Letzte Änderung: 14.05.2018
Veröffentlichungsdatum: 14.05.2018
Datenbereitsteller: Regionalstatistik
Veröffentlichende Stelle:
Statistische Ämter des Bundes und der Länder
Kategorien:
Wirtschaft und Finanzen Wirtschaft und Finanzen
*/

/**
 * https://www.govdata.de/dl-de/by-2-0
 * DL-DE->BY-2.0
Datenlizenz Deutschland – Namensnennung – Version 2.0
(1) Jede Nutzung ist unter den Bedingungen dieser „Datenlizenz Deutschland – Namensnennung – Version 2.0" zulässig.

Die bereitgestellten Daten und Metadaten dürfen für die kommerzielle und nicht kommerzielle Nutzung insbesondere

vervielfältigt, ausgedruckt, präsentiert, verändert, bearbeitet sowie an Dritte übermittelt werden;
mit eigenen Daten und Daten Anderer zusammengeführt und zu selbständigen neuen Datensätzen verbunden werden;
in interne und externe Geschäftsprozesse, Produkte und Anwendungen in öffentlichen und nicht öffentlichen elektronischen Netzwerken eingebunden werden.
(2) Bei der Nutzung ist sicherzustellen, dass folgende Angaben als Quellenvermerk enthalten sind:

Bezeichnung des Bereitstellers nach dessen Maßgabe,
der Vermerk „Datenlizenz Deutschland – Namensnennung – Version 2.0" oder „dl-de/by-2-0" mit Verweis auf den Lizenztext unter www.govdata.de/dl-de/by-2-0 sowie
einen Verweis auf den Datensatz (URI).
Dies gilt nur soweit die datenhaltende Stelle die Angaben 1. bis 3. zum Quellenvermerk bereitstellt.

(3) Veränderungen, Bearbeitungen, neue Gestaltungen oder sonstige Abwandlungen sind im Quellenvermerk mit dem Hinweis zu versehen, dass die Daten geändert wurden.
 */
