export interface Grouper {
    idGrouper: number;
    name: string;
    description: string;
    value1: string;
    value2: string;
    idUser: number;
    grouperDetails: GrouperDetail[];
}

export interface GrouperDetail {
    idGrouperDetail: number;
    name: string;
    description: string;
    selected: boolean;
    string1: string;
    string2: string;
    string3: string;
    string4: string;
    number1: number;
    number2: number;
    number3: number;
    number4: number;
}
