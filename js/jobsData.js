// jobsData.js - Curated tech jobs dataset
export const initialJobs = [
  {
    id: "job-1",
    title: "Software Development Engineer - I (SDE 1)",
    company: "Google",
    logoText: "G",
    logoBg: "#4285F4",
    location: "Bangalore, India",
    type: "Full-Time",
    workplace: "Hybrid",
    experience: "0 - 2 Years",
    salary: "₹24 - 32 LPA",
    salaryNum: 28,
    postedDaysAgo: 1,
    category: "Software Engineering",
    skills: ["Java", "C++", "Data Structures", "System Design", "Algorithms"],
    featured: true,
    description: `We are looking for an ambitious Software Development Engineer I to join our Google Core Infrastructure team. You will design, build, and deploy high-volume, low-latency microservices that handle billions of queries each day.

Key Responsibilities:
• Build resilient, scalable backend microservices using Java/C++.
• Collaborate with cross-functional teams including Product, UX, and QA.
• Participate in code reviews, design docs, and unit/integration testing.
• Optimize existing algorithms for peak CPU and memory performance.

Requirements:
• Bachelor's/Master's in Computer Science or related STEM field.
• Strong foundation in Data Structures, Algorithms, and Object-Oriented Design.
• Proficiency in Java, C++, Python, or Go.
• Understanding of relational and NoSQL databases.`
  },
  {
    id: "job-2",
    title: "Frontend Engineer (React / Next.js)",
    company: "Atlassian",
    logoText: "A",
    logoBg: "#0052CC",
    location: "Remote (India)",
    type: "Full-Time",
    workplace: "Remote",
    experience: "1 - 3 Years",
    salary: "₹18 - 26 LPA",
    salaryNum: 22,
    postedDaysAgo: 2,
    category: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Redux", "Tailwind CSS"],
    featured: true,
    description: `Atlassian is hiring a Frontend Engineer for the Jira Cloud user interface team. You will craft accessible, high-performance web applications used by over 300,000 global companies.

Key Responsibilities:
• Build modern, responsive, and accessible UI components in React and TypeScript.
• Collaborate closely with product designers to implement intuitive user workflows.
• Implement state management, optimistic UI updates, and real-time collaboration.
• Maintain high test coverage with Jest, React Testing Library, and Cypress.

Requirements:
• 1-3 years of modern web development experience with React and TypeScript.
• Deep familiarity with Web APIs, DOM performance, and responsive CSS.
• Passion for clean code, design systems, and web accessibility (WCAG).`
  },
  {
    id: "job-3",
    title: "Backend Engineer - Payments & FinTech",
    company: "Razorpay",
    logoText: "R",
    logoBg: "#0C2340",
    location: "Bangalore, India",
    type: "Full-Time",
    workplace: "On-Site",
    experience: "1 - 4 Years",
    salary: "₹20 - 28 LPA",
    salaryNum: 24,
    postedDaysAgo: 3,
    category: "Backend",
    skills: ["Golang", "Node.js", "Kafka", "PostgreSQL", "Redis", "Distributed Systems"],
    featured: true,
    description: `Razorpay is India's leading fintech company. We are seeking a Backend Engineer for the Core Payments Gateway team, handling millions of transactions every hour.

Key Responsibilities:
• Architect resilient transactional payment pipelines with 99.999% uptime.
• Work with Kafka message brokers, distributed locks, and caching mechanisms.
• Debug tricky distributed system bottlenecks, idempotency, and reconciliation.
• Maintain security best practices (PCI-DSS compliance, tokenization).

Requirements:
• Experience with Go, Java, or Node.js in high-scale environments.
• Sound knowledge of PostgreSQL, database indexes, and transaction isolation.
• Familiarity with message queues (Kafka/RabbitMQ) and Redis caching.`
  },
  {
    id: "job-4",
    title: "Software Engineer Intern (Summer 2027)",
    company: "Microsoft",
    logoText: "M",
    logoBg: "#00A4EF",
    location: "Hyderabad, India",
    type: "Internship",
    workplace: "Hybrid",
    experience: "College Students (2026/2027 batch)",
    salary: "₹1.2 Lakh / month",
    salaryNum: 15,
    postedDaysAgo: 1,
    category: "Internship",
    skills: ["C#", "C++", "DSA", "Problem Solving", "Azure", "Git"],
    featured: true,
    description: `Microsoft is welcoming applications for our 6-month Engineering Internship. Interns work directly alongside full-time engineers on Azure Cloud, Teams, or Office 365.

Key Responsibilities:
• Design and code prototype features under the mentorship of senior engineers.
• Write unit tests, automate deployment scripts, and measure performance gains.
• Present project deliverables to leadership at the internship showcase.

Requirements:
• Currently pursuing B.Tech/M.Tech in CS/IT or allied branches (graduation 2026 or 2027).
• Top-tier problem-solving ability and knowledge of Core Data Structures.
• Curiosity to learn cloud computing and modern software architecture.`
  },
  {
    id: "job-5",
    title: "Data Engineer / Analytics Engineer",
    company: "Swiggy",
    logoText: "S",
    logoBg: "#FC8019",
    location: "Bangalore, India",
    type: "Full-Time",
    workplace: "Hybrid",
    experience: "2 - 4 Years",
    salary: "₹19 - 27 LPA",
    salaryNum: 23,
    postedDaysAgo: 4,
    category: "Data Engineering",
    skills: ["Python", "SQL", "Apache Spark", "Airflow", "Snowflake", "dbt"],
    featured: false,
    description: `Join Swiggy's Data Platform group to build reliable real-time and batch data pipelines powering routing algorithms, customer delivery estimates, and merchant analytics.

Key Responsibilities:
• Build scalable ETL/ELT pipelines processing terabytes of data daily.
• Optimize Spark clusters, partitioning strategies, and BigQuery/Snowflake warehouses.
• Partner with Data Science teams to feature-store real-time ML inputs.

Requirements:
• Strong fluency in advanced SQL and Python data manipulation (Pandas, PySpark).
• Experience with orchestrators (Airflow, Prefect) and modern data stack (dbt).`
  },
  {
    id: "job-6",
    title: "Full Stack Engineer (MERN / Python)",
    company: "Zomato",
    logoText: "Z",
    logoBg: "#CB202D",
    location: "Gurugram, India",
    type: "Full-Time",
    workplace: "Hybrid",
    experience: "1 - 3 Years",
    salary: "₹16 - 24 LPA",
    salaryNum: 20,
    postedDaysAgo: 5,
    category: "Full Stack",
    skills: ["Node.js", "React", "Python", "MongoDB", "AWS", "Docker"],
    featured: false,
    description: `Zomato is looking for a dynamic Full Stack Engineer to build tools for restaurant partners, menu management, and real-time order tracking.

Key Responsibilities:
• Develop end-to-end features across responsive React web apps and Node.js REST/GraphQL APIs.
• Containerize services using Docker and deploy to AWS ECS/Kubernetes.
• Maintain intuitive UI/UX with micro-interactions and smooth performance.

Requirements:
• 1+ years building production web apps in Node.js and React.
• Practical understanding of relational or document databases (PostgreSQL/MongoDB).`
  },
  {
    id: "job-7",
    title: "DevOps & Cloud Engineer",
    company: "PhonePe",
    logoText: "P",
    logoBg: "#6739B7",
    location: "Bangalore, India",
    type: "Full-Time",
    workplace: "On-Site",
    experience: "2 - 5 Years",
    salary: "₹22 - 30 LPA",
    salaryNum: 26,
    postedDaysAgo: 6,
    category: "DevOps",
    skills: ["Kubernetes", "Docker", "Terraform", "CI/CD", "Prometheus", "Linux"],
    featured: false,
    description: `Help keep India's largest UPI platform running smoothly with zero downtime. You will automate infrastructure provisioning, enhance CI/CD, and maintain distributed monitoring.

Key Responsibilities:
• Manage multi-region Kubernetes clusters running thousands of containers.
• Write Infrastructure as Code using Terraform and Ansible.
• Configure Grafana, Prometheus, and OpenTelemetry observability stacks.

Requirements:
• Strong mastery of Linux internals, networking protocols, and shell scripting.
• Proven hands-on production experience with Docker and Kubernetes.`
  },
  {
    id: "job-8",
    title: "Machine Learning / AI Engineer",
    company: "Amazon",
    logoText: "amz",
    logoBg: "#FF9900",
    location: "Hyderabad, India",
    type: "Full-Time",
    workplace: "Hybrid",
    experience: "1 - 4 Years",
    salary: "₹28 - 40 LPA",
    salaryNum: 34,
    postedDaysAgo: 2,
    category: "AI / ML",
    skills: ["Python", "PyTorch", "LLMs", "NLP", "AWS SageMaker", "Vector DBs"],
    featured: true,
    description: `Amazon Alexa & Shopping AI is hiring ML Engineers to build generative AI solutions, semantic product search, and multilingual customer intelligence models.

Key Responsibilities:
• Fine-tune foundation models (LLMs) for conversational retrieval and recommendation.
• Optimize inference latency via quantization, ONNX, and TensorRT.
• Collaborate with software engineers to integrate ML models into low-latency endpoints.

Requirements:
• Hands-on proficiency with PyTorch or TensorFlow, Hugging Face Transformers.
• Experience in NLP, embeddings, RAG architectures, and vector search (Faiss/Pinecone).`
  },
  {
    id: "job-9",
    title: "Associate Product Manager / Tech APM",
    company: "Flipkart",
    logoText: "F",
    logoBg: "#2874F0",
    location: "Bangalore, India",
    type: "Full-Time",
    workplace: "Hybrid",
    experience: "0 - 2 Years",
    salary: "₹18 - 25 LPA",
    salaryNum: 21,
    postedDaysAgo: 7,
    category: "Product Management",
    skills: ["Product Roadmap", "Data Analytics", "SQL", "Wireframing", "A/B Testing"],
    featured: false,
    description: `Flipkart APM program gives you end-to-end ownership of products that serve 400M+ Indian consumers. You will define PRDs, coordinate engineering teams, and run A/B experiments.

Key Responsibilities:
• Formulate problem hypotheses, interview users, and prioritize feature backlog.
• Run rigorous statistical A/B tests to optimize checkout funnel conversion.
• Synthesize qualitative customer feedback and quantitative telemetry data.

Requirements:
• Engineering degree or technical background with strong analytical acumen.
• Exceptional communication and cross-functional leadership qualities.`
  },
  {
    id: "job-10",
    title: "Junior Backend Developer (Go / Node)",
    company: "CRED",
    logoText: "C",
    logoBg: "#1A1A1A",
    location: "Bangalore, India",
    type: "Full-Time",
    workplace: "On-Site",
    experience: "0 - 2 Years",
    salary: "₹18 - 24 LPA",
    salaryNum: 21,
    postedDaysAgo: 3,
    category: "Backend",
    skills: ["Golang", "REST APIs", "PostgreSQL", "Docker", "Redis"],
    featured: true,
    description: `CRED is looking for high-ownership junior developers who obsess over engineering excellence, beautiful code, and high-performance financial systems.

Key Responsibilities:
• Develop clean, testable Golang microservices.
• Work with senior architects on schema design, query optimization, and latency tuning.
• Maintain automated testing pipelines and zero-defect deployments.

Requirements:
• Strong coding ability in Go, Python, or Java.
• Good grasp of relational databases, transactions, and REST conventions.`
  }
];

