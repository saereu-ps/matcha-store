# Units of Work

## Summary
- **Units**: 10 units — Design System, Product Configuration, User & Identity, Subscription Engine, AI Personalization, Educational Platform, Loyalty & Gamification, Cart & Checkout, Internationalization, Admin & Operations
- **Strategy**: Domain-Driven (bounded contexts with microservice architecture)
- **Architecture**: Microservices — independently deployable, event-driven, shared kernel for contracts
- **Story Distribution**: Design System: 3, Product Config: 5, User & Identity: 4, Subscription: 4, AI Personalization: 3, Educational: 4, Loyalty: 3, Cart & Checkout: 3, Internationalization: 2, Admin: 5, Search (cross-cutting): 3
- **Key Dependencies**: All units → Shared Kernel; User → Product, Subscription, Loyalty; Cart → Product, Subscription; AI → All units (event consumer)
- **Development Sequence**: Phase 1: Foundation (shared kernel + design system); Phase 2: All domain units in parallel

## Overview
Feature decomposed into 10 bounded context units for maximum parallel development by a medium team (4-8 developers). Each unit is independently deployable with its own data store, communicating via domain events and well-defined API contracts.

**Strategy**: Domain-Driven Decomposition
**Rationale**: 38 stories naturally cluster into 10 distinct business domains with clear data ownership boundaries. Microservice architecture enables the team to develop, test, and deploy each unit independently while domain events maintain loose coupling.

---

## Unit 1: Design System (matcha-design-system)

**Purpose**: Centralized component library providing the immersive UI foundation — animation primitives, 3D viewer components, kinetic typography, micro-interaction hooks, theming (dark/light), custom cursor, ambient sound engine, and responsive layout system.
**Priority**: High (foundational — all units depend on it)
**Complexity**: High
**Stories**: 3 stories — US-028, US-029, US-030

### Commands
| Command | Description | Actor |
|---------|-------------|-------|
| SetTheme | Switch between dark/light mode | User |
| ToggleSound | Enable/disable ambient sound | User |
| SetReducedMotion | Disable animations for accessibility | System/User |

### Domain Model
**Aggregates**: ThemeConfiguration (root: ThemeConfig)
**Entities**: ComponentVariant, AnimationSequence
**Value Objects**: ColorToken, SpacingToken, TypographyScale, AnimationCurve, SoundAsset

### Domain Events
**Publishes**: ThemeChanged, ReducedMotionEnabled, SoundToggled
**Subscribes**: UserPreferenceUpdated from User & Identity — sync theme/sound preferences

### Dependencies
| Depends On | Type | Description |
|------------|------|-------------|
| Shared Kernel | Data | Design tokens, component interfaces |

---

## Unit 2: Product Configuration (matcha-product)

**Purpose**: Multi-dimensional product catalog with variant matrix (grade × origin × cultivar × harvest × grind × weight × packaging), real-time pricing engine, comparison tools, and full provenance data.
**Priority**: High (core domain — cart, subscriptions, and personalization depend on it)
**Complexity**: Very High
**Stories**: 5 stories — US-001, US-002, US-003, US-004, US-036

### Commands
| Command | Description | Actor |
|---------|-------------|-------|
| BrowseProducts | Query catalog with faceted filters | User |
| ConfigureVariant | Step through configuration wizard | User |
| CompareProducts | Add/remove products from comparison | User |
| SearchProducts | Full-text search with Algolia | User |
| IndexProduct | Sync product data to search index | System |

### Domain Model
**Aggregates**: Product (root: Product), VariantMatrix (root: VariantConfiguration)
**Entities**: Product, ProductVariant, Category, Origin, Cultivar
**Value Objects**: Grade (Ceremonial/Premium/Culinary), FlavorProfile (radar chart values), HarvestDate, Elevation, Price, Money, StockLevel, SKU

### Domain Events
**Publishes**: ProductCreated, ProductUpdated, VariantStockChanged, PriceUpdated, ProductIndexed
**Subscribes**: OrderPlaced from Cart & Checkout — decrement stock; SubscriptionRenewed from Subscription — reserve stock

### Dependencies
| Depends On | Type | Description |
|------------|------|-------------|
| Shared Kernel | Data | ProductId, Money, SKU value objects |
| Design System | UI | Product cards, comparison grid, configuration wizard components |

---

## Unit 3: User & Identity (matcha-user)

**Purpose**: User registration, authentication (email + OAuth), taste profile management, tasting journal, verified reviews, referral program, and social sharing.
**Priority**: High (most units need user identity)
**Complexity**: High
**Stories**: 4 stories — US-022, US-023, US-024, US-025

### Commands
| Command | Description | Actor |
|---------|-------------|-------|
| RegisterUser | Create account with email or OAuth | User |
| LoginUser | Authenticate and restore session | User |
| UpdateTasteProfile | Save/update taste quiz results | User |
| CreateJournalEntry | Log tasting notes with flavor wheel | User |
| WriteReview | Submit verified purchase review | User |
| GenerateReferralLink | Create unique referral code | User |

### Domain Model
**Aggregates**: User (root: User), TastingJournal (root: Journal), Review (root: Review)
**Entities**: User, TasteProfile, JournalEntry, Review, ReferralAccount
**Value Objects**: UserId, Email, FlavorWheel (umami/sweet/vegetal/body scores), FlavorTag, ReferralCode, VerifiedPurchaseBadge

### Domain Events
**Publishes**: UserRegistered, UserLoggedIn, TasteProfileUpdated, JournalEntryCreated, ReviewPublished, ReferralUsed
**Subscribes**: OrderCompleted from Cart & Checkout — enable review for purchased products; LoyaltyPointsAwarded from Loyalty — update user dashboard

### Dependencies
| Depends On | Type | Description |
|------------|------|-------------|
| Shared Kernel | Data | UserId, Email value objects, auth contracts |
| Product Configuration | API | Product details for journal entries and reviews |
| Design System | UI | Profile components, journal UI, review forms |

---

## Unit 4: Subscription Engine (matcha-subscription)

**Purpose**: Smart subscription lifecycle — setup, cadence management (skip/swap/pause/cancel), predictive cadence adjustment, gift subscriptions, billing integration, win-back automation, and subscription analytics data emission.
**Priority**: High (core differentiator)
**Complexity**: Very High
**Stories**: 4 stories — US-008, US-009, US-010, US-011

### Commands
| Command | Description | Actor |
|---------|-------------|-------|
| CreateSubscription | Set up new recurring subscription | User |
| SkipDelivery | Skip next delivery (1-click) | User |
| SwapProduct | Change product in next delivery | User |
| PauseSubscription | Temporarily halt deliveries | User |
| CancelSubscription | End subscription (with retention flow) | User |
| AdjustCadence | Change delivery frequency | User/System |
| CreateGiftSubscription | Purchase subscription for recipient | User |
| ProcessRenewal | Charge and create delivery order | System |
| TriggerWinBack | Send win-back offer to at-risk subscriber | System |

### Domain Model
**Aggregates**: Subscription (root: Subscription), GiftSubscription (root: GiftSubscription)
**Entities**: Subscription, SubscriptionItem, DeliverySchedule, GiftSubscription, CadencePrediction
**Value Objects**: SubscriptionId, Cadence (frequency in days), BillingCycle, SubscriptionStatus (active/paused/cancelled/gifted), ChurnRiskScore

### Domain Events
**Publishes**: SubscriptionCreated, SubscriptionPaused, SubscriptionCancelled, SubscriptionRenewed, DeliverySkipped, ProductSwapped, CadenceAdjusted, GiftSubscriptionStarted, ChurnRiskDetected, WinBackTriggered
**Subscribes**: PaymentSucceeded from Cart & Checkout — confirm renewal; PaymentFailed — retry/notify; UserBehaviorTracked from AI — update churn risk; LoyaltyTierChanged from Loyalty — apply tier benefits

### Dependencies
| Depends On | Type | Description |
|------------|------|-------------|
| Shared Kernel | Data | UserId, ProductId, Money, SubscriptionId |
| User & Identity | API | User authentication, profile for gift recipient onboarding |
| Product Configuration | API | Product details, variant availability for swaps |
| Cart & Checkout | Event | Payment processing for renewals |
| Design System | UI | Subscription dashboard, cadence controls |

---

## Unit 5: AI Personalization (matcha-ai)

**Purpose**: ML-powered personalization — taste profile quiz engine, hybrid recommendation model (collaborative + content-based), adaptive homepage, predictive restock, behavior tracking pipeline, and A/B experimentation framework.
**Priority**: Medium (enhances experience but not blocking for core flow)
**Complexity**: Very High
**Stories**: 3 stories — US-005, US-006, US-007

### Commands
| Command | Description | Actor |
|---------|-------------|-------|
| GenerateTasteProfile | Process quiz answers into flavor vector | System |
| GetRecommendations | Fetch personalized product list | System |
| TrackBehavior | Record user interaction event | System |
| PredictRestock | Calculate depletion date for user | System |
| CreateExperiment | Set up A/B test variant allocation | Admin |

### Domain Model
**Aggregates**: RecommendationModel (root: Model), UserBehaviorProfile (root: BehaviorProfile)
**Entities**: TasteVector, BehaviorEvent, Experiment, ExperimentVariant
**Value Objects**: FlavorVector (4D), RecommendationScore, ConfidenceLevel, ExperimentId, VariantAllocation

### Domain Events
**Publishes**: RecommendationsGenerated, RestockPredicted, ExperimentConcluded, BehaviorProfileUpdated
**Subscribes**: TasteProfileUpdated from User — retrain preferences; ProductViewed/AddedToCart/Purchased from all units — behavior tracking; SubscriptionRenewed/Skipped from Subscription — usage pattern data

### Dependencies
| Depends On | Type | Description |
|------------|------|-------------|
| Shared Kernel | Data | UserId, ProductId, event schemas |
| User & Identity | API | Taste profile data, consent status |
| Product Configuration | API | Product attributes for content-based filtering |
| All Units | Event | Behavior events (views, clicks, purchases) for model training |
| Design System | UI | Quiz components, recommendation cards |

---

## Unit 6: Educational Platform (matcha-education)

**Purpose**: Interactive educational content — brewing guides with timers, 3D tea ceremony viewer, animated origin map with terroir data, video masterclasses, knowledge quizzes, and PWA offline support for content.
**Priority**: Medium (content differentiator, drives engagement)
**Complexity**: High
**Stories**: 4 stories — US-012, US-013, US-014, US-015

### Commands
| Command | Description | Actor |
|---------|-------------|-------|
| StartBrewingGuide | Begin step-by-step brewing session | User |
| StartTimer | Activate countdown timer at brew step | User |
| Load3DCeremony | Initialize Three.js tea ceremony scene | User |
| ExploreOriginMap | Open interactive Japan map | User |
| PlayMasterclass | Stream video content | User |
| CacheForOffline | Pre-cache content for PWA | System |

### Domain Model
**Aggregates**: BrewingGuide (root: Guide), CeremonyScene (root: Scene), OriginMap (root: MapRegion)
**Entities**: BrewingStep, CeremonyAnimation, MapRegion, Masterclass, Quiz
**Value Objects**: Duration, Temperature, WaterAmount, GrindSize, RegionCoordinates, TerriorData, VideoId

### Domain Events
**Publishes**: GuideCompleted, CeremonyViewed, RegionExplored, MasterclassCompleted, QuizCompleted
**Subscribes**: LoyaltyTierChanged from Loyalty — unlock exclusive masterclasses; ContentPublished from Admin — cache new content for PWA

### Dependencies
| Depends On | Type | Description |
|------------|------|-------------|
| Shared Kernel | Data | ContentId, ProductId (contextual links) |
| Product Configuration | API | Product references for contextual "Shop this" links |
| Loyalty & Gamification | Event | Achievement triggers (first brew, all origins explored) |
| Design System | UI | 3D viewer wrapper, animation system, timer components |

---

## Unit 7: Loyalty & Gamification (matcha-loyalty)

**Purpose**: Points system, tier progression (Novice → Enthusiast → Connoisseur → Master), achievements/badges, streak tracking, seasonal challenges, exclusive access control, and leaderboard.
**Priority**: Medium (retention driver, not blocking for core shopping)
**Complexity**: Medium
**Stories**: 3 stories — US-016, US-017, US-018

### Commands
| Command | Description | Actor |
|---------|-------------|-------|
| AwardPoints | Add points to user's loyalty account | System |
| RedeemPoints | Exchange points for reward | User |
| PromoteTier | Upgrade user to next tier | System |
| UnlockAchievement | Grant achievement badge | System |
| IncrementStreak | Update delivery streak counter | System |
| CreateChallenge | Set up seasonal challenge | Admin |

### Domain Model
**Aggregates**: LoyaltyAccount (root: LoyaltyAccount), Challenge (root: Challenge)
**Entities**: LoyaltyAccount, Achievement, Streak, Challenge, ChallengeProgress
**Value Objects**: Points, Tier (Novice/Enthusiast/Connoisseur/Master), AchievementBadge, StreakCount, TierThreshold

### Domain Events
**Publishes**: PointsAwarded, TierPromoted, TierDecayed, AchievementUnlocked, StreakBroken, ChallengeCompleted
**Subscribes**: OrderCompleted from Cart — award purchase points; SubscriptionRenewed from Subscription — award sub points + streak; GuideCompleted/MasterclassCompleted from Educational — award learning points; ReviewPublished from User — award engagement points

### Dependencies
| Depends On | Type | Description |
|------------|------|-------------|
| Shared Kernel | Data | UserId, Points, Tier value objects |
| User & Identity | API | User account for loyalty dashboard |
| Design System | UI | Tier badges, progress bars, achievement animations |

---

## Unit 8: Cart & Checkout (matcha-cart)

**Purpose**: Shopping cart supporting mixed items (one-time + subscription), multi-currency checkout, gift checkout flow with unboxing preview, international shipping/tax calculation, and payment processing via Stripe.
**Priority**: High (core commerce flow)
**Complexity**: High
**Stories**: 3 stories — US-019, US-020, US-021

### Commands
| Command | Description | Actor |
|---------|-------------|-------|
| AddToCart | Add configured product to cart | User |
| UpdateQuantity | Change item quantity | User |
| RemoveFromCart | Remove item from cart | User |
| ApplyPromoCode | Validate and apply discount | User |
| SetDeliveryAddress | Select/enter shipping address | User |
| CalculateShipping | Get rates from Shippo | System |
| CalculateTax | Determine regional tax | System |
| ProcessPayment | Charge via Stripe (single or subscription) | System |
| ConfirmOrder | Finalize order and trigger fulfillment | System |
| ConfigureGift | Set gift wrapping, message, schedule | User |

### Domain Model
**Aggregates**: Cart (root: Cart), Order (root: Order), GiftConfiguration (root: GiftConfig)
**Entities**: Cart, CartItem, Order, OrderItem, ShippingAddress, GiftConfiguration
**Value Objects**: CartId, OrderId, Money, Currency, TaxRate, ShippingRate, PromoCode, GiftMessage, DeliverySchedule

### Domain Events
**Publishes**: ItemAddedToCart, OrderPlaced, OrderCompleted, PaymentSucceeded, PaymentFailed, GiftOrderScheduled, RefundInitiated
**Subscribes**: VariantStockChanged from Product — validate cart items; SubscriptionCreated from Subscription — link subscription billing; CurrencyRateUpdated from Internationalization — recalculate prices

### Dependencies
| Depends On | Type | Description |
|------------|------|-------------|
| Shared Kernel | Data | ProductId, UserId, Money, Currency, OrderId |
| Product Configuration | API | Product details, variant pricing, stock validation |
| User & Identity | API | Auth, saved addresses, payment methods |
| Subscription Engine | API | Create subscription on checkout |
| Internationalization | API | Currency conversion, tax calculation, shipping rates |
| Design System | UI | Cart components, checkout steps, gift preview (3D) |

---

## Unit 9: Internationalization (matcha-i18n)

**Purpose**: Multi-language content delivery (EN, JA, expandable), multi-currency pricing with real-time exchange rates, region-specific shipping/tax rules, locale-aware formatting, and RTL-ready architecture.
**Priority**: Medium (required for launch in 2 markets)
**Complexity**: Medium
**Stories**: 2 stories — US-026, US-027

### Commands
| Command | Description | Actor |
|---------|-------------|-------|
| SetLocale | Change user's language/region | User |
| ConvertCurrency | Calculate price in target currency | System |
| UpdateExchangeRates | Refresh currency rates from API | System |
| CalculateRegionalTax | Determine tax for destination | System |
| CalculateShippingRates | Get rates for destination via Shippo | System |

### Domain Model
**Aggregates**: LocaleConfig (root: LocaleConfig), CurrencyRates (root: RateSet)
**Entities**: Locale, CurrencyRate, TaxRule, ShippingZone
**Value Objects**: LocaleCode, CurrencyCode, ExchangeRate, TaxRate, ShippingZoneId, TranslationKey

### Domain Events
**Publishes**: LocaleChanged, CurrencyRateUpdated, ShippingRatesRefreshed
**Subscribes**: UserRegistered from User — set default locale from browser; OrderPlaced from Cart — log currency used for analytics

### Dependencies
| Depends On | Type | Description |
|------------|------|-------------|
| Shared Kernel | Data | Money, Currency, LocaleCode value objects |
| Design System | UI | RTL layout support, locale switcher component |

---

## Unit 10: Admin & Operations (matcha-admin)

**Purpose**: Back-office platform — visual product configurator, subscription analytics dashboard, content CMS with live preview, A/B testing framework, inventory forecasting, customer insights, and SEO management.
**Priority**: High (required for platform operations)
**Complexity**: Very High
**Stories**: 5 stories — US-031, US-032, US-033, US-034, US-035, US-037

### Commands
| Command | Description | Actor |
|---------|-------------|-------|
| CreateProduct | Add product with variant matrix | Admin |
| UpdateProduct | Modify product details/pricing | Admin |
| BulkImportProducts | CSV upload with validation | Admin |
| CreateContent | Author educational/blog content | Admin |
| PublishContent | Make content live with SEO | Admin |
| CreateABTest | Configure experiment variants | Admin |
| EndABTest | Conclude test, apply winner | Admin |
| ViewForecast | Display demand projection | Admin |
| ViewSubscriptionHealth | Display MRR, churn, cohorts | Admin |

### Domain Model
**Aggregates**: AdminProduct (root: AdminProduct), ContentItem (root: Content), ABTest (root: Experiment), Forecast (root: DemandForecast)
**Entities**: AdminProduct, VariantMatrixConfig, Content, ContentBlock, Experiment, ExperimentResult, DemandForecast
**Value Objects**: SEOScore, PublishStatus, ExperimentStatus, ForecastWindow, ChurnRiskScore, MRR, CohortRetention

### Domain Events
**Publishes**: ProductPublished, ProductUpdated, ContentPublished, ExperimentStarted, ExperimentConcluded, ForecastGenerated, StockoutRiskDetected
**Subscribes**: OrderCompleted from Cart — update analytics; SubscriptionCreated/Cancelled from Subscription — update MRR/churn; BehaviorTracked from AI — A/B test results

### Dependencies
| Depends On | Type | Description |
|------------|------|-------------|
| Shared Kernel | Data | All core value objects, admin role contracts |
| Product Configuration | API | Product data for configurator |
| Subscription Engine | API | Subscription data for analytics |
| AI Personalization | API | Experiment framework, behavior data |
| Educational Platform | API | Content management integration |
| Design System | UI | Admin dashboard components, data viz |

---

## Context Map

| Upstream | Downstream | Pattern |
|----------|------------|---------|
| Shared Kernel | All Units | Shared Kernel |
| Design System | All Customer-Facing Units | Customer/Supplier |
| Product Configuration | Cart & Checkout | Customer/Supplier |
| Product Configuration | Subscription Engine | Customer/Supplier |
| Product Configuration | AI Personalization | Publisher/Subscriber |
| User & Identity | Cart & Checkout | Customer/Supplier |
| User & Identity | Subscription Engine | Customer/Supplier |
| User & Identity | Loyalty & Gamification | Customer/Supplier |
| User & Identity | AI Personalization | Customer/Supplier |
| Subscription Engine | Loyalty & Gamification | Publisher/Subscriber |
| Subscription Engine | Admin & Operations | Publisher/Subscriber |
| Cart & Checkout | Loyalty & Gamification | Publisher/Subscriber |
| Cart & Checkout | User & Identity | Publisher/Subscriber |
| Cart & Checkout | Admin & Operations | Publisher/Subscriber |
| Educational Platform | Loyalty & Gamification | Publisher/Subscriber |
| AI Personalization | All Customer-Facing Units | Anti-Corruption Layer |
| Internationalization | Cart & Checkout | Customer/Supplier |
| Internationalization | Product Configuration | Customer/Supplier |
| Admin & Operations | Product Configuration | Customer/Supplier |
| Admin & Operations | Educational Platform | Customer/Supplier |

---

## Development Sequence

### Phase 1: Foundation
- [ ] Shared Kernel — Core value objects, event schemas, API contracts, auth infrastructure
- [ ] Design System (matcha-design-system) — Component library, animation framework, 3D viewer, theming

### Phase 2: Core (Parallel)
- [ ] Product Configuration (matcha-product) — Catalog, variants, search
- [ ] User & Identity (matcha-user) — Auth, profiles, taste journal, reviews
- [ ] Cart & Checkout (matcha-cart) — Shopping flow, payments, gifts
- [ ] Subscription Engine (matcha-subscription) — Recurring billing, cadence, lifecycle
- [ ] Internationalization (matcha-i18n) — Multi-language, multi-currency

### Phase 3: Enrichment (Parallel)
- [ ] AI Personalization (matcha-ai) — Recommendations, predictions, experimentation
- [ ] Educational Platform (matcha-education) — Brewing guides, 3D, origin map, masterclasses
- [ ] Loyalty & Gamification (matcha-loyalty) — Points, tiers, achievements, streaks
- [ ] Admin & Operations (matcha-admin) — Dashboard, CMS, analytics, forecasting

---

## Integration Contracts (Sketches)

### Event Bus Schema
```
{
  eventId: UUID,
  eventType: string,           // e.g., "order.completed"
  source: string,              // unit name
  timestamp: ISO-8601,
  correlationId: UUID,
  payload: { ... }             // event-specific data
}
```

### Shared Authentication
```
JWT Token → { userId, email, roles[], tier, locale }
All inter-service calls carry the token for identity propagation.
```

### API Gateway Pattern
```
Client → API Gateway (BFF) → Routes to appropriate service
                           → Aggregates data from multiple services for complex views (e.g., homepage = Product + AI + Loyalty)
```
