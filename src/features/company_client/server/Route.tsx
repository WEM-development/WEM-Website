import { Client } from "../Models";

export async function GetCompanyClient(ico: string) : Promise<Client | null> {
    console.log(`Fetching company data for ICO: ${ico}`);

    const response = await fetch(
        "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/" + ico
    );

    if (!response.ok) {
        console.error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        return null;
    }

    const responseJson = await response.json();
    const clientRecordJson = await responseJson["zaznamy"][0];

    return {
        ico: ico,
        name: clientRecordJson.obchodniJmeno,
        address: clientRecordJson["sidlo"].textovaAdresa
    };
}
