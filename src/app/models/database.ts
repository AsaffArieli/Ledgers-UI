
export interface IDatabaseService {
    merchants: MerchantModel[];
    owners: OwnerModel[];
    funders: FunderModel[];
    selected: ProfileModel[];
}

export abstract class ProfileModel {
    class: string;
    id: string;
    name: string;

    constructor(data: any) {
        this.class = data.class;
        this.id = data.id;
        this.name = data.name;
    }
}

export class MerchantModel extends ProfileModel {
    ein: string;
    industry: string;
    legal_entity: string;
    start_date: Date;
    website: string;
    address: string;
    phone: string;
    email: string;
    owners: any[];

    constructor (data: any) {
        super(data);
        this.ein = data.ein;
        this.industry = data.industry;
        this.legal_entity = data.legal_entity;
        this.start_date = new Date(data.start_date.match(/\d{2} \w{3} \d{4}/)[0]);
        this.website = data.website;
        this.address = data.address;
        this.phone = data.phone;
        this.email = data.email;
        this.owners = data.owners;
    }
}

export class OwnerModel extends ProfileModel {
    ssn: string;
    address: string;
    birth_date: Date;
    phone: string;
    email: string;
    fico: number;
    merchants: any[];

    constructor (data: any) {
        super(data);
        this.ssn = data.ssn;
        this.address = data.address;
        this.birth_date = new Date(data.birth_date.match(/\d{2} \w{3} \d{4}/)[0]);
        this.phone = data.phone;
        this.email = data.email;
        this.fico = data.fico;
        this.merchants = data.merchants;
    }
}

export class FunderModel extends ProfileModel {
    website: string;
    address: string;
    phone: string;
    email: string;
    parameters: { [id: string]: string };

    constructor (data: FunderModel) {
        super(data);
        this.website = data.website;
        this.address = data.address;
        this.phone = data.phone;
        this.email = data.email;
        this.parameters = data.parameters;
    }
}
