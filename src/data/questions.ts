export type Topic =
  | 'cloud-concepts'
  | 'architecture-core-services'
  | 'management-governance';

export interface Question {
  id: string;
  topic: Topic;
  question: string;
  options: string[]; // 4 options (A-D)
  correctIndex: number;
  whyCorrect: string;
  whyWrong: string[]; // 4 reasons, same order as options
  beginnerAnalogy: string;
}

export const TOPICS: { id: Topic; label: string; short: string; icon: string }[] = [
  { id: 'cloud-concepts', label: 'Cloud Concepts', short: 'Concepts', icon: 'Cloud' },
  { id: 'architecture-core-services', label: 'Architecture & Core Services', short: 'Services', icon: 'Boxes' },
  { id: 'management-governance', label: 'Management & Governance', short: 'Governance', icon: 'Settings2' },
];

export const PASS_THRESHOLD = 80;

export const QUESTIONS: Question[] = [
  // ───────────────────── CLOUD CONCEPTS ─────────────────────
  {
    id: 'cc1',
    topic: 'cloud-concepts',
    question:
      'Which cloud model provides the highest level of control over the underlying hardware and operating system?',
    options: [
      'Software as a Service (SaaS)',
      'Platform as a Service (PaaS)',
      'Infrastructure as a Service (IaaS)',
      'Function as a Service (FaaS)',
    ],
    correctIndex: 2,
    whyCorrect:
      'IaaS gives you virtualized compute, storage, and networking where you install and manage the OS, middleware, and applications — the most control of the three standard models.',
    whyWrong: [
      'SaaS is a finished product (like Microsoft 365) where the vendor manages everything including the app — you have the least control.',
      'PaaS lets you deploy apps while the provider manages the OS and runtime, so you do not control the underlying operating system.',
      'This is the correct option.',
      'FaaS (serverless functions) abstracts even the hosting environment away from you — you only write the function code, giving less infra control than IaaS.',
    ],
    beginnerAnalogy:
      'Think of renting a kitchen. IaaS = you rent an empty kitchen and bring your own appliances, ingredients, and recipes — total control. PaaS = the kitchen comes pre-equipped with ovens; you just cook. SaaS = you order a finished meal from the menu.',
  },
  {
    id: 'cc2',
    topic: 'cloud-concepts',
    question:
      'What is the primary benefit of the "pay-as-you-go" pricing model in cloud computing?',
    options: [
      'Guaranteed fixed monthly costs for budgeting',
      'You only pay for the resources you actually use',
      'Unlimited free resources for all users',
      'Lower costs than on-premises in every scenario',
    ],
    correctIndex: 1,
    whyCorrect:
      'Pay-as-you-go means you are billed for the compute, storage, and network resources you consume, which avoids the upfront capital expense of buying hardware and lets you scale spending with demand.',
    whyWrong: [
      'Pay-as-you-go is the opposite of fixed costs — your bill varies with usage.',
      'This is the correct option.',
      'No cloud is truly free; pay-as-you-go still incurs charges, just metered.',
      'The cloud is not always cheaper than on-premises — poorly managed cloud spend can exceed on-prem costs.',
    ],
    beginnerAnalogy:
      'It is like a taxi meter — you only pay for the distance you actually travel, rather than buying a whole car and paying for it even when it sits in the garage.',
  },
  {
    id: 'cc3',
    topic: 'cloud-concepts',
    question: 'Which statement best describes the "shared responsibility" model?',
    options: [
      'The cloud provider is responsible for everything, including your data',
      'The customer is responsible for everything, including physical security',
      'Responsibilities are split: the provider secures the cloud, the customer secures what they put in it',
      'Both parties are jointly liable for all compliance certifications',
    ],
    correctIndex: 2,
    whyCorrect:
      'Microsoft secures the physical datacenters, hosts, and network, while you secure your data, identities, and configurations. The split shifts depending on the service model (IaaS vs SaaS).',
    whyWrong: [
      'The provider never takes responsibility for your data or access controls — that stays with you.',
      'Physical security of the datacenter is the provider\'s job, not the customer\'s.',
      'This is the correct option.',
      'Compliance is a shared effort, but responsibilities are specifically divided by layer, not jointly merged.',
    ],
    beginnerAnalogy:
      'Imagine renting an apartment. The landlord fixes the building structure, plumbing, and locks on the front door. You are responsible for locking your own door, what you keep inside, and who you give a key to.',
  },
  {
    id: 'cc4',
    topic: 'cloud-concepts',
    question: 'Which of these is an example of CapEx (capital expenditure)?',
    options: [
      'Monthly Azure virtual machine usage charges',
      'Paying for a new on-premises server rack up front',
      'Azure Storage billing per gigabyte used',
      'Paying per SQL database hour on Azure',
    ],
    correctIndex: 1,
    whyCorrect:
      'CapEx is spending money up front on physical assets that depreciate over time — buying server hardware is a classic capital expenditure.',
    whyWrong: [
      'Pay-as-you-go cloud usage charges are OpEx (operational expenditure), not CapEx.',
      'This is the correct option.',
      'Metered storage billing is OpEx — you pay as you consume it, with no upfront asset purchase.',
      'Per-hour database billing is OpEx for the same reason.',
    ],
    beginnerAnalogy:
      'CapEx is like buying a car outright — a big one-time purchase you own. OpEx is like leasing or paying per ride — smaller ongoing costs with no owned asset.',
  },
  {
    id: 'cc5',
    topic: 'cloud-concepts',
    question: 'Which cloud benefit allows you to add resources quickly when demand spikes?',
    options: ['Elasticity', 'Predictability', 'Reliability', 'Security'],
    correctIndex: 0,
    whyCorrect:
      'Elasticity is the ability to automatically add or remove resources to match current demand — scaling out under load and scaling in when demand drops.',
    whyWrong: [
      'This is the correct option.',
      'Predictability refers to consistent performance and cost forecasting, not scaling on demand.',
      'Reliability is about uptime and resilience, not the ability to scale.',
      'Security protects resources but does not change capacity with demand.',
    ],
    beginnerAnalogy:
      'Elasticity is like a rubber band that stretches when you need it bigger and shrinks back when you do not — your resources flex with demand.',
  },
  {
    id: 'cc6',
    topic: 'cloud-concepts',
    question: 'A "public cloud" is best described as:',
    options: [
      'Cloud infrastructure operated solely for one organization',
      'Cloud services owned by a provider and shared over the public internet by many tenants',
      'A private datacenter connected to the internet',
      'A hybrid of on-premises and cloud resources',
    ],
    correctIndex: 1,
    whyCorrect:
      'A public cloud (like Azure) is owned by a provider, hosted in their datacenters, and delivered over the public internet to many customers who share the underlying hardware via multitenancy.',
    whyWrong: [
      'Infrastructure operated for one organization describes a private cloud.',
      'This is the correct option.',
      'A private datacenter on its own is just on-premises hosting, not a public cloud model.',
      'A hybrid cloud combines public and private, so it is not the definition of a public cloud.',
    ],
    beginnerAnalogy:
      'A public cloud is like public transport — one big system many people share. A private cloud is like owning your own car. Hybrid is owning a car but also taking the bus sometimes.',
  },
  {
    id: 'cc7',
    topic: 'cloud-concepts',
    question:
      'Which pricing advantage does the cloud offer versus traditional on-premises datacenters?',
    options: [
      'Eliminates the need for any IT staff',
      'Removes all security responsibilities from the customer',
      'Reduces upfront capital expense by converting it to operational expense',
      'Guarantees zero downtime for all applications',
    ],
    correctIndex: 2,
    whyCorrect:
      'By renting resources instead of buying hardware, you shift spend from CapEx (upfront asset purchase) to OpEx (ongoing usage cost), improving cash flow and flexibility.',
    whyWrong: [
      'The cloud still needs IT staff for configuration, governance, and operations — it does not eliminate them.',
      'Security is shared; the customer always owns part of the responsibility.',
      'This is the correct option.',
      'No cloud can guarantee zero downtime — even with high SLAs, outages happen.',
    ],
    beginnerAnalogy:
      'Instead of buying a $20,000 server today, you rent computing power for a few dollars an hour — like renting a hotel room instead of building a house.',
  },

  // ───────────── ARCHITECTURE & CORE SERVICES ─────────────
  {
    id: 'ac1',
    topic: 'architecture-core-services',
    question: 'Which Azure service provides managed virtual machines on demand?',
    options: [
      'Azure Functions',
      'Azure Virtual Machines',
      'Azure Blob Storage',
      'Azure Key Vault',
    ],
    correctIndex: 1,
    whyCorrect:
      'Azure Virtual Machines is the IaaS offering that lets you deploy Windows or Linux VMs and fully control the OS and software running on them.',
    whyWrong: [
      'Azure Functions is serverless (FaaS) — you run code without managing any VM.',
      'This is the correct option.',
      'Blob Storage stores unstructured data objects, not virtual machines.',
      'Key Vault stores secrets and keys, not compute instances.',
    ],
    beginnerAnalogy:
      'A VM is like renting a fully configurable computer in the cloud — you choose the operating system, install software, and use it however you want.',
  },
  {
    id: 'ac2',
    topic: 'architecture-core-services',
    question: 'Azure regions are organized into groups of what?',
    options: ['Availability zones', 'Resource groups', 'Subscriptions', 'Management groups'],
    correctIndex: 0,
    whyCorrect:
      'An Azure region contains one or more availability zones — physically separate datacenters with independent power, cooling, and networking for resiliency.',
    whyWrong: [
      'This is the correct option.',
      'Resource groups are logical containers for resources, not geographic datacenter groupings.',
      'Subscriptions are billing/administrative boundaries, not physical datacenter groupings.',
      'Management groups organize subscriptions hierarchically, not datacenters within a region.',
    ],
    beginnerAnalogy:
      'A region is a city. Availability zones are different neighborhoods in that city, each with its own power grid — if one neighborhood loses power, the others keep running.',
  },
  {
    id: 'ac3',
    topic: 'architecture-core-services',
    question:
      'Which Azure service is best for storing massive amounts of unstructured data like images and videos?',
    options: [
      'Azure SQL Database',
      'Azure Blob Storage',
      'Azure Queue Storage',
      'Azure Files',
    ],
    correctIndex: 1,
    whyCorrect:
      'Blob Storage is optimized for unstructured object data (images, video, documents, backups) and can store petabytes at low cost with tiering options.',
    whyWrong: [
      'SQL Database is for structured relational data with schemas, not loose media files.',
      'This is the correct option.',
      'Queue Storage holds messages for asynchronous processing, not large media objects.',
      'Azure Files provides shared file shares (SMB/NFS) for mounted file systems, not object storage.',
    ],
    beginnerAnalogy:
      'Blob Storage is like a giant self-storage warehouse — you throw in boxes of any shape or size (photos, videos) and grab them back by a unique label.',
  },
  {
    id: 'ac4',
    topic: 'architecture-core-services',
    question:
      'What is the main purpose of Azure Resource Manager (ARM)?',
    options: [
      'To monitor application performance',
      'To provide a unified deployment and management layer for Azure resources',
      'To store encryption keys',
      'To handle user authentication only',
    ],
    correctIndex: 1,
    whyCorrect:
      'ARM is the control plane that receives every request (portal, CLI, REST, SDK) and deploys, manages, and secures resources consistently via resource groups and templates.',
    whyWrong: [
      'Application performance monitoring is the job of Azure Monitor / Application Insights, not ARM.',
      'This is the correct option.',
      'Key storage is handled by Key Vault, not ARM itself.',
      'Authentication is Azure Entra ID\'s job; ARM uses identities but does not authenticate users itself.',
    ],
    beginnerAnalogy:
      'ARM is like the front desk at a hotel — every request to create, change, or remove a room goes through it, so everything stays organized and tracked.',
  },
  {
    id: 'ac5',
    topic: 'architecture-core-services',
    question:
      'Which Azure compute option runs code without you managing servers or VMs, scaling automatically?',
    options: [
      'Azure Virtual Machines',
      'Azure Kubernetes Service (AKS)',
      'Azure Functions',
      'Azure App Service (always-on plan)',
    ],
    correctIndex: 2,
    whyCorrect:
      'Azure Functions is a serverless FaaS offering where you upload code and Azure handles scaling, routing, and infrastructure — you only pay while the function runs.',
    whyWrong: [
      'Virtual Machines require you to provision, patch, and manage the OS yourself.',
      'AKS is a managed Kubernetes container platform — you still manage cluster nodes and container orchestration.',
      'This is the correct option.',
      'App Service is a managed PaaS web host but is not serverless — you choose a plan and manage app scaling.',
    ],
    beginnerAnalogy:
      'With Functions, you hand Azure a recipe and it does all the cooking — no need to rent the kitchen, hire a chef, or plan capacity.',
  },
  {
    id: 'ac6',
    topic: 'architecture-core-services',
    question: 'An Azure region pair is best described as:',
    options: [
      'Two availability zones within the same region',
      'Two regions in the same geography paired for replication and failover',
      'Two subscriptions linked for billing',
      'A public and private cloud combined',
    ],
    correctIndex: 1,
    whyCorrect:
      'Azure pairs each region with another in the same geography (e.g., East US paired with West US) so services can replicate data and fail over for disaster recovery, with at least 300 miles of separation.',
    whyWrong: [
      'Availability zones are inside a single region, not a regional pair across geographies.',
      'This is the correct option.',
      'Subscriptions are not paired for disaster recovery — they are billing/admin containers.',
      'Combining public and private clouds is a hybrid cloud, not a region pair.',
    ],
    beginnerAnalogy:
      'A region pair is like having a backup office in a different city — if a flood hits one, your team keeps working from the other with all the same documents.',
  },
  {
    id: 'ac7',
    topic: 'architecture-core-services',
    question: 'Which Azure service is a fully managed relational database with PaaS features?',
    options: [
      'Azure SQL Database',
      'Azure Blob Storage',
      'Azure Data Lake Storage',
      'Azure Virtual Machines',
    ],
    correctIndex: 0,
    whyCorrect:
      'Azure SQL Database is a PaaS relational database that Microsoft manages — patching, backups, and high availability are built in.',
    whyWrong: [
      'This is the correct option.',
      'Blob Storage holds unstructured objects, not relational tables with SQL queries.',
      'Data Lake Storage is for big-data analytics file storage, not a transactional SQL database.',
      'A VM gives you compute; you would have to install and manage SQL Server yourself, so it is not PaaS for the database.',
    ],
    beginnerAnalogy:
      'Azure SQL Database is like a fully serviced apartment — the building manager handles repairs, cleaning, and security. You just move in and use it.',
  },

  // ───────────── MANAGEMENT & GOVERNANCE ─────────────
  {
    id: 'mg1',
    topic: 'management-governance',
    question:
      'Which Azure service lets you set rules that automatically stop non-compliant resources from being created?',
    options: ['Azure Policy', 'Azure Advisor', 'Azure Monitor', 'Azure Cost Management'],
    correctIndex: 0,
    whyCorrect:
      'Azure Policy evaluates resources against defined rules (e.g., allowed regions, required tags) and can deny non-compliant deployments or flag existing ones for remediation.',
    whyWrong: [
      'This is the correct option.',
      'Azure Advisor gives recommendations for best practices but does not enforce or block deployments.',
      'Azure Monitor collects telemetry and alerts but does not enforce compliance rules.',
      'Cost Management analyzes spend but does not block resource creation based on policy.',
    ],
    beginnerAnalogy:
      'Azure Policy is like a building inspector with a checklist — they will stop construction if the plans do not meet code, before the building goes up.',
  },
  {
    id: 'mg2',
    topic: 'management-governance',
    question: 'What is the role of Azure role-based access control (RBAC)?',
    options: [
      'To encrypt data at rest',
      'To manage fine-grained access to Azure resources for users and groups',
      'To monitor network traffic for threats',
      'To automatically scale resources',
    ],
    correctIndex: 1,
    whyCorrect:
      'RBAC assigns roles (Owner, Contributor, Reader, custom roles) to users/groups at scopes (subscription, resource group, resource) to control who can do what.',
    whyWrong: [
      'Encryption at rest is handled by Azure Storage encryption and Key Vault, not RBAC.',
      'This is the correct option.',
      'Network threat monitoring is the job of Azure Firewall, Sentinel, and Network Watcher.',
      'Autoscaling is handled by Virtual Machine Scale Sets and autoscale rules, not access control.',
    ],
    beginnerAnalogy:
      'RBAC is like badges at a workplace — a Reader badge lets you look around, a Contributor badge lets you make changes, and an Owner badge lets you decide who else gets badges.',
  },
  {
    id: 'mg3',
    topic: 'management-governance',
    question: 'Which Azure service provides personalized best-practice recommendations?',
    options: ['Azure Advisor', 'Azure Policy', 'Azure Blueprints', 'Azure DevOps'],
    correctIndex: 0,
    whyCorrect:
      'Azure Advisor scans your subscription and gives free, personalized recommendations across cost, security, reliability, performance, and operational excellence.',
    whyWrong: [
      'This is the correct option.',
      'Azure Policy enforces rules; it does not suggest best practices.',
      'Blueprints packages artifacts (policies, ARM templates, roles) for repeatable environments, not recommendations.',
      'Azure DevOps is a CI/CD toolchain, not a recommendation engine.',
    ],
    beginnerAnalogy:
      'Azure Advisor is like a financial advisor who reviews your accounts and suggests where to save money or reduce risk — you act on the advice you like.',
  },
  {
    id: 'mg4',
    topic: 'management-governance',
    question:
      'What does a resource group allow you to do as a single lifecycle unit?',
    options: [
      'Monitor individual user sign-ins',
      'Manage, deploy, and delete resources together that share a lifecycle',
      'Encrypt virtual machines at rest',
      'Route traffic between regions',
    ],
    correctIndex: 1,
    whyCorrect:
      'A resource group is a logical container holding related resources; you can deploy, update, and delete them as a group, and apply RBAC and policies at that scope.',
    whyWrong: [
      'User sign-in monitoring is Azure AD / Entra ID sign-in logs, not a resource group feature.',
      'This is the correct option.',
      'Encryption is a storage/account-level setting, not a resource-group capability.',
      'Traffic routing is handled by Traffic Manager or Azure Front Door, not resource groups.',
    ],
    beginnerAnalogy:
      'A resource group is like a folder on your desk — everything related to one project goes in it, so when the project ends you can clear the whole folder in one move.',
  },
  {
    id: 'mg5',
    topic: 'management-governance',
    question:
      'Which Azure service helps you set spending limits and forecast cloud costs?',
    options: [
      'Azure Cost Management + Billing',
      'Azure Monitor',
      'Azure Advisor',
      'Azure Policy',
    ],
    correctIndex: 0,
    whyCorrect:
      'Azure Cost Management lets you analyze spend, set budgets, configure alerts when spending approaches limits, and forecast future costs.',
    whyWrong: [
      'This is the correct option.',
      'Azure Monitor tracks performance and health telemetry, not financial budgets.',
      'Advisor may suggest cost savings, but budgeting and forecasting are Cost Management\'s job.',
      'Policy enforces compliance rules, not financial budgets.',
    ],
    beginnerAnalogy:
      'Cost Management is like your phone\'s data-usage app — it shows what you have used, warns you before you go over your plan, and predicts next month\'s bill.',
  },
  {
    id: 'mg6',
    topic: 'management-governance',
    question:
      'Which governance artifact bundles policies, RBAC role assignments, and ARM templates for repeatable environment creation?',
    options: ['Azure Blueprints', 'Azure Advisor', 'Azure DevOps Boards', 'Azure Sentinel'],
    correctIndex: 0,
    whyCorrect:
      'Azure Blueprints packages a set of artifacts (policies, role assignments, ARM templates) so you can create compliant environments repeatedly and consistently.',
    whyWrong: [
      'This is the correct option.',
      'Advisor gives recommendations but does not bundle deployment artifacts.',
      'DevOps Boards is a work-tracking tool, not an environment-composition tool.',
      'Sentinel is a SIEM security platform, not a governance blueprint tool.',
    ],
    beginnerAnalogy:
      'A Blueprint is like a recipe card — it lists all the ingredients (policies, roles, templates) so every cook can produce the exact same dish.',
  },
  {
    id: 'mg7',
    topic: 'management-governance',
    question:
      'Which Azure service centralizes log analytics and alerts across many resources?',
    options: ['Azure Monitor', 'Azure Policy', 'Azure Key Vault', 'Azure CDN'],
    correctIndex: 0,
    whyCorrect:
      'Azure Monitor collects metrics and logs from Azure and on-premises resources, runs analytics with Log Analytics, and triggers alerts based on conditions.',
    whyWrong: [
      'This is the correct option.',
      'Policy enforces compliance but does not aggregate telemetry or raise alerts.',
      'Key Vault stores secrets — it does not centralize logs across resources.',
      'CDN caches content at edge locations; it is not a monitoring service.',
    ],
    beginnerAnalogy:
      'Azure Monitor is like a security-camera control room — feeds from all your cameras (resources) come into one screen, and alarms go off when something looks wrong.',
  },
];
