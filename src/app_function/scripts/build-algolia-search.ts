import * as dotenv from "dotenv";
import algoliasearch from "algoliasearch";
import {
  type App,
  type Blog,
  type CardData,
  type Company,
  type Project,
} from "~/app_function/utils/interfaces";
import { type Testimonial } from "~/components/work_for_t/testi_card";
import { isTestis } from "~/app_function/utils/utils";
import {
  ALGOLIA_INDEX_APPS,
  ALGOLIA_INDEX_BLOGS,
  ALGOLIA_INDEX_COMPANY,
  ALGOLIA_INDEX_PROJECTS,
  ALGOLIA_INDEX_TESTIMONIALS,
  MAIN_ENV_PATH,
} from "~/app_function/utils/constants";

function transformRawToSearchObjects(data: CardData | Testimonial[]) {
  return data.map((x) => {
    return {
      objectID: isTestis(x) ? x.imgUrl : x.fileName,
      ...x,
    };
  });
}

void (async function () {
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
      allProsRaw.projects.length
    );
    console.log("✅ Projects blur data added");
    const RApps: App[] = await utils.addBlur(
      allAppsRaw.apps,
      allAppsRaw.apps.length
    );
    console.log("✅ Apps blur data added");
    const RBlogs: Blog[] = await utils.addBlur(
      allBlogsRaw.blogs,
      allBlogsRaw.blogs.length
    );
    console.log("✅ Blogs blur data added");
    const RCompany: Company[] = await utils.addBlur(
      allCompanyRaw.company,
      allCompanyRaw.company.length
    );
    console.log("✅ Company blur data added");
    const RTestis: Testimonial[] = await utils.addBlur(
      testis.testis,
      testis.testis.length
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
      env.ALGOLIA_SEARCH_ADMIN_KEY
    );

    console.log("🔍 Initializing Algolia indexes");
    const IPros = client.initIndex(ALGOLIA_INDEX_PROJECTS);
    console.log("✅ Projects index initialized");
    const IApps = client.initIndex(ALGOLIA_INDEX_APPS);
    console.log("✅ Apps index initialized");
    const IBlogs = client.initIndex(ALGOLIA_INDEX_BLOGS);
    console.log("✅ Blogs index initialized");
    const ICompany = client.initIndex(ALGOLIA_INDEX_COMPANY);
    console.log("✅ Company index initialized");
    const ITestis = client.initIndex(ALGOLIA_INDEX_TESTIMONIALS);
    console.log("✅ Testimonials index initialized");
    console.log("✅ Indexes initialized successfully");

    console.log("⬆️ Sending records to Algolia server");
    const ResPros = await IPros.saveObjects(TPros);
    console.log(
      `🎉 Successfully added ${ResPros.objectIDs.length} records to ${ALGOLIA_INDEX_PROJECTS} index in Algolia search.`
    );
    const ResApps = await IApps.saveObjects(TApps);
    console.log(
      `🎉 Successfully added ${ResApps.objectIDs.length} records to ${ALGOLIA_INDEX_APPS} index in Algolia search.`
    );
    const ResBlogs = await IBlogs.saveObjects(TBlogs);
    console.log(
      `🎉 Successfully added ${ResBlogs.objectIDs.length} records to ${ALGOLIA_INDEX_BLOGS} index in Algolia search.`
    );
    const ResCompany = await ICompany.saveObjects(TCompany);
    console.log(
      `🎉 Successfully added ${ResCompany.objectIDs.length} records to ${ALGOLIA_INDEX_COMPANY} index in Algolia search.`
    );
    const ResTestis = await ITestis.saveObjects(TTestis);
    console.log(
      `🎉 Successfully added ${ResTestis.objectIDs.length} records to ${ALGOLIA_INDEX_TESTIMONIALS} index in Algolia search.`
    );
    console.log("🚀 Records sent to Algolia server successfully");
  } catch (err) {
    console.error(err);
  }
})();
