import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const articles = [
  {
    title: "Governor of Enugu State Unveils ₦50 Billion Infrastructure Plan",
    slug: "governor-enugu-50-billion-infrastructure-plan",
    content: "The Governor of Enugu State, Peter Mbah, has unveiled an ambitious ₦50 billion infrastructure development plan aimed at transforming the state's road network, healthcare facilities, and educational institutions over the next three years. The plan, announced at the Government House in Enugu, includes the construction of 200 kilometers of new roads, rehabilitation of 15 general hospitals, and the establishment of five new technical colleges across the state. Speaking at the event, Governor Mbah said the investment would create over 50,000 direct and indirect jobs for Enugu residents. The plan will be funded through a combination of state revenues, federal allocations, and strategic partnerships with private investors.",
    excerpt: "Governor Peter Mbah announces a massive ₦50 billion plan to upgrade roads, hospitals, and schools across Enugu State.",
    category: "Politics",
    author: "Chukwuemeka Eze",
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    status: "published",
    isFeatured: true,
    isBreaking: false,
    views: 4821,
    readTime: 4,
  },
  {
    title: "Breaking: Gunmen Attack Military Convoy in Enugu Highway",
    slug: "gunmen-attack-military-convoy-enugu-highway",
    content: "Armed gunmen on Monday ambushed a military convoy along the Enugu-Port Harcourt expressway, resulting in a fierce gun battle that lasted over two hours. According to eyewitness accounts, the attackers, numbering about 30, opened fire on the convoy near the Oji River junction. The Nigerian Army confirmed the incident, stating that troops repelled the attack, killing six of the assailants and recovering several weapons. Two soldiers sustained minor injuries and have been taken to the 82 Division Military Hospital for treatment. The highway was temporarily closed to traffic but has since reopened. Security operatives have launched a manhunt for the fleeing suspects.",
    excerpt: "Armed men ambushed a military convoy on the Enugu-Port Harcourt expressway. Troops repelled the attack.",
    category: "Breaking News",
    author: "Ngozi Okafor",
    imageUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800",
    status: "published",
    isFeatured: false,
    isBreaking: true,
    views: 9342,
    readTime: 3,
  },
  {
    title: "Super Eagles Defeat Ghana 3-1 in AFCON Qualifier at Enugu Stadium",
    slug: "super-eagles-defeat-ghana-3-1-afcon-qualifier",
    content: "Nigeria's Super Eagles produced a commanding performance at the Nnamdi Azikiwe Stadium in Enugu, defeating arch-rivals Ghana 3-1 in an Africa Cup of Nations qualifying match. Goals from Victor Osimhen (two) and Samuel Chukwueze sealed the victory, with Jordan Ayew pulling one back for the Black Stars in the 78th minute. The win puts Nigeria at the top of Group B with maximum points from two games. Coach Jose Peseiro praised the team's intensity and tactical discipline, singling out goalkeeper Stanley Nwabali for his crucial saves in the first half. The atmosphere at the stadium was electric, with over 45,000 fans turning out to cheer the Eagles.",
    excerpt: "Victor Osimhen scored twice as the Super Eagles thrashed Ghana 3-1 in an AFCON qualifier in Enugu.",
    category: "Sports",
    author: "Taiwo Adeyemi",
    imageUrl: "https://images.unsplash.com/photo-1551958219-acbc630e2914?w=800",
    status: "published",
    isFeatured: true,
    isBreaking: false,
    views: 7654,
    readTime: 3,
  },
  {
    title: "Nollywood Star Patience Ozokwo Bags Lifetime Achievement Award",
    slug: "patience-ozokwo-lifetime-achievement-award",
    content: "Veteran Nollywood actress Patience Ozokwo, popularly known as 'Mama G', has been honoured with a Lifetime Achievement Award at the Africa Movie Academy Awards held in Lagos. The award recognises her over 30-year contribution to the Nigerian film industry, during which she has starred in more than 300 movies. Ozokwo, who hails from Enugu State, received a standing ovation from the star-studded audience. In her acceptance speech, she encouraged young actors to remain dedicated and to tell authentic African stories. The actress also announced she is working on a new film set entirely in Enugu, expected to premiere next year.",
    excerpt: "Enugu-born screen legend Patience Ozokwo receives a Lifetime Achievement Award at the Africa Movie Academy Awards.",
    category: "Entertainment",
    author: "Adaeze Nwosu",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    status: "published",
    isFeatured: false,
    isBreaking: false,
    views: 5123,
    readTime: 3,
  },
  {
    title: "Coal City Startup Raises ₦2 Billion to Expand Solar Energy Access in Rural Enugu",
    slug: "coal-city-startup-raises-2-billion-solar-energy",
    content: "SolarEast Nigeria, a clean energy startup based in Enugu, has raised ₦2 billion in Series A funding to expand its pay-as-you-go solar power service to 50 more rural communities across Enugu State. The funding round was led by a consortium of Nigerian and South African impact investors. Currently serving 15 communities with affordable solar electricity, SolarEast plans to triple its footprint by the end of next year, potentially providing clean energy to over 200,000 people. The CEO, Emeka Onuoha, said the investment reflects growing confidence in Enugu's tech and green energy ecosystem. The state government has pledged to support the expansion through land allocation and regulatory facilitation.",
    excerpt: "Enugu startup SolarEast raises ₦2 billion to expand pay-as-you-go solar power to 50 more rural communities.",
    category: "Business",
    author: "Kelechi Ugwu",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    status: "published",
    isFeatured: true,
    isBreaking: false,
    views: 3287,
    readTime: 4,
  },
  {
    title: "Enugu State Announces Free School Meals for 500,000 Primary School Pupils",
    slug: "enugu-free-school-meals-500000-primary-pupils",
    content: "The Enugu State Government has launched a free school feeding programme that will provide daily meals to over 500,000 primary school pupils across the state. The programme, part of the Governor's social investment agenda, will initially cover all 450 public primary schools in the state capital and surrounding local government areas before expanding statewide. Meals will be prepared by local women cooperatives, ensuring the programme also creates income for thousands of families. The Commissioner for Education, Dr. Chioma Ifeanyi, said the initiative is expected to boost school enrolment by at least 20 percent, as hunger has been identified as a key reason for school dropout in rural areas.",
    excerpt: "Enugu launches a free school meals programme for 500,000 pupils, prepared by local women's cooperatives.",
    category: "Politics",
    author: "Chukwuemeka Eze",
    imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800",
    status: "published",
    isFeatured: false,
    isBreaking: false,
    views: 2941,
    readTime: 3,
  },
  {
    title: "Arsenal Sign Nigerian Forward for Club-Record £90 Million Fee",
    slug: "arsenal-sign-nigerian-forward-90-million",
    content: "Arsenal Football Club has completed the signing of Nigerian international striker Emeka Obi from Serie A side AC Milan for a club-record fee of £90 million. The 23-year-old forward, who scored 28 goals in all competitions last season, has signed a five-year contract at the Emirates Stadium. Obi, who hails from Aba in Abia State, becomes the most expensive Nigerian player in football history. Manager Mikel Arteta described the signing as a 'statement of intent', saying Obi's pace, technique, and eye for goal will add a new dimension to Arsenal's attack. The Super Eagles striker is expected to make his debut in the Premier League next weekend.",
    excerpt: "Nigerian striker Emeka Obi joins Arsenal for a club-record £90 million, becoming the most expensive Nigerian in football history.",
    category: "Sports",
    author: "Taiwo Adeyemi",
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
    status: "published",
    isFeatured: false,
    isBreaking: true,
    views: 11200,
    readTime: 3,
  },
  {
    title: "Nigeria Launches First Locally-Assembled Electric Vehicle in Enugu",
    slug: "nigeria-first-locally-assembled-electric-vehicle-enugu",
    content: "Nigeria took a historic step towards automotive independence as the first locally-assembled electric vehicle rolled off the production line at the new EV manufacturing plant in the Emene Industrial Layout, Enugu. The vehicle, named 'Nnaji One', was assembled by engineers from the University of Nigeria Nsukka in partnership with a Chinese technology firm. It boasts a range of 300 kilometres on a single charge and a top speed of 120km/h. President Bola Tinubu, who attended the unveiling ceremony virtually, described it as a watershed moment for Nigerian engineering. The plant is expected to produce 500 vehicles monthly once at full capacity, with plans to export to other West African nations.",
    excerpt: "Nigeria's first locally-assembled EV, the 'Nnaji One', launched at Enugu's Emene Industrial Layout.",
    category: "Technology",
    author: "Ifunanya Obi",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800",
    status: "published",
    isFeatured: false,
    isBreaking: false,
    views: 6780,
    readTime: 4,
  },
  {
    title: "UN Security Council Condemns Escalating Violence in Sudan",
    slug: "un-security-council-condemns-sudan-violence",
    content: "The United Nations Security Council has unanimously passed a resolution condemning the escalating violence in Sudan and calling for an immediate ceasefire between the Sudanese Armed Forces and the Rapid Support Forces. The resolution demands unhindered humanitarian access to all affected regions and calls on all parties to protect civilians and critical infrastructure. Nigeria, currently serving as a non-permanent member of the Security Council, co-sponsored the resolution and played a key role in building consensus among member states. Foreign Affairs Minister Yusuf Tuggar said Nigeria remains committed to peace and stability in Africa. The conflict has displaced over 8 million people since it began in April 2023.",
    excerpt: "The UN Security Council unanimously condemns Sudan's ongoing conflict, with Nigeria playing a key diplomatic role.",
    category: "World",
    author: "Blessing Okonkwo",
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    status: "published",
    isFeatured: false,
    isBreaking: false,
    views: 4102,
    readTime: 4,
  },
  {
    title: "Burna Boy Announces Massive Enugu Concert for December",
    slug: "burna-boy-enugu-concert-december",
    content: "Grammy Award-winning Afrobeats superstar Burna Boy has announced a massive homecoming concert in Enugu this December, set to take place at the expanded Nnamdi Azikiwe Stadium. The concert, titled 'Coal City Nights', will feature surprise guest performers and is expected to draw over 60,000 fans. Tickets go on sale next week, with prices ranging from ₦20,000 to ₦500,000 for VIP packages. Burna Boy, whose mother hails from Enugu State, expressed deep affection for the city, saying he considers Enugu his 'spiritual home in the East'. The event is being co-organised by the Enugu State Tourism Board as part of efforts to position the city as a premier entertainment destination in Nigeria.",
    excerpt: "Burna Boy announces 'Coal City Nights', a massive Enugu concert this December at the Nnamdi Azikiwe Stadium.",
    category: "Entertainment",
    author: "Adaeze Nwosu",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    status: "published",
    isFeatured: false,
    isBreaking: false,
    views: 8934,
    readTime: 3,
  },
  {
    title: "CBN Raises Interest Rate to 27.5% to Combat Inflation",
    slug: "cbn-raises-interest-rate-27-5-percent",
    content: "The Central Bank of Nigeria's Monetary Policy Committee has raised the benchmark interest rate by 150 basis points to 27.5 percent, its highest level in over two decades, as the apex bank intensifies efforts to bring inflation under control. The CBN Governor, Olayemi Cardoso, said the decision was unanimous and reflects the committee's determination to restore price stability. Nigeria's headline inflation has been running above 30 percent for several months, driven by food prices and the depreciation of the naira. Economists are divided on the move, with some arguing it will choke growth while others believe it is necessary to restore investor confidence and stabilise the currency.",
    excerpt: "The CBN raises interest rates to 27.5%, the highest in decades, as it battles Nigeria's persistent inflation.",
    category: "Business",
    author: "Kelechi Ugwu",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    status: "published",
    isFeatured: false,
    isBreaking: false,
    views: 5567,
    readTime: 4,
  },
  {
    title: "UNN Ranks Among Top 10 Universities in Africa for Research Output",
    slug: "unn-top-10-universities-africa-research",
    content: "The University of Nigeria Nsukka has been ranked among the top 10 universities in Africa for research output by the latest edition of the African University Rankings. The institution, which celebrated its 64th anniversary this year, has seen a significant increase in publications in high-impact international journals, particularly in the fields of agriculture, engineering, and medical sciences. The Vice-Chancellor, Prof. Charles Igwe, attributed the achievement to the university's increased investment in research grants and collaborations with foreign institutions. UNN currently has active research partnerships with universities in the UK, Germany, and the United States. The ranking has been welcomed by alumni worldwide as a validation of the institution's academic heritage.",
    excerpt: "UNN breaks into Africa's top 10 universities for research output, driven by international collaborations and increased funding.",
    category: "Technology",
    author: "Ifunanya Obi",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    status: "published",
    isFeatured: false,
    isBreaking: false,
    views: 3891,
    readTime: 4,
  },
];

async function seed() {
  console.log("Seeding Neon database...");
  
  // Insert articles one by one to handle conflicts
  for (const article of articles) {
    try {
      await pool.query(
        `INSERT INTO articles (title, slug, content, excerpt, category, author, image_url, status, is_featured, is_breaking, views, read_time, published_at, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW(),NOW())
         ON CONFLICT (slug) DO NOTHING`,
        [
          article.title, article.slug, article.content, article.excerpt,
          article.category, article.author, article.imageUrl, article.status,
          article.isFeatured, article.isBreaking, article.views, article.readTime
        ]
      );
      console.log(`✓ ${article.title.slice(0, 50)}...`);
    } catch (e) {
      console.error(`✗ Failed: ${article.slug} — ${e.message}`);
    }
  }
  
  console.log("\nDone! All articles seeded.");
  await pool.end();
}

seed().catch(console.error);
