import { RushClient, type RushClientConfig } from "./client";

export class Forms extends RushClient {
    constructor(config: RushClientConfig) {
        super(config);
    }

    async submit(key: string, data: Record<string, any>) {
        return this.post(`/forms/${key}/submit`, { data });
    }
}
