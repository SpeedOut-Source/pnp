import { getData } from "../utils/utils";


export async function PrivacyServer() {
    const data = (await getData('privacy-policy.md')).toString();
    return {
        props: {
            data,
        }
    };
}