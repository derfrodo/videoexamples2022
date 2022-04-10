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

// used in fetchData
// const dataUrl = "https://www.regionalstatistik.de/genesisws/downloader/00/tables/41312-01-01-4_00.csv";

import dataUrl from "./data/data.csv";

import { parse } from 'csv/browser/esm/sync';
import  type { CattleCounts } from "./DemoContext";

export enum EntryType {
    unknown = "UNBEKANNT",
    nation = "Nation",
    state = "BUNDESLAND",
    province = "REGIERUNGSBEZIRK",
    urbanDistrict = "Stadtkreis",
    city = "city",

}

const getEntryType = (entry: any[]): { idNumber: string | null, entryType: EntryType } => {

    const identificationNumber = entry.length > 0 && typeof entry[1] === "string" ? entry[1] : null;
    let entryType = EntryType.unknown;

    if (identificationNumber !== null) {
        const length =
            (identificationNumber.length);
        switch (length) {
            case 2:

                entryType = Number.isNaN(Number(identificationNumber)) ?
                    EntryType.nation :
                    EntryType.state;

                break;
            case 3:
                entryType = EntryType.province;
                break;
            case 5:
                entryType = EntryType.urbanDistrict;
                break;
            case 8:
                entryType = EntryType.city;
                break;
            default:
                console.warn(`Failed to map ${identificationNumber} due to unknown mapping for its length`)
                break;
        }
    }
    return { idNumber: identificationNumber, entryType }

}

export const getTodos = async () => {

    const response = await fetch(dataUrl);
    const text =
        await response.text();

    const parsed = await parse(text, {
        delimiter: ';',
        from_line: 8,
        skipRecordsWithError: true,
        trim: true

    });

    const getCountFromEntry = (entry: any[], index: number) => {
        return entry.length > index && Number.isNaN(Number(entry[index])) === false ? Number(entry[index]) : null;
    }
    const getSumFromEntry = (entry: any[], indices: number[]) => {
        let result = 0;
        for (const index of indices) {
            const value = getCountFromEntry(entry, index);
            if (value === null) {
                return null;
            }
            result += value;
        }
        return result;
    }
    const result = parsed.map(
        (entry: any[]) => {
            const typeAndId = getEntryType(entry);
            const date = entry.length > 0 ? new Date(entry[0]).toISOString() : null
            const locationName = entry.length > 2 ? entry[2] : null
            const animalsTotal = getCountFromEntry(entry, 3);
            const milkCows = getCountFromEntry(entry, 4);
            const otherCattle = getCountFromEntry(entry, 5);
            const male = getSumFromEntry(entry, [6, 8, 10, 12]);
            const female = getSumFromEntry(entry, [7, 9, 11, 13]);
            const mapResult: CattleCounts = ({
                ...typeAndId,
                date: date,
                locationName,
                cattleTotal: animalsTotal,
                countByTypes: {
                    milkCows,
                    otherCows: otherCattle,
                },
                countByGender: {
                    male, female
                }
            })
            return mapResult;
        }
    )
    // const firstLine = parsed.find((i: string[]) => i[1] === "DG");
    console.log({ result });


}
