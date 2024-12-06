import * as dotenv from "dotenv";
import { algoliasearch } from "algoliasearch";
import {
  type App,
  type Blog,
  type CardData,
  type Company,
  type Project,
} from "~/app_function/utils/interfaces";
import { type Testimonial } from "~/components/work_for_t/testi_card";
import {
  ALGOLIA_INDEX_APPS,
  ALGOLIA_INDEX_BLOGS,
  ALGOLIA_INDEX_COMPANY,
  ALGOLIA_INDEX_PROJECTS,
  ALGOLIA_INDEX_TESTIMONIALS,
  MAIN_ENV_PATH,
} from "~/app_function/utils/constants";

const isTestimonial = (item: unknown): item is Testimonial =>
  typeof item === "object" && item !== null && "position" in item;

function transformRawToSearchObjects(data: CardData | Testimonial[]) {
  return data.map((x) => {
    return {
      objectID: isTestimonial(x) ? x.imgUrl : x.fileName,
      ...x,
    };
  });
}

const updateAlgoliaIndex = async (
  client: ReturnType<typeof algoliasearch>,
  indexName: string,
  objects: Record<string, unknown>[],
) => {
  const results = await client.partialUpdateObjects({
    indexName,
    objects,
    createIfNotExists: true,
  });

  results.forEach((res) =>
    console.log(
      `🎉 Added ${res.objectIDs.length} records to ${indexName} index (taskID: ${res.taskID}).`,
    ),
  );
};

async function main() {
  dotenv.config({ path: MAIN_ENV_PATH });
  const env = (await import("../../env.mjs")).env;
  const utils = await import("~/app_function/utils/utils-server");

  try {
    console.log("📥 Getting data");
    const testis = await utils.getTesti();
    console.log("✅ Testimonials fetched");
    const allProsRaw = await utils.getProjects();
    console.log("✅ Projects fetched");
    const allAppsRaw = await utils.getApps();
    console.log("✅ Apps fetched");
    const allBlogsRaw = await utils.getBlogs();
    console.log("✅ Blogs fetched");
    const allCompanyRaw = await utils.getCompany();
    console.log("✅ Company fetched");
    console.log("✅ Data imported successfully");

    console.log("🔵 Adding blur data");
    const RPros: Project[] = await utils.addBlur(
      allProsRaw.projects,
      allProsRaw.projects.length,
    );
    console.log("✅ Projects blur data added");
    const RApps: App[] = await utils.addBlur(
      allAppsRaw.apps,
      allAppsRaw.apps.length,
    );
    console.log("✅ Apps blur data added");
    const RBlogs: Blog[] = await utils.addBlur(
      allBlogsRaw.blogs,
      allBlogsRaw.blogs.length,
    );
    console.log("✅ Blogs blur data added");
    const RCompany: Company[] = await utils.addBlur(
      allCompanyRaw.company,
      allCompanyRaw.company.length,
    );
    console.log("✅ Company blur data added");
    const RTestis: Testimonial[] = await utils.addBlur(
      testis.testis,
      testis.testis.length,
    );
    console.log("✅ Testimonial blur data added");
    console.log("✅ Blur data added successfully");

    console.log("🔄 Transforming data to search objects");
    const TPros = transformRawToSearchObjects(RPros);
    console.log("✅ Projects transformed to search objects");
    const TApps = transformRawToSearchObjects(RApps);
    console.log("✅ Apps transformed to search objects");
    const TBlogs = transformRawToSearchObjects(RBlogs);
    console.log("✅ Blogs transformed to search objects");
    const TCompany = transformRawToSearchObjects(RCompany);
    console.log("✅ Company transformed to search objects");
    const TTestis = transformRawToSearchObjects(RTestis);
    console.log("✅ Testimonials transformed to search objects");
    console.log("✅ Data transformed successfully");

    const client = algoliasearch(
      env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      env.ALGOLIA_SEARCH_ADMIN_KEY,
    );

    console.log("⬆️ Sending records to Algolia server");

    await updateAlgoliaIndex(client, ALGOLIA_INDEX_PROJECTS, TPros);
    await updateAlgoliaIndex(client, ALGOLIA_INDEX_APPS, TApps);
    await updateAlgoliaIndex(client, ALGOLIA_INDEX_BLOGS, TBlogs);
    await updateAlgoliaIndex(client, ALGOLIA_INDEX_COMPANY, TCompany);
    await updateAlgoliaIndex(client, ALGOLIA_INDEX_TESTIMONIALS, TTestis);

    console.log("🚀 Records sent to Algolia server successfully");
  } catch (err) {
    console.error(err);
  }
}

main().catch(console.error);
