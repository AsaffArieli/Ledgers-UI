export class FinancialsModel {
    statements: StatementModel[];
    transactions: TransactionModel[];
    balances: BalanceModel[];
    accounts: string[];
    sections: string[];
    years: number[];
    months: string[];
    banks: string[];

    constructor(data: any) {
        this.statements = data.statements.map(s => new StatementModel(s));
        this.balances = data.balances.map(b => new BalanceModel(b));
        this.transactions = data.transactions.map(t => new TransactionModel(t));
        this.accounts = data.accounts;
        this.sections = data.sections;
        this.years = data.years;
        this.months = data.months;
    }
}

export class StatementModel {
    class: string;
    id: string;
    owner_id: string;
    scheme_id: string;
    date: Date;
    beginning_balance: number;
    account: string;
    bank: string;
    stats: statisticsModel

    constructor(data: any) {
        this.class = 'statement';
        this.id = data.id;
        this.owner_id = data.owner_id;
        this.scheme_id = data.scheme_id;
        this.date = new Date(data.date.split('-')[0], data.date.split('-')[1] - 1, data.date.split('-')[2]);
        this.beginning_balance = data.beginning_balance;
        this.account = data.account;
        this.bank = data.bank;
        this.stats = data.stats;
    }
}

export class TransactionModel {
    class: string;
    id: string;
    statement_id: string;
    owner_id: string;
    scheme_id: string;
    account: string;
    bank: string;
    date: Date;
    amount: number;
    balance: number;
    description: string;
    operation: string;
    section: string;
    pull: string;
    key: string;

    constructor(data: any) {
        this.class = 'transaction';
        this.id = data.id;
        this.owner_id = data.owner_id;
        this.scheme_id = data.scheme_id;
        this.date = new Date(data.date.split('-')[0], data.date.split('-')[1] - 1, data.date.split('-')[2]);
        this.statement_id = data.statement_id;
        this.account = data.account;
        this.bank = data.bank;
        this.amount = data.amount;
        this.balance = data.balance;
        this.description = data.description;
        this.operation = data.operation;
        this.section = data.section;
        this.pull = data.pull;
        this.key = data.key;
    }
}

export class BalanceModel {
    class: string;
    id: string;
    owner_id: string;
    statement_id: string;
    date: Date;
    balance: number;
    stats: statisticsModel;
    account: string;
    bank: string;

    constructor(data: any) {
        this.class = 'balance';
        this.id = data.id;
        this.owner_id = data.owner_id;
        this.date = new Date(data.date.split('-')[0], data.date.split('-')[1] - 1, data.date.split('-')[2]);
        this.statement_id = data.statement_id;
        this.account = data.account;
        this.bank = data.bank;
        this.balance = data.balance;
        this.stats = data.stats;
    }
}

export interface statisticsModel {
    deposits: statsModel;
    withdrawals: statsModel;
    revenue: statsModel;
    credits: statsModel;
    positions: statsModel;
    payments: statsModel;
    transfer_in: statsModel;
    transfer_out: statsModel;
}

export interface statsModel {
    avg: number;
    count: number;
    max: number;
    min: number;
    stddev: number;
    total: number;
}
