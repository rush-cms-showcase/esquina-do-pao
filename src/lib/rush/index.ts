import { RushClient, type RushClientConfig } from "./client";
import { Entries } from "./entries";
import { Menus } from "./menus";
import { Forms } from "./forms";

export class RushCMS extends RushClient {
    public entries: Entries;
    public menus: Menus;
    public forms: Forms;

    constructor(config: RushClientConfig) {
        super(config);
        this.entries = new Entries(config);
        this.menus = new Menus(config);
        this.forms = new Forms(config);
    }

    async getEntries(collection: string, params: Record<string, any> = {}) {
        return this.entries.get(collection, params);
    }

    async getMenu(menuId: string, params: Record<string, any> = {}) {
        return this.menus.get(menuId, params);
    }
}
