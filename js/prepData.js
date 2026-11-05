// prepData.js - Comprehensive Prep Hub: Aptitude, DSA Notes, Technical (CS Core & System Design), HR & Behavioral
export const prepData = {
  // ==========================================
  // 1. APTITUDE PREPARATION
  // ==========================================
  aptitude: {
    categories: ["All", "Quantitative", "Logical Reasoning", "Verbal Ability"],
    notes: [
      {
        id: "apt-note-1",
        title: "Quantitative Aptitude: Master Formulas & Speed Tricks",
        category: "Quantitative",
        summary: "Essential formulas for Percentages, Profit & Loss, Time-Speed-Distance, and Work-Time.",
        content: `### 1. Percentages & Fractions Equivalence
• 1/2 = 50% | 1/3 = 33.33% | 1/4 = 25% | 1/5 = 20% | 1/6 = 16.66%
• 1/7 = 14.28% | 1/8 = 12.5% | 1/9 = 11.11% | 1/11 = 9.09% | 1/12 = 8.33%
• **Successive Percentage Change Formula:** If value increases by a% and then b%, Net Change = [a + b + (ab/100)]%

### 2. Profit and Loss
• Profit % = (Profit / Cost Price) × 100
• Loss % = (Loss / Cost Price) × 100
• Selling Price (SP) = CP × (100 + P%) / 100
• **False Weight Trick:** If a dishonest shopkeeper uses x gm instead of 1 kg, Gain % = [(True Weight - False Weight) / False Weight] × 100

### 3. Time, Speed and Distance (TSD)
• Speed = Distance / Time
• **Conversion:** 1 km/hr = 5/18 m/s | 1 m/s = 18/5 km/hr
• **Average Speed:**
  - If equal distance is covered at speeds x and y: Avg Speed = 2xy / (x + y)
  - General: Total Distance / Total Time
• **Relative Speed:**
  - Same Direction: |S1 - S2|
  - Opposite Direction: S1 + S2

### 4. Time and Work
• If A completes a work in 'a' days, 1 day work of A = 1/a.
• If A and B work together: Combined 1 day work = 1/a + 1/b = (a + b) / ab. Total time = ab / (a + b) days.
• **Man-Days Formula:** (M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2

### 5. Permutation and Combination
• P(n, r) = n! / (n - r)! (Order matters: arrangement)
• C(n, r) = n! / [r! × (n - r)!] (Order does not matter: selection)
• Probability P(E) = Number of Favorable Outcomes / Total Sample Space`
      },
      {
        id: "apt-note-2",
        title: "Logical Reasoning: Syllogisms, Blood Relations & Series",
        category: "Logical Reasoning",
        summary: "Step-by-step deduction rules, Venn diagram strategies, and relation decoders.",
        content: `### 1. Blood Relations Decoding Table
• Mother's or Father's Son = Brother
• Mother's or Father's Daughter = Sister
• Mother's or Father's Brother = Maternal/Paternal Uncle
• Mother's or Father's Sister = Aunt
• Son's Wife = Daughter-in-law | Daughter's Husband = Son-in-law
• Brother's/Sister's Son = Nephew | Brother's/Sister's Daughter = Niece
• *Tip:* Draw a generation tree with "+" for male, "-" for female, and "=" for spouses.

### 2. Syllogisms & Venn Diagrams
• **"All A are B"**: Circle A is entirely inside circle B.
• **"Some A are B"**: Circle A overlaps circle B.
• **"No A are B"**: Circle A and circle B are strictly disjoint.
• **Golden Rule:** Never assume anything outside the stated premises. If a conclusion is false in even one valid Venn diagram configuration, it is NOT logically sound.

### 3. Coding-Decoding & Letter Series
• Memorize alphabet rank: **EJOTY** (5, 10, 15, 20, 25)
• Reverse alphabet pairs:
  - A-Z (Azad), B-Y (Boy), C-X (Crux), D-W (Dew), E-V (Evening)
  - F-U (Fun), G-T (GT Road), H-S (High School), I-R (Indian Railway)
  - J-Q (Jack-Queen), K-P (KanPur), L-O (Love), M-N (Man)`
      },
      {
        id: "apt-note-3",
        title: "Verbal Ability: Sentence Correction & Critical Reasoning",
        category: "Verbal Ability",
        summary: "Grammar rules (Subject-Verb agreement, Modifiers, Parallelism) and Reading Comprehension tactics.",
        content: `### 1. Top Grammar Rules for Placement Exams
• **Subject-Verb Agreement:** Singular subject takes singular verb.
  - "The quality of these products *is* excellent" (subject is *quality*, not *products*).
  - Words joined by "along with", "as well as", "together with" do not change the subject number.
• **Dangling Modifiers:** A modifying phrase must be immediately adjacent to the noun it modifies.
  - *Incorrect:* "Walking in the park, the trees looked vibrant."
  - *Correct:* "Walking in the park, I saw that the trees looked vibrant."
• **Parallelism:** Items in a list or comparison must share identical grammatical form.
  - *Correct:* "She likes swimming, running, and reading." (not "and to read").

### 2. Reading Comprehension Strategy
• Skim the questions *first* before reading the passage to know key anchor keywords.
• Distinguish between the **Main Idea** (primary message) vs **Supporting Details** (examples).
• Beware of extreme answer choices using words like "always", "never", "only", or "impossible".`
      }
    ],
    questions: [
      {
        id: "q-1",
        category: "Quantitative",
        question: "A train running at 54 km/hr takes 20 seconds to pass a standing pole. What is the length of the train?",
        options: ["250 meters", "300 meters", "350 meters", "400 meters"],
        correctIndex: 1,
        explanation: "Convert speed from km/hr to m/s: 54 × (5/18) = 15 m/s.\nDistance = Speed × Time = 15 m/s × 20 s = 300 meters. (When crossing a pole, distance covered equals the length of the train)."
      },
      {
        id: "q-2",
        category: "Quantitative",
        question: "A can complete a piece of work in 12 days and B in 24 days. If they work together, how many days will they take to complete the work?",
        options: ["6 days", "8 days", "10 days", "9 days"],
        correctIndex: 1,
        explanation: "Combined time = (A × B) / (A + B) = (12 × 24) / (12 + 24) = 288 / 36 = 8 days."
      },
      {
        id: "q-3",
        category: "Quantitative",
        question: "An article is sold for ₹840 at a gain of 20%. What was its cost price?",
        options: ["₹650", "₹700", "₹720", "₹750"],
        correctIndex: 1,
        explanation: "SP = CP × (100 + P%) / 100\n840 = CP × 120 / 100 = CP × 1.2\nCP = 840 / 1.2 = ₹700."
      },
      {
        id: "q-4",
        category: "Quantitative",
        question: "In how many different ways can the letters of the word 'LEADER' be arranged?",
        options: ["720", "360", "180", "120"],
        correctIndex: 1,
        explanation: "Total letters = 6. The letter 'E' appears 2 times. Total permutations = 6! / 2! = 720 / 2 = 360 ways."
      },
      {
        id: "q-5",
        category: "Logical Reasoning",
        question: "Pointing to a photograph, a woman says: 'He is the son of the only daughter of the father of my brother.' How is the person in the photograph related to the woman?",
        options: ["Brother", "Son", "Nephew", "Father"],
        correctIndex: 1,
        explanation: "Let's decompose backwards:\n1. 'Father of my brother' = Woman's father.\n2. 'Only daughter of woman's father' = The woman herself!\n3. 'He is the son of the woman' = Son."
      },
      {
        id: "q-6",
        category: "Logical Reasoning",
        question: "Find the missing number in the sequence: 4, 9, 25, 49, 121, ?",
        options: ["144", "169", "196", "225"],
        correctIndex: 1,
        explanation: "These are squares of prime numbers: 2² = 4, 3² = 9, 5² = 25, 7² = 49, 11² = 121. The next prime number is 13, so 13² = 169."
      },
      {
        id: "q-7",
        category: "Logical Reasoning",
        question: "Statements: All cars are cats. All cats are fans.\nConclusions:\nI. All cars are fans.\nII. Some fans are cars.",
        options: ["Only conclusion I follows", "Only conclusion II follows", "Both conclusions I and II follow", "Neither follows"],
        correctIndex: 2,
        explanation: "Since all Cars are Cats and all Cats are Fans, Cars are a subset of Fans (I follows). Since there are Cars inside Fans, at least some Fans must be Cars (II follows). Both follow."
      },
      {
        id: "q-8",
        category: "Verbal Ability",
        question: "Identify the sentence with correct subject-verb agreement:",
        options: [
          "Either the teacher or the students has to clean the room.",
          "Neither the manager nor the employees were informed.",
          "Every one of the players are ready for the match.",
          "The group of students were singing loudly."
        ],
        correctIndex: 1,
        explanation: "In 'Neither... nor...', the verb agrees with the nearer subject ('employees', which is plural, so 'were' is correct). 'Every one' is singular; 'group' is a singular collective noun."
      },
      {
        id: "q-9",
        category: "Verbal Ability",
        question: "Choose the word most nearly opposite in meaning to EPHEMERAL:",
        options: ["Transient", "Perpetual", "Fleeting", "Fragile"],
        correctIndex: 1,
        explanation: "Ephemeral means lasting for a very short time. Its antonym is Perpetual (eternal, everlasting)."
      },
      {
        id: "q-10",
        category: "Quantitative",
        question: "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both are opened together, how long will it take to fill the tank?",
        options: ["10 minutes", "12 minutes", "15 minutes", "18 minutes"],
        correctIndex: 1,
        explanation: "Time = (A × B) / (A + B) = (20 × 30) / (20 + 30) = 600 / 50 = 12 minutes."
      }
    ]
  },

  // ==========================================
  // 2. TECHNICAL PREPARATION (CS Core & Systems)
  // ==========================================
  technical: {
    topics: [
      {
        id: "tech-os",
        name: "Operating Systems (OS)",
        badge: "Core CS",
        summary: "Process scheduling, thread concurrency, virtual memory, paging, and deadlocks.",
        content: `### 1. Process vs. Thread
• **Process:** An independent executing program with its own dedicated memory address space (text, data, heap, stack), file descriptors, and security context. Context switching between processes is relatively expensive.
• **Thread:** A lightweight unit of execution within a process that shares the heap, global variables, and code with other peer threads, but maintains its own program counter, registers, and private call stack.

### 2. The 4 Necessary Conditions for Deadlock (Coffman Conditions)
1. **Mutual Exclusion:** At least one resource must be held in a non-shareable mode.
2. **Hold and Wait:** A process is holding at least one resource and requesting additional resources currently held by others.
3. **No Preemption:** Resources cannot be forcibly seized; they can only be released voluntarily.
4. **Circular Wait:** A closed chain of processes exists such that each process holds a resource needed by the next.
*Remedy:* Prevent deadlock by breaking any one condition (e.g. strict resource ordering to prevent circular wait).

### 3. Virtual Memory & Paging
• **Page Table:** Maps virtual addresses generated by CPU to physical RAM page frames.
• **TLB (Translation Lookaside Buffer):** High-speed hardware associative cache for page table lookups.
• **Page Fault:** An interrupt raised when a program accesses a memory page not currently mapped into physical RAM, requiring the OS to fetch it from disk/swap space.
• **Thrashing:** A state where the system spends more time swapping pages in/out of disk than executing instructions due to inadequate physical memory.`
      },
      {
        id: "tech-dbms",
        name: "DBMS & SQL",
        badge: "Databases",
        summary: "ACID properties, B-Tree indexing, normalization, transaction isolation levels, and SQL.",
        content: `### 1. ACID Properties
• **Atomicity:** All operations in a transaction succeed completely or none do (All-or-Nothing rollback via WAL log).
• **Consistency:** Database transitions from one valid state to another valid state, preserving all constraints and triggers.
• **Isolation:** Concurrent transactions execute without interfering with one another.
• **Durability:** Once committed, transaction results survive system crashes and power outages.

### 2. Database Normalization
• **1NF:** Eliminate repeating groups; ensure every column holds atomic (indivisible) values.
• **2NF:** Be in 1NF and eliminate partial functional dependencies (every non-key attribute must depend on the whole primary key).
• **3NF:** Be in 2NF and eliminate transitive dependencies (non-key columns must not depend on other non-key columns).
• **BCNF:** A stricter version of 3NF: for every functional dependency X → Y, X must be a super key.

### 3. B-Tree vs Hash Index
• **B+ Tree Index:** Balanced search tree. Ideal for range scans (BETWEEN, <, >), sorting (ORDER BY), and equality queries. Time complexity: O(log N).
• **Hash Index:** Direct key-value hash lookup. Lightning fast O(1) for strict equality (=), but incapable of range scans.`
      },
      {
        id: "tech-cn",
        name: "Computer Networks",
        badge: "Networking",
        summary: "TCP 3-way handshake, OSI vs TCP/IP, DNS resolution flow, HTTP/1.1 vs HTTP/2 vs HTTP/3.",
        content: `### 1. TCP vs. UDP
• **TCP (Transmission Control Protocol):** Connection-oriented, guarantees packet delivery and ordering, provides flow control (sliding window) and congestion control. Used in HTTP, SSH, FTP, Email.
• **UDP (User Datagram Protocol):** Connectionless, lightweight, no delivery or ordering guarantee, zero handshake latency. Used in DNS lookups, video streaming, VoIP, online gaming.

### 2. TCP 3-Way Handshake (Connection Establishment)
1. **Client -> Server:** SYN (Synchronize Sequence Number = x).
2. **Server -> Client:** SYN-ACK (Ack = x + 1, Seq = y).
3. **Client -> Server:** ACK (Ack = y + 1).

### 3. What Happens When You Type a URL in Your Browser?
1. **DNS Lookup:** Browser cache -> OS cache -> Router cache -> ISP Recursive Resolver -> Root Server -> TLD Server -> Authoritative DNS.
2. **TCP Handshake:** Client establishes TCP socket connection (port 443 for HTTPS).
3. **TLS/SSL Handshake:** Cipher negotiation, server certificate verification, session key exchange.
4. **HTTP Request & Response:** Browser issues GET request, server returns HTML/CSS/JS payload.
5. **DOM & CSSOM Rendering:** Browser builds render tree, computes layout, paints pixels.`
      },
      {
        id: "tech-sd",
        name: "System Design Basics",
        badge: "Architecture",
        summary: "Horizontal scaling, load balancing, caching strategies, CAP theorem, and rate limiting.",
        content: `### 1. Horizontal vs. Vertical Scaling
• **Vertical Scaling (Scale-Up):** Adding more CPU, RAM, or SSD to a single server. Simple, but bounded by hardware limits and creates a single point of failure (SPOF).
• **Horizontal Scaling (Scale-Out):** Adding more commodity machines to the pool. Highly fault-tolerant and linearly scalable, but introduces distributed system complexity.

### 2. Caching Strategies
• **Cache-Aside (Lazy Loading):** Application queries cache first; on miss, fetches from DB, puts in cache, and returns. Good for read-heavy workloads.
• **Write-Through:** Application writes to cache and database simultaneously. Ensures consistency, higher write latency.
• **Write-Back (Write-Behind):** Application writes to cache immediately; cache asynchronously writes to DB in batches. Very fast, but risk of data loss on crash.

### 3. The CAP Theorem
In a distributed asynchronous network that can experience network partitions (P), you can guarantee only one of:
• **Consistency (C):** Every read receives the most recent write or an error.
• **Availability (A):** Every non-failing node returns a response, but it may not be the newest data.`
      }
    ],
    qaList: [
      {
        q: "What is the difference between a Process and a Thread?",
        category: "Operating Systems",
        a: "A process is an isolated execution environment with its own address space, memory pages, and system handles. A thread is an execution unit inside a process that shares memory and resources with other threads in the same process, but has its own stack and registers. Context switching between threads is faster because memory page mappings do not need to be flushed."
      },
      {
        q: "What are the 4 conditions required for a Deadlock to occur?",
        category: "Operating Systems",
        a: "The Coffman conditions: 1) Mutual Exclusion (resources cannot be shared), 2) Hold and Wait (holding a resource while requesting another), 3) No Preemption (resources cannot be forcefully taken), and 4) Circular Wait (a circular chain of processes waiting on each other)."
      },
      {
        q: "Explain database indexing and why B-Trees are preferred over Binary Search Trees.",
        category: "DBMS",
        a: "B-Trees and B+ Trees have a high branching factor (fan-out), which drastically reduces tree height compared to a standard binary tree. Since database indexes reside on disk, each tree node traversal corresponds to an expensive disk I/O block read. A B+ Tree with fan-out 100 requires only 3-4 disk reads to search millions of records."
      },
      {
        q: "What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?",
        category: "DBMS",
        a: "INNER JOIN returns only rows that have matching values in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right table (with NULLs for unmatched rows). FULL OUTER JOIN returns all rows when there is a match in either left or right table."
      },
      {
        q: "Explain the TCP 3-Way Handshake step by step.",
        category: "Computer Networks",
        a: "Step 1 (SYN): The client sends a packet with SYN flag set and an initial sequence number (ISN). Step 2 (SYN-ACK): The server acknowledges by setting ACK = client_ISN + 1 and sends its own SYN with server_ISN. Step 3 (ACK): The client replies with ACK = server_ISN + 1. The connection is now established."
      },
      {
        q: "What is the CAP Theorem and why can't a distributed system have all three?",
        category: "System Design",
        a: "CAP stands for Consistency, Availability, and Partition Tolerance. In any distributed system across network nodes, network partitions (delays, dropped packets) are inevitable. When a partition occurs, the system must choose between serving potentially stale data to remain Available, or rejecting requests/waiting for sync to ensure strict Consistency."
      }
    ]
  },

  // ==========================================
  // 3. HR & BEHAVIORAL INTERVIEW PREPARATION
  // ==========================================
  hr: {
    starFramework: {
      title: "Mastering the STAR Method for Behavioral Interviews",
      summary: "Used by Google, Amazon, Microsoft, and Meta to evaluate behavioral competencies.",
      steps: [
        {
          letter: "S",
          name: "Situation",
          desc: "Set the context. Describe the specific challenge, project, deadline, or conflict you faced with concise details."
        },
        {
          letter: "T",
          name: "Task",
          desc: "Define your exact responsibility. What were you specifically assigned to solve or accomplish?"
        },
        {
          letter: "A",
          name: "Action",
          desc: "The heart of your answer (60-70% of time). Detail the specific steps YOU took, tools used, obstacles navigated, and leadership shown."
        },
        {
          letter: "R",
          name: "Result",
          desc: "Quantify the outcome! Share measurable business metrics (e.g., 'reduced latency by 35%', 'delivered 2 days early', 'saved $12k')."
        }
      ]
    },
    topQuestions: [
      {
        id: "hr-1",
        question: "Tell me about yourself.",
        intent: "Assessing communication clarity, career progression coherence, and immediate alignment with the job role.",
        tips: "Keep it under 90-120 seconds. Use the 'Present -> Past -> Future' structure. Don't recite your entire resume line-by-line.",
        sampleAnswer: `"I am a passionate software engineer with a strong foundation in full-stack web development and distributed systems. Recently, I completed my degree in Computer Science, during which I built several production-ready applications, including a real-time collaborative workspace using React and Node.js that handled hundreds of concurrent connections. I love tackling algorithmic challenges and optimizing database performance. I'm excited about this opportunity at [Company Name] because your team is solving large-scale high-concurrency challenges that directly align with where I want to push my engineering skills."`
      },
      {
        id: "hr-2",
        question: "Tell me about a time you faced a difficult technical bug or challenge.",
        intent: "Evaluating technical problem-solving methodology, perseverance, and structured debugging under pressure.",
        tips: "Highlight your systematic diagnosis (logs, reproducing locally, profiling) rather than random trial-and-error.",
        sampleAnswer: `"In my previous project, we observed intermittent memory leaks during peak traffic simulations. Rather than making speculative code changes, I profiled the Node.js heap snapshots using Chrome DevTools and identified uncollected event listeners inside our WebSocket message handler. I refactored the listener lifecycle to clean up on client disconnect and instituted unit tests for socket teardowns. As a result, our service's memory usage dropped by 42% and sustained 5x the previous connection load without crashes."`
      },
      {
        id: "hr-3",
        question: "Why do you want to join our company?",
        intent: "Testing genuine interest and company research vs. sending generic applications.",
        tips: "Reference specific company products, engineering blogs, recent launches, or tech culture values.",
        sampleAnswer: `"I've followed [Company]'s engineering blog for months, particularly the article on migrating your payment ingestion pipeline to an event-driven architecture using Kafka. The scale at which your systems process millions of mission-critical transactions with sub-second latency is incredible. I want to work alongside engineers who prioritize high availability and robust code reviews, and I know my background in backend performance optimization will allow me to make an immediate impact."`
      },
      {
        id: "hr-4",
        question: "Describe a conflict you had with a team member and how you resolved it.",
        intent: "Checking emotional intelligence, active listening, maturity, and collaborative mindset.",
        tips: "Focus on technical alignment and business outcomes, never personal friction. Emphasize open communication.",
        sampleAnswer: `"During a hackathon, a teammate and I disagreed on whether to use GraphQL or REST for our API. He preferred GraphQL for flexibility, while I was concerned about the learning curve and N+1 query overhead given our 24-hour deadline. Instead of debating abstractly, I scheduled a 15-minute whiteboard session where we mapped out our 4 primary endpoints. Seeing the simplicity of the schemas, we agreed that REST with standardized JSON would allow us to ship the MVP safely, and we documented GraphQL as a v2 milestone. We finished on time and won second place."`
      },
      {
        id: "hr-5",
        question: "Where do you see yourself in 3 to 5 years?",
        intent: "Assessing ambition, realistic goal setting, and whether you're looking for stable growth.",
        tips: "Focus on skill mastery, expanding scope from individual contributor to technical leadership/mentorship.",
        sampleAnswer: `"In the next 3 to 5 years, my goal is to grow into a senior engineer who not only writes robust, scalable code but also leads architectural design decisions and mentors junior engineers. I want to have deep domain ownership over critical backend services, contributing to open-source initiatives and driving best engineering practices across the team."`
      },
      {
        id: "hr-6",
        question: "What is your greatest weakness?",
        intent: "Testing self-awareness, honesty, and proactive self-improvement.",
        tips: "Pick a genuine professional skill (not a fake 'I work too hard'), explain your awareness, and show active steps you're taking to improve.",
        sampleAnswer: `"Earlier in my development journey, I had a tendency to dive straight into coding as soon as I received a problem statement, which occasionally led to refactoring when edge cases appeared. I realized this was inefficient, so I trained myself to write design specs and pseudocode first, soliciting peer feedback before writing a single line of production code. This habit has significantly improved my code quality and delivery predictability."`
      }
    ],
    smartQuestionsToAsk: [
      "What does success look like for someone in this role within the first 90 days?",
      "Can you describe the engineering team's current deployment cycle and CI/CD workflow?",
      "What is the most interesting technical challenge the team is currently tackling?",
      "How does the team foster learning, mentorship, and continuous skill development?",
      "What is the company's approach to technical debt versus shipping new features?"
    ]
  }
};

