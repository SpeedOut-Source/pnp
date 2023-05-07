import * as dotenv from 'dotenv'
import algoliasearch from "algoliasearch";
import { addBlur, getApps, getBlogs, getCompany, getProjects, getTesti } from "~/app_function/utils/utils-server";
import { type App, type Blog, type CardData, type Company, type Project } from "~/app_function/utils/interfaces";
import { type Testimonial } from "~/components/work_for_t/testi_card";
import { isTestis } from "~/app_function/utils/utils";
import {
  ALGOLIA_INDEX_APPS,
  ALGOLIA_INDEX_BLOGS,
  ALGOLIA_INDEX_COMPANY,
  ALGOLIA_INDEX_PROJECTS, ALGOLIA_INDEX_TESTIMONIALS
} from "~/app_function/utils/constants";

try {
  console.log("Sending recards to Algolia server");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  dotenv.config({path: '.env.production'});

  if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
    throw new Error("NEXT_PUBLIC_ALGOLIA_APP_ID is not defined");
  }

  if (!process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY) {
    throw new Error("NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY is not defined");
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}


function transformRawToSearchObjects(data: CardData | Testimonial[]) {
  return data.map(x => {
    return {
      objectID: isTestis(x) ? x.imgUrl : x.fileName,
      ...x
    };
  });
}


void (async function() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  dotenv.config({path:'.env.production'});

  try {
    console.log("Getting data");
    const testis = await getTesti();
    console.log("testis");
    const allProsRaw = await getProjects();
    console.log("allProsRaw");
    const allAppsRaw = await getApps();
    console.log("allAppsRaw");
    const allBlogsRaw = await getBlogs();
    console.log("allBlogsRaw");
    const allCompanyRaw = await getCompany();
    console.log("allCompanyRaw");
    console.log("Data imported successfully");


    console.log("Adding blurdata data");
    const RPros: Project[] = await addBlur(allProsRaw.projects, allProsRaw.projects.length);
    console.log("RPros");
    const RApps: App[] = await addBlur(allAppsRaw.apps, allAppsRaw.apps.length);
    console.log("RApps");
    const RBlogs: Blog[] = await addBlur(allBlogsRaw.blogs, allBlogsRaw.blogs.length);
    console.log("RBlogs");
    const RCompany: Company[] = await addBlur(allCompanyRaw.company, allCompanyRaw.company.length);
    console.log("RCompany");
    console.log("Blur Data added successfully");
    const RTestis: Testimonial[] = testis.testis;

    console.log("Transforming data to search object");
    const TPros = transformRawToSearchObjects(RPros);
    console.log("TPros");
    const TApps = transformRawToSearchObjects(RApps);
    console.log("TApps");
    const TBlogs = transformRawToSearchObjects(RBlogs);
    console.log("TBlogs");
    const TCompany = transformRawToSearchObjects(RCompany);
    console.log("TCompany");
    const TTestis = transformRawToSearchObjects(RTestis);
    console.log("TTestis");
    console.log("Transformed data to search object successfully");

    const client = algoliasearch(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY!
    );

    console.log("Init index algolia");
    const IPros = client.initIndex(ALGOLIA_INDEX_PROJECTS);
    console.log("IPros");
    const IApps = client.initIndex(ALGOLIA_INDEX_APPS);
    console.log("IApps");
    const IBlogs = client.initIndex(ALGOLIA_INDEX_BLOGS);
    console.log("IBlogs");
    const ICompany = client.initIndex(ALGOLIA_INDEX_COMPANY);
    console.log("ICompany");
    const ITestis = client.initIndex(ALGOLIA_INDEX_TESTIMONIALS);
    console.log("ITestis");
    console.log("Init index algolia successfully");

    console.log("Send recards to Algolia server");
    const ResPros = await IPros.saveObjects(TPros);
    console.log(`🎉 Successfully added ${ALGOLIA_INDEX_PROJECTS} ${ResPros.objectIDs.length} records to Algolia search.`);
    const ResApps = await IApps.saveObjects(TApps);
    console.log(`🎉 Successfully added ${ALGOLIA_INDEX_APPS} ${ResApps.objectIDs.length} records to Algolia search.`);
    const ResBlogs = await IBlogs.saveObjects(TBlogs);
    console.log(`🎉 Successfully added ${ALGOLIA_INDEX_BLOGS} ${ResBlogs.objectIDs.length} records to Algolia search.`);
    const ResCompany = await ICompany.saveObjects(TCompany);
    console.log(`🎉 Successfully added ${ALGOLIA_INDEX_COMPANY} ${ResCompany.objectIDs.length} records to Algolia search.`);
    const ResTestis = await ITestis.saveObjects(TTestis);
    console.log(`🎉 Successfully added ${ALGOLIA_INDEX_TESTIMONIALS} ${ResTestis.objectIDs.length} records to Algolia search.`);
    console.log("Sended recards to Algolia server successfully");
  } catch (err) {
    console.error(err);
  }
})();