// main.js
const { launchBrowser } = require("./browser");
const { scrapeNovelDetails, scrapeChapters } = require("./scraper");
const { 
  insertNovel, 
  insertChapters, 
  checkNovelExists,
  getLatestChapterNumber,
  closeDbConnection
} = require("./DatabaseOperations");

// Main execution function
async function main() {

    const urls = [
   "https://www.mvlempyr.com/novel/blessing-from-the-goddess-and-transfer-to-another-world-no-thanks-i-dont-need-a-special-ability",
          "https://www.mvlempyr.com/novel/blessing-of-yuri-goddess",
          "https://www.mvlempyr.com/novel/blood-assimilation",
          "https://www.mvlempyr.com/novel/blood-awakening-the-strongest-hybrid-and-his-vampire-bride",
          "https://www.mvlempyr.com/novel/blood-legacy-new-world-of-doom",
          "https://www.mvlempyr.com/novel/blood-titan-system",
          "https://www.mvlempyr.com/novel/blood-warlock-succubus-partner-in-the-apocalypse",
          "https://www.mvlempyr.com/novel/bloodline-evolution-system-reign-of-the-dragon-snake",
          "https://www.mvlempyr.com/novel/bloodline-of-gods-the-genius-at-olympus-academy",
          "https://www.mvlempyr.com/novel/bloodlines-online",
          "https://www.mvlempyr.com/novel/blue-star-enterprises",
          "https://www.mvlempyr.com/novel/boku-wa-isekai-de-fuyo-mahou-to-shoukan-mahou-wo-tenbin-ni-kakeru-wn",
          "https://www.mvlempyr.com/novel/bombarding-cultivators-with-cluster-artillery",
          "https://www.mvlempyr.com/novel/bone-painting-coroner",
          "https://www.mvlempyr.com/novel/born-as-the-daughter-of-the-wicked-woman",
          "https://www.mvlempyr.com/novel/born-to-be-rebellious-quick-transmigration",
          "https://www.mvlempyr.com/novel/boyfriends-always-turned-out-to-be-a-horror-movie-boss",
          "https://www.mvlempyr.com/novel/brand-new-life-online-rise-of-the-goddess-of-harvest",
          "https://www.mvlempyr.com/novel/brave-soul-of-evil-supremacy",
          "https://www.mvlempyr.com/novel/breakers",
          "https://www.mvlempyr.com/novel/breaking-free-loving-again--the-flash-marriage-with-mr-ceo",
          "https://www.mvlempyr.com/novel/breakthrough-with-the-forbidden-master",
          "https://www.mvlempyr.com/novel/bringing-the-farm-to-live-in-another-world",
          "https://www.mvlempyr.com/novel/bro-im-not-an-undead",
          "https://www.mvlempyr.com/novel/brothel-manager-unexpected-encounter-with-a-hidden-family-heirloom",
          "https://www.mvlempyr.com/novel/building-a-business-empire-from-scratch-in-another-world",
          "https://www.mvlempyr.com/novel/building-a-business-empire-with-my-technological-system",
          "https://www.mvlempyr.com/novel/building-a-conglomerate-in-another-world",
          "https://www.mvlempyr.com/novel/building-a-kingdom-and-conquering-the-world",
          "https://www.mvlempyr.com/novel/building-a-modern-nation-in-a-fantasy-world",
          "https://www.mvlempyr.com/novel/building-an-empire-which-the-sun-never-set",
          "https://www.mvlempyr.com/novel/building-the-strongest-undead-empire-from-scratch",
          "https://www.mvlempyr.com/novel/but-for-a-slime",
      "https://www.mvlempyr.com/novel/x-dragon-era",
          "https://www.mvlempyr.com/novel/x-gene-omnitrix",
          "https://www.mvlempyr.com/novel/x-ray-is-more-than-i-thought",
          "https://www.mvlempyr.com/novel/xian-wang-dotes-on-wife",
          "https://www.mvlempyr.com/novel/yellow-court-daoist",
        "https://www.mvlempyr.com/novel/you-are-all-bad-women-dont-come-over",
        "https://www.mvlempyr.com/novel/you-dont-want-your-secret-to-be-revealed-by-others-right",
        "https://www.mvlempyr.com/novel/you-were-supposed-to-hoard-supplies-why-the-heck-did-you-hoard-zombies",
        "https://www.mvlempyr.com/novel/you-will-only-be-mine",
        "https://www.mvlempyr.com/novel/youjo-senki",
        "https://www.mvlempyr.com/novel/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e",
        "https://www.mvlempyr.com/novel/young-brother-in-law-is-now-my-husband",
        "https://www.mvlempyr.com/novel/young-master-damiens-pet",
        "https://www.mvlempyr.com/novel/young-masters-pov-woke-up-as-a-villain-in-a-game-one-day",
        "https://www.mvlempyr.com/novel/your-majesty-i-want-you",
        "https://www.mvlempyr.com/novel/your-majesty-is-annoying",
        "https://www.mvlempyr.com/novel/your-majesty-please-calm-down",
        "https://www.mvlempyr.com/novel/youre-beautiful-when-you-smile",
        "https://www.mvlempyr.com/novel/youve-got-the-wrong-house-villain",
        "https://www.mvlempyr.com/novel/yuusha-yori-saikyouna-kuro-kishi",
          "https://www.mvlempyr.com/novel/jackal-among-snakes",
          "https://www.mvlempyr.com/novel/journey-of-the-fate-destroying-emperor",
          "https://www.mvlempyr.com/novel/journey-to-become-a-true-god",
          "https://www.mvlempyr.com/novel/journey-to-the-west-break-the-entire-western-heaven",
          "https://www.mvlempyr.com/novel/journey-to-the-west-tang-monk-conquers-everything",
          "https://www.mvlempyr.com/novel/journey-to-the-west-treasure-vase-of-the-great-dao",
          "https://www.mvlempyr.com/novel/jujutsushi-wa-yuusha-ni-narenai",
          "https://www.mvlempyr.com/novel/just-blame-me-for-being-blind-in-the-beginning",
          "https://www.mvlempyr.com/novel/just-call-me-thor",


      ];

    const browser = await launchBrowser();

    try {
        for (let url of urls) {
            console.log(`Scraping novel from URL: ${url}`);
            const page = await browser.newPage();

            try {
                // Set up the page
                await page.setUserAgent(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                );
                await page.goto(url, { waitUntil: "networkidle2" });

                // // Scrape novel details
                // const novelData = await scrapeNovelDetails(page);
                // console.log("Novel information:", novelData);

                // if (!novelData.title || !novelData.author) {
                //     console.log("Missing essential novel data (title or author). Exiting.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Store novel in database or get existing ID
                // const novelId = await insertNovel({
                //     title: novelData.title,
                //     author: novelData.author,
                //     description: novelData.synopsis,
                //     cover_image_url: novelData.imageLink,
                //     tags: novelData.tags,
                //     genres: novelData.genres,
                //     status: novelData.status,
                // });

                // if (!novelId) {
                //     console.log("Failed to process novel data. Skipping.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Get latest chapter from DB to determine how many chapters to scrape
                // const latestChapterNumber = await getLatestChapterNumber(novelId);
                // console.log(`Current chapters in database: ${latestChapterNumber}`);
                // console.log(`Total chapters on site: ${novelData.numOfCh}`);

                // if (latestChapterNumber >= novelData.numOfCh) {
                //     console.log("Novel is already up to date. No new chapters to scrape.");
                //     continue;  // Skip this novel and move to the next one
                // }

                // // Calculate how many new chapters to scrape
                // const chaptersToScrape = novelData.numOfCh - latestChapterNumber;
                // console.log(`Need to scrape ${chaptersToScrape} new chapters.`);

                // // Scrape chapters (only the new ones)
                // const scrapedChapters = await scrapeChapters(page, novelData.numOfCh, latestChapterNumber);
                // console.log(`Total new chapters scraped: ${scrapedChapters.length}`);

                // Scrape novel details
        const novelData = await scrapeNovelDetails(page);
        console.log("Novel information:", novelData);

        if (!novelData.title || !novelData.author) {
            console.log("Missing essential novel data (title or author). Exiting.");
            continue;  // Skip this novel and move to the next one
        }

        // Store novel in database or get existing ID
        const novelId = await insertNovel({
            title: novelData.title,
            author: novelData.author,
            description: novelData.synopsis,
            cover_image_url: novelData.imageLink,
            tags: novelData.tags,
            genres: novelData.genres,
            status: novelData.status,
        });

        if (!novelId) {
            console.log("Failed to process novel data. Skipping.");
            continue;  // Skip this novel and move to the next one
        }

        // Get latest chapter from DB to determine how many chapters to scrape
        const latestChapterNumber = await getLatestChapterNumber(novelId);
        
        // Use the most reliable chapter count - prefer numOfCh but fall back to chapters
        // if numOfCh is zero
        const totalChapters = novelData.numOfCh || parseInt(novelData.chapters) || 0;
        
        console.log(`Current chapters in database: ${latestChapterNumber}`);
        console.log(`Total chapters on site: ${totalChapters}`);

        if (latestChapterNumber >= totalChapters || totalChapters === 0) {
            console.log("Novel is already up to date or no chapters found. Skipping.");
            continue;  // Skip this novel and move to the next one
        }

        // Calculate how many new chapters to scrape
        const chaptersToScrape = totalChapters - latestChapterNumber;
        console.log(`Need to scrape ${chaptersToScrape} new chapters.`);

        // Scrape chapters (only the new ones)
        const scrapedChapters = await scrapeChapters(page, totalChapters, latestChapterNumber);
        console.log(`Total new chapters scraped: ${scrapedChapters.length}`);

                // Store new chapters in database
                if (scrapedChapters.length > 0) {
                    const newChaptersCount = await insertChapters(novelId, scrapedChapters);
                    console.log(`${newChaptersCount} new chapters stored in database with Novel ID: ${novelId}`);
                } else {
                    console.log("No new chapters to store.");
                }

            } catch (error) {
                console.error(`Error during scraping URL: ${url}`, error);
            } finally {
                // Close the page after scraping
                await page.close();
            }
        }

    } catch (error) {
        console.error("Error during scraping process:", error);
    } finally {
        // Close browser when done
        await browser.close();
        // Close database connection
        await closeDbConnection();
        console.log("Scraping process completed");
    }
}

// Execute the main function
main().catch(console.error);
