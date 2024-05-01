export interface BankingConfigModel {
    sort: string;
    order: boolean;
    group: string;
    filters: FilterModel[];
    sections: string[];
    isAllSelected: boolean;
    accounts: string[];
    years: number[];
    banks: string[];
    view: Date;
}

export interface FilterModel {
    active: boolean;
    type: string;
    column: string;
    filter: string;
    operation: string;
}