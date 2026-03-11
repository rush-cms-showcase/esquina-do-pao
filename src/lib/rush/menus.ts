import { RushClient } from "./client";

export class Menus extends RushClient {
    async get(menuId: string, params: Record<string, any> = {}) {
        return this.request(`/navigations/${menuId}`, params);
    }
}
