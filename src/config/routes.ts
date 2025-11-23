/*-----------------------------------------------*
 *                                               *
 *                  App Routes                   *
 *                                               *
 ------------------------------------------------*/

// Protected Routes
export const ProtectedRoutes = ['/dashboard'];

// Apps
export const AppRoutes = ['auth', 'dashboard'];

// Auth
export const AuthRoutes = {
  Auth: '/auth',

  // Core Authentication
  SignIn: '/auth/signin',
  SignUp: '/auth/signup',
  SignOut: '/auth/signout',

  // Email Verification
  VerifyEmail: '/identify/verify-email',
  ResendVerification: '/identify/resend-verification',

  // Password Management
  ForgotPassword: '/auth/forgot-password', // NOSONAR

  // Account Management
  DeactivateAccount: '/auth/deactivate',
  DeleteAccount: '/auth/delete',
  Error: '/auth/error',
} as const;

export const AuthApiRoutes = {
  CheckUser: '/api/auth/check-user',
  Register: '/api/auth/register',
  Refresh: '/api/auth/refresh',
  Session: '/api/auth/session',
  SignOut: '/api/auth/signout',
  ResendVerification: '/api/auth/resend-verification',
} as const;

export const UserRoutes = {
  Dashboard: '/dashboard',
  // Profile Management
  Profile: '/dashboard/account/profile',
  // Preferences
  Settings: '/dashboard/settings',
  UpgradePlan: '/dashboard/upgrade-plan',
} as const;

// Pages
export const PageRoutes = {
  // Main Nav
  Home: '/',
  Buy: '/buy',
  Rent: '/rent',
  Sale: '/sale',
  Holidays: '/holidays',
  NewProjects: '/new-projects',
  FindAgent: '/find-agent',
  FindBroker: '/find-broker',
  Trends: '/trends',
  Mortgage: '/mortgage',
  Events: '/events',

  // App Pages
  Search: '/search',
  Property: '/property',
  Agent: '/agent',
  Reviews: '/reviews',
  Faqs: '/faqs',
  Countries: '/countries',
  Pricing: '/pricing',

  // Ajrly
  About: '/about',
  BecomePartner: '/partner',
  Jobs: '/jobs',

  Contact: '/contact',
  Feedback: '/feedback',
  Advertising: '/advertising',

  // Policies
  PoliciesCenter: '/policies-center',
  Terms: '/terms',
  PrivacyPolicy: '/privacy',
  CookiesPolicy: '/cookies-policy',
  DataPrivacy: '/data-privacy',
  UserAgreement: '/user-agreement',
  Accessibility: '/accessibility',

  SiteMap: '/sitemap.xml',
} as const;

export const OtherRoutes = {
  Blog: 'https://blog.ajrly.com',
  HelpCenter: 'https://support.ajrly.com',
} as const;
