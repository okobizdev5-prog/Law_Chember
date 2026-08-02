const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
} = require("mongodb");

const multer = require("multer");

const cloudinary = require("./config/cloudinary");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Lawyer Chamber Server Running...");
});

// MongoDB URI
const uri = process.env.MONGODB_URI;

// MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ==========================
// Cloudinary Storage
// ==========================

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lawyer-chamber",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({
  storage,
});

async function run() {
  try {
    await client.connect();

    console.log("✅ MongoDB Connected");

    // Database
    const db = client.db("lawyer-chamber");

    // Collections
    const categoryCollection = db.collection("categories");
    const subCategoryCollection = db.collection("subCategories");
    const serviceCollection = db.collection("services");
    const bannerCollection = db.collection("banners");
    const settingsCollection = db.collection("settings");
    const galleryCollection = db.collection("gallery");
    const blogCollection = db.collection("blogs");
    const inquiryCollection = db.collection("inquiries");

    // ==========================
    // Default Categories
    // ==========================

    const defaultCategories = [
      {
        slug: "civil-litigation",
        name: "Civil Litigation",
        title: "Civil Litigation",
        shortDesc: "Property disputes, contractual matters, and civil suits.",
        description: "Comprehensive representation in civil matters including property disputes, contractual conflicts, recovery suits, injunction applications, and partition suits before competent courts.",
        services: ["Property Disputes", "Contractual Matters", "Recovery Suits", "Injunction Applications", "Partition Suits"],
        icon: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop"
      },
      {
        slug: "criminal-defense",
        name: "Criminal Defense",
        title: "Criminal Defense",
        shortDesc: "Expert representation in criminal cases at all levels.",
        description: "Experienced criminal defense counsel providing representation in bail matters, criminal appeals, trial proceedings, anticipatory bail, and quashing petitions.",
        services: ["Bail Applications", "Criminal Appeals", "Trial Defense", "Anticipatory Bail", "Quashing Petitions"],
        icon: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop"
      },
      {
        slug: "corporate-commercial-law",
        name: "Corporate & Commercial Law",
        title: "Corporate & Commercial Law",
        shortDesc: "Business formation, contracts, and compliance matters.",
        description: "Complete legal support for businesses including company formation, compliance, contracts, commercial disputes, and mergers.",
        services: ["Business Formation", "Contract Drafting", "Corporate Compliance", "Commercial Disputes", "Mergers & Acquisitions"],
        icon: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
      },
      {
        slug: "family-law",
        name: "Family Law",
        title: "Family Law",
        shortDesc: "Divorce, custody, maintenance, and inheritance matters.",
        description: "Sensitive handling of family disputes with a focus on amicable resolution while protecting your legal rights and interests.",
        services: ["Divorce Proceedings", "Child Custody", "Maintenance Matters", "Succession & Inheritance", "Matrimonial Disputes"],
        icon: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop"
      },
      {
        slug: "constitutional-law",
        name: "Constitutional Law",
        title: "Constitutional Law",
        shortDesc: "Protection of constitutional and fundamental rights.",
        description: "Professional assistance in writ petitions, constitutional remedies, judicial review, and public interest litigation.",
        services: ["Writ Petitions", "PIL", "Fundamental Rights", "Judicial Review", "Constitutional Remedies"],
        icon: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?q=80&w=1200&auto=format&fit=crop"
      },
      {
        slug: "consumer-protection",
        name: "Consumer Protection",
        title: "Consumer Protection",
        shortDesc: "Consumer disputes and compensation claims.",
        description: "Representation before consumer forums for defective products, service deficiencies, and compensation claims.",
        services: ["Consumer Complaints", "Product Liability", "Service Deficiency", "Compensation Claims", "Consumer Forums"],
        icon: "https://images.unsplash.com/photo-1607519391054-94c34a26e474?q=80&w=1200&auto=format&fit=crop"
      },
      {
        slug: "real-estate-law",
        name: "Real Estate Law",
        title: "Real Estate Law",
        shortDesc: "Property transactions, title verification, and litigation.",
        description: "Complete legal solutions for real estate transactions, property documentation, title verification, and real estate litigation.",
        services: ["Property Transactions", "Title Verification", "Real Estate Disputes", "Tenancy Matters", "Land Acquisition"],
        icon: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
      },
      {
        slug: "employment-labour-law",
        name: "Employment & Labour Law",
        title: "Employment & Labour Law",
        shortDesc: "Employment disputes, labour compliance, and contracts.",
        description: "Representation in employment disputes, wrongful termination, labour compliance, and industrial disputes before relevant authorities.",
        services: ["Service Matters", "Wrongful Termination", "Industrial Disputes", "Labour Compliance", "Employment Contracts"],
        icon: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"
      },
      {
        slug: "taxation-law",
        name: "Taxation Law",
        title: "Taxation Law",
        shortDesc: "Income tax, VAT, tax planning, and litigation.",
        description: "Professional assistance in income tax, VAT, tax planning, assessment proceedings, and tax litigation matters.",
        services: ["Income Tax Appeals", "VAT Matters", "Tax Planning", "Tax Litigation", "Assessment Proceedings"],
        icon: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop"
      },
      {
        slug: "drafting-documentation",
        name: "Drafting & Documentation",
        title: "Drafting & Documentation",
        shortDesc: "Contracts, agreements, affidavits, and legal notices.",
        description: "Preparation of contracts, agreements, affidavits, legal notices, petitions, and professional legal documentation.",
        services: ["Contract Drafting", "Legal Notices", "Affidavits", "Agreements", "Legal Opinions"],
        icon: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?q=80&w=1200&auto=format&fit=crop"
      }
    ];

    const categoryCount = await categoryCollection.countDocuments();
    const hasRichCategories = await categoryCollection.findOne({ shortDesc: { $exists: true } });
    const hasImageCategories = await categoryCollection.findOne({ icon: { $regex: /^http/ } });

    if (categoryCount === 0 || !hasRichCategories || !hasImageCategories) {
      await categoryCollection.deleteMany({});
      await categoryCollection.insertMany(defaultCategories);
      console.log("✅ Default Rich Categories Inserted (With Images)");
    }

    // ==========================
    // Default Sub Categories
    // ==========================

    const defaultSubCategories = [
      {
        categoryName: "Corporate Law",
        name: "Company Registration",
      },
      {
        categoryName: "Corporate Law",
        name: "Business Contracts",
      },
      {
        categoryName: "Corporate Law",
        name: "Legal Compliance",
      },

      {
        categoryName: "Family Law",
        name: "Divorce",
      },
      {
        categoryName: "Family Law",
        name: "Child Custody",
      },
      {
        categoryName: "Family Law",
        name: "Marriage Registration",
      },

      {
        categoryName: "Criminal Law",
        name: "Bail",
      },
      {
        categoryName: "Criminal Law",
        name: "Criminal Defense",
      },

      {
        categoryName: "Property Law",
        name: "Land Registration",
      },
      {
        categoryName: "Property Law",
        name: "Property Dispute",
      },

      {
        categoryName: "Immigration Law",
        name: "Visa Assistance",
      },
      {
        categoryName: "Immigration Law",
        name: "Work Permit",
      },

      {
        categoryName: "Tax Law",
        name: "Income Tax",
      },
      {
        categoryName: "Tax Law",
        name: "VAT Consultancy",
      },

      {
        categoryName: "Civil Litigation",
        name: "Civil Suit",
      },
      {
        categoryName: "Civil Litigation",
        name: "Arbitration",
      },

      {
        categoryName: "Employment Law",
        name: "Employment Contract",
      },
      {
        categoryName: "Employment Law",
        name: "Wrongful Termination",
      },
    ];

    const subCategoryCount =
      await subCategoryCollection.countDocuments();

    if (subCategoryCount === 0) {
      await subCategoryCollection.insertMany(defaultSubCategories);
      console.log("✅ Default Sub Categories Inserted");
    }

    // ==========================
    // Default Banners
    // ==========================
    const defaultBanners = [
      {
        image: "/assets/BImg1.jpg",
        badge: "Experienced Legal Professionals",
        title: "Your Trusted Partner",
        highlight: "In Every Legal Matter",
        description:
          "From consultation to courtroom representation, we deliver practical legal solutions tailored to your needs with dedication, transparency, and unwavering commitment.",
      },
      {
        image: "/assets/BImg2.jpg",
        badge: "Professional Legal Support",
        title: "Protecting Your",
        highlight: "Legal Rights",
        description:
          "Expert guidance and professional representation in civil, criminal, family, corporate, and property law matters.",
      },
      {
        image: "/assets/BImg3.jpg",
        badge: "Experienced Advocate",
        title: "Committed To",
        highlight: "Justice & Integrity",
        description:
          "Every case is handled with professionalism, strategic planning, and complete confidentiality.",
      },
      {
        image: "/assets/BImg4.jpg",
        badge: "Trusted Representation",
        title: "Your Reliable",
        highlight: "Legal Partner",
        description:
          "Serving individuals, families, and businesses with professionalism, transparency, and commitment.",
      },
    ];

    const bannerCount = await bannerCollection.countDocuments();
    if (bannerCount === 0) {
      await bannerCollection.insertMany(defaultBanners);
      console.log("✅ Default Banners Inserted");
    }

    // ==========================
    // Default Chat Settings
    // ==========================
    const defaultChatSettings = {
      type: "chat_widget",
      whatsapp: "https://wa.me/8801700000000",
      messenger: "https://m.me/yourpage",
      enabled: true,
    };

    const chatSettingsExist = await settingsCollection.findOne({ type: "chat_widget" });
    if (!chatSettingsExist) {
      await settingsCollection.insertOne(defaultChatSettings);
      console.log("✅ Default Chat Settings Inserted");
    }

    // ==========================
    // Default Gallery Photos
    // ==========================
    const defaultGallery = [
      {
        title: "Supreme Court Advocacy",
        caption: "Senior partners presenting oral arguments before the appellate division.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
        date: "2025-11-15",
        category: "Courtroom",
        order: 1
      },
      {
        title: "Executive Chamber Consultation",
        caption: "Confidential corporate arbitration session in our central conference suite.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
        date: "2025-10-20",
        category: "Chamber",
        order: 2
      },
      {
        title: "International Arbitration Summit",
        caption: "Keynote address on cross-border maritime dispute resolution.",
        image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1000&q=80",
        date: "2025-09-05",
        category: "Summit",
        order: 3
      },
      {
        title: "Chamber Law Library & Research",
        caption: "Our extensive jurisprudence archives supporting exhaustive legal precedents.",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80",
        date: "2025-08-12",
        category: "Library",
        order: 4
      },
      {
        title: "Corporate Legal Advisory Board",
        caption: "Quarterly strategic review with financial sector enterprise clients.",
        image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80",
        date: "2025-07-30",
        category: "Advisory",
        order: 5
      },
      {
        title: "Pro Bono Justice Initiative",
        caption: "Providing legal aid and constitutional defense for underserved communities.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
        date: "2025-06-18",
        category: "Pro Bono",
        order: 6
      }
    ];

    const galleryCount = await galleryCollection.countDocuments();
    if (galleryCount === 0) {
      await galleryCollection.insertMany(defaultGallery);
      console.log("✅ Default Gallery Photos Inserted");
    }

    // ==========================
    // Default Blog Posts
    // ==========================
    const defaultBlogs = [
      {
        title: "Navigating Cross-Border Commercial Arbitration in 2026",
        slug: "navigating-cross-border-commercial-arbitration-2026",
        author: "Adv. Tariq Rahman",
        date: "July 15, 2026",
        readTime: "7 min read",
        category: "Corporate Arbitration",
        image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80",
        excerpt: "As multinational trade corridors expand, structuring bulletproof arbitration clauses has become essential to mitigate jurisdictional conflicts and protect capital investments.",
        content: `In an era of rapid globalization and digital commercial transactions, international arbitration has solidified its position as the premier mechanism for resolving complex cross-border commercial disputes. Unlike traditional domestic litigation, arbitration offers parties autonomy over the selection of specialized adjudicators, confidentiality, and international enforceability under the New York Convention.\n\n### Key Considerations for Drafting Arbitration Clauses\n1. **Choice of Seat and Governing Law**: The legal seat of arbitration dictates the procedural framework and supervisory jurisdiction of national courts. Selecting a pro-arbitration jurisdiction is paramount.\n2. **Institutional vs. Ad Hoc Proceedings**: Relying on established institutions (such as ICC, LCIA, or SIAC) provides structured administrative support and predictable fee schedules.\n3. **Emergency Arbitrator Provisions**: Recent reforms across global arbitral bodies now enable parties to seek urgent interim relief before the constitution of the formal arbitral tribunal.\n\n### Our Chamber's Strategic Approach\nOur senior partners emphasize preventative legal structuring. By conducting exhaustive risk assessments during the negotiation phase, we ensure our clients' commercial contracts contain unambiguous, enforceable arbitration protocols designed to withstand jurisdictional challenges.`
      },
      {
        title: "Constitutional Safeguards in High-Stakes Financial Litigation",
        slug: "constitutional-safeguards-high-stakes-financial-litigation",
        author: "Barrister Sarah Jenkins",
        date: "June 28, 2026",
        readTime: "5 min read",
        category: "Constitutional Law",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
        excerpt: "An analysis of recent Supreme Court appellate jurisprudence regarding statutory compliance, administrative overreach, and due process in financial regulatory enforcement.",
        content: `Regulatory scrutiny of corporate financial institutions has intensified significantly over the past decade. When administrative bodies initiate investigative proceedings or impose punitive sanctions, constitutional due process protections serve as the primary bulwark against unlawful overreach.\n\n### Principles of Natural Justice and Judicial Review\nAdministrative tribunals and regulatory authorities are bound by fundamental rules of natural justice. Any statutory investigation must adhere strictly to:\n- **The Right to a Fair Hearing (Audi Alteram Partem)**: Respondents must be afforded adequate notice and a meaningful opportunity to present legal and accounting defenses.\n- **Protection Against Arbitrary Actions**: Discretionary regulatory powers cannot be exercised capriciously; judicial review remains available to quash orders lacking rational evidentiary foundation.\n\n### Case Precedents and Courtroom Strategy\nOur litigation team recently secured a landmark appellate ruling setting aside irregular administrative assessments against a major industrial conglomerate, reaffirming that statutory compliance must operate within constitutional boundaries.`
      },
      {
        title: "Protecting Intellectual Property Rights in Joint Venture Mergers",
        slug: "protecting-intellectual-property-joint-venture-mergers",
        author: "Adv. K. M. Ahmed",
        date: "June 10, 2026",
        readTime: "6 min read",
        category: "Intellectual Property",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80",
        excerpt: "Strategic IP due diligence frameworks required when merging technology assets or entering into international joint venture partnerships.",
        content: `In modern corporate mergers and joint ventures, intangible assets—including proprietary algorithms, patents, trademarks, and trade secrets—often comprise the vast majority of enterprise value. Failing to conduct rigorous IP due diligence can expose acquiring entities to catastrophic infringement litigation and loss of exclusivity.\n\n### The Four Pillars of IP Due Diligence\n1. **Chain of Title Verification**: Ensuring that all proprietary assets were validly assigned by founders, employees, and third-party contractors without encumbrances.\n2. **Freedom to Operate (FTO) Analysis**: Assessing whether the target entity's commercial activities infringe upon third-party patents or trademarks in key target markets.\n3. **Licensing and Exclusivity Audits**: Reviewing existing inbound and outbound licenses for change-of-control restrictions or territorial limitations.\n4. **Trade Secret Protection Protocols**: Evaluating the physical and cybersecurity safeguards implemented to maintain the confidentiality of proprietary know-how.\n\n### Structuring Defensive Warranties\nIn transaction negotiations, our advisory team drafts robust indemnity clauses and escrow arrangements to insulate clients from latent IP liabilities and secure undisputed ownership of acquired innovations.`
      }
    ];

    const blogCount = await blogCollection.countDocuments();
    if (blogCount === 0) {
      await blogCollection.insertMany(defaultBlogs);
      console.log("✅ Default Blog Posts Inserted");
    }

    // ==========================
    // Category APIs
    // ==========================

    app.get("/categories", async (req, res) => {
      try {
        const result = await categoryCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.get("/categories/:slug", async (req, res) => {
      try {
        const result = await categoryCollection.findOne({ slug: req.params.slug });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.post("/categories", upload.single("icon"), async (req, res) => {
      try {
        let services = req.body.services;
        if (typeof services === 'string') {
          try { services = JSON.parse(services); } catch(e) { services = []; }
        }

        const title = req.body.title || req.body.name;
        const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : "category-" + Date.now();

        const category = {
          name: title,
          title: title,
          slug: slug,
          shortDesc: req.body.shortDesc,
          description: req.body.description,
          services: services || [],
          icon: req.file ? (req.file.secure_url || req.file.path) : ""
        };

        const result = await categoryCollection.insertOne(category);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.put("/categories/:id", upload.single("icon"), async (req, res) => {
      try {
        const updateDoc = { ...req.body };
        
        if (req.body.services && typeof req.body.services === 'string') {
          try { updateDoc.services = JSON.parse(req.body.services); } catch(e) {}
        }
        
        if (req.body.title) {
          updateDoc.name = req.body.title;
          updateDoc.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }

        if (req.file) {
          updateDoc.icon = req.file.secure_url || req.file.path;
        }

        delete updateDoc._id;

        const result = await categoryCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updateDoc }
        );

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.delete("/categories/:id", async (req, res) => {
      try {
        const result = await categoryCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // ==========================
    // Sub Category APIs
    // ==========================

    app.get("/sub-categories", async (req, res) => {
      try {
        const result = await subCategoryCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.post("/sub-categories", async (req, res) => {
      try {
        const result = await subCategoryCollection.insertOne(req.body);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // ==========================
    // Service APIs
    // ==========================

    // Get All Services
    app.get("/services", async (req, res) => {
      try {
        const result = await serviceCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // Get Single Service
    app.get("/services/:id", async (req, res) => {
      try {
        const result = await serviceCollection.findOne({
          _id: new ObjectId(req.params.id),
        });

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.post("/services", upload.single("image"), async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).send({ message: "Image is required" });
        }

        const service = {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          subCategory: req.body.subCategory,
          image: req.file.secure_url || req.file.path,
        };

        const result = await serviceCollection.insertOne(service);
        res.send(result);
      } catch (error) {
        console.error("Service upload error:", error);
        res.status(500).send({
          message: error.message || "Something went wrong while adding the service",
        });
      }
    });

    // Update Service
    app.put("/services/:id", async (req, res) => {
      try {
        const result = await serviceCollection.updateOne(
          {
            _id: new ObjectId(req.params.id),
          },
          {
            $set: req.body,
          }
        );

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // Delete Service
    app.delete("/services/:id", async (req, res) => {
      try {
        const result = await serviceCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // ==========================
    // Banner APIs
    // ==========================

    app.get("/banners", async (req, res) => {
      try {
        const result = await bannerCollection.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.get("/banners/:id", async (req, res) => {
      try {
        const result = await bannerCollection.findOne({
          _id: new ObjectId(req.params.id),
        });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.post("/banners", upload.single("image"), async (req, res) => {
      try {
        const banner = {
          badge: req.body.badge || "",
          title: req.body.title || "",
          highlight: req.body.highlight || "",
          description: req.body.description || "",
          image: req.file ? (req.file.secure_url || req.file.path) : (req.body.image || "/assets/BImg1.jpg"),
        };

        const result = await bannerCollection.insertOne(banner);
        res.send(result);
      } catch (error) {
        console.error("Banner upload error:", error);
        res.status(500).send({
          message: error.message || "Something went wrong while adding the banner",
        });
      }
    });

    app.put("/banners/:id", upload.single("image"), async (req, res) => {
      try {
        const updateDoc = {
          badge: req.body.badge || "",
          title: req.body.title || "",
          highlight: req.body.highlight || "",
          description: req.body.description || "",
        };

        if (req.file) {
          updateDoc.image = req.file.secure_url || req.file.path;
        } else if (req.body.image) {
          updateDoc.image = req.body.image;
        }

        const result = await bannerCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updateDoc }
        );

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.delete("/banners/:id", async (req, res) => {
      try {
        const result = await bannerCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // ==========================
    // Chat Settings APIs
    // ==========================

    app.get("/settings/chat", async (req, res) => {
      try {
        let result = await settingsCollection.findOne({ type: "chat_widget" });
        if (!result) {
          result = {
            type: "chat_widget",
            whatsapp: "https://wa.me/8801700000000",
            messenger: "https://m.me/yourpage",
            enabled: true,
          };
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.put("/settings/chat", async (req, res) => {
      try {
        const updateDoc = {
          type: "chat_widget",
          whatsapp: req.body.whatsapp || "",
          messenger: req.body.messenger || "",
          enabled: req.body.enabled !== undefined ? req.body.enabled : true,
        };

        const result = await settingsCollection.updateOne(
          { type: "chat_widget" },
          { $set: updateDoc },
          { upsert: true }
        );

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // ==========================
    // Consultation Settings APIs
    // ==========================

    app.get("/settings/consultation", async (req, res) => {
      try {
        let result = await settingsCollection.findOne({ type: "consultation" });
        if (!result) {
          result = {
            type: "consultation",
            phoneNumber: "+8801700000000",
          };
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.put("/settings/consultation", async (req, res) => {
      try {
        const updateDoc = {
          type: "consultation",
          phoneNumber: req.body.phoneNumber || "+8801700000000",
        };

        const result = await settingsCollection.updateOne(
          { type: "consultation" },
          { $set: updateDoc },
          { upsert: true }
        );

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // ==========================
    // Gallery APIs
    // ==========================

    app.get("/gallery", async (req, res) => {
      try {
        const result = await galleryCollection.find().sort({ order: 1, _id: -1 }).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.post("/gallery", async (req, res) => {
      try {
        const photo = req.body;
        const result = await galleryCollection.insertOne(photo);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.put("/gallery/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateData = { ...req.body };
        delete updateData._id;

        const result = await galleryCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.delete("/gallery/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await galleryCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // ==========================
    // Blog APIs
    // ==========================

    app.get("/blogs", async (req, res) => {
      try {
        const result = await blogCollection.find().sort({ _id: -1 }).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.get("/blogs/:id", async (req, res) => {
      try {
        const param = req.params.id;
        let query;
        if (ObjectId.isValid(param)) {
          query = { $or: [{ _id: new ObjectId(param) }, { slug: param }] };
        } else {
          query = { slug: param };
        }
        const result = await blogCollection.findOne(query);
        if (!result) {
          return res.status(404).send({ message: "Blog post not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.post("/blogs", async (req, res) => {
      try {
        const post = req.body;
        if (!post.slug && post.title) {
          post.slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        const result = await blogCollection.insertOne(post);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.put("/blogs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateData = { ...req.body };
        delete updateData._id;
        if (!updateData.slug && updateData.title) {
          updateData.slug = updateData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        const result = await blogCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.delete("/blogs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    // ==========================
    // Inquiry APIs
    // ==========================

    app.get("/inquiries", async (req, res) => {
      try {
        const result = await inquiryCollection.find().sort({ createdAt: -1, _id: -1 }).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.post("/inquiries", async (req, res) => {
      try {
        const inquiry = req.body;
        inquiry.createdAt = new Date();
        const result = await inquiryCollection.insertOne(inquiry);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.delete("/inquiries/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await inquiryCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    console.log("🚀 APIs Ready");

    // Start Server after DB connection and routes are initialized
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run().catch(console.dir);