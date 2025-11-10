export interface ICampaignsData {
    id: number,
    name: string,
    state: "En espera" | "Activa" | "Finalizada" | null,
    campaign: Array<{
        name: string,
        create: string,
        initial: string,
        record: boolean
    }>,
    contacts: Array<number>
}

export const CampaignsData : Array<ICampaignsData> = [
    {
        id: 0,
        name: "Primera Campaña",
        state: "En espera",
        contacts: [0,4,5],
        campaign: [
            {
                name: "Primera llamada",
                create: new Date().toString(),
                initial: new Date().toString(),
                record: true
            },
            {
                name: "Segunda llamada",
                create: new Date().toString(),
                initial: new Date().toString(),
                record: true
            },
            {
                name: "Tercera llamada",
                create: new Date().toString(),
                initial: new Date().toString(),
                record: true
            }
        ]
    },
    {
        id: 1,
        name: "Segunda Campaña",
        state: "Activa",
        contacts: [0,3,5,6],
        campaign: [
            {
                name: "Primera llamada",
                create: new Date().toString(),
                initial: new Date().toString(),
                record: true
            },
            {
                name: "Segunda llamada",
                create: new Date().toString(),
                initial: new Date().toString(),
                record: true
            },
            {
                name: "Tercera llamada",
                create: new Date().toString(),
                initial: new Date().toString(),
                record: true
            },
            {
                name: "Cuarta llamada",
                create: new Date().toString(),
                initial: new Date().toString(),
                record: true
            }
        ]
    }
]