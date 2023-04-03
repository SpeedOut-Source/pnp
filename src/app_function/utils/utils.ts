import { promises } from "fs";

export async function getData(path: string) {
    const data = await promises.readFile(`../portfolio_data/${path}`, "utf8");
    return Buffer.from(data);
}