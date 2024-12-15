import { env } from "~/env.mjs";
import { generateMetadataSEO } from "~/app_function/seo/seo";
import { getTags } from "~/app_function/utils/utils-server";
import RXT from "~/components/me_section/r_x_t";

export const generateMetadata = async () => {
  return generateMetadataSEO({
    description: `All Tags | ${env.NEXT_PUBLIC_PERSON_NAME}`,
    title: `All Tags | ${env.NEXT_PUBLIC_PERSON_NAME}`,
  });
};

export default async function Privacy() {
  const { tags } = await getTags();
  return (
    <>
      <section className="mx-auto space-y-2 px-2 pt-2 xl:container xl:mt-5">
        <RXT
          tags={tags}
          className="xl:max-w-full"
          title={`All Expertise in Technology Tags (${tags.length})`}
          classNameMenubar="justify-normal"
        />
      </section>
    </>
  );
}
