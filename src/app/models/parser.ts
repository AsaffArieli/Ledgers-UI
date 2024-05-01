export interface ParserModel {
    schemes: SchemeModel[];
    keys: ParameterModel[];
}

export interface SchemeModel {
    id: string;
    name: string;
    parameters: ParameterModel[];
    keys: ParameterModel[];
    bank: string;
    settings: {
        key: string,
        value: string
    }[]
}

export interface ParameterModel {
    id: string;
    kind: string;
    scheme_id: string;
    bank: string;
    type: string;
    value_1: string;
    value_2: string;
}
