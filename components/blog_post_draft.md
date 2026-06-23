# Keep This Vibe
### Analyzing 8.7 Million Songs to Validate a Simple Feature for Spotify's AI DJ

*How I used the full PM cycle to take a personal frustration, stress-test it with data, prototype a solution, and learn that the honest answer is more useful than the optimistic one.*

---

## The Problem

You are twenty minutes into a drive. Spotify's DJ X has been nailing it. You have settled into a groove of disco house, everything is clicking, and then you hear it: "Let's switch things up a bit." The energy drops. You go from disco to melancholic rock. Your vibe is gone. So you skip. Skip again. After a few songs of trying to recapture the same mood, you leave DJ X entirely and go find a playlist.

This happened to me constantly. And when I asked friends, the reaction was always immediate: "Yeah, I hate that."

The frustration was real. But frustration alone is not a product. I wanted to know: is this solvable? Would the data support it? And if I built it, would it actually work?

---

## Why This Problem

Music is something I care deeply about, and Spotify is a platform I have used for over a decade. For a project like this, I wanted to work on something I would genuinely want to use. In this case, that meant improving how Spotify's recommendation engine handles continuity. Because sometimes it misses the mark, not by suggesting bad songs, but by breaking a streak you did not want broken.

I also needed to see past Spotify's existing recommendation biases. I have used the platform long enough to notice the nuances. Song radio, for example, leans heavily on your existing history. Spotify has released features over time that discount personalization, but they are not particularly accessible. The feature I started thinking about sits in that same space: relying on the pure recommendation engine, stripped of personal bias, and putting it to work for a short, focused period.

---

## The Approach

I will acknowledge upfront that this is a little different from how Spotify PMs would ordinarily operate. Usually the data science team delivers the sophisticated analysis, and PMs shape a feature or product around it. Or vice versa, the PM has an inclination for a feature, and data science helps validate it. For this project, I tackled the entire stack, with Claude as my partner.

The dataset I found was a public collection of 8.7 million Spotify tracks with full audio feature metadata: energy, valence (musical positivity), danceability, acousticness, tempo, loudness, and more. Nine features per song, across nearly the entire catalog. It came in SQLite format, which I had genuinely never worked with before. That turned out to be the smallest challenge by far.

---

## The Hypothesis

Using the audio features table that assigns a measurable characteristic to every song, I could build a clustering model to group songs and recommend the closest possible "vibe" to a given track. This would later enable a "Keep This Vibe" feature when using DJ X, where one tap locks the system to your current groove.

The formal version: by leveraging high-dimensional audio metadata to create a nearest-neighbors model, we can identify vibe-consistent tracks with higher precision than genre tags alone. Implementing a "Keep This Vibe" toggle in the AI DJ would increase session length and decrease skip rate, as users would no longer need to manually curate their queue to maintain atmospheric consistency.

---

## Starting With the Data, Not the Solution

Over my career, I have had to learn the painful lesson of not jumping to a solution first. So I started with a question: do Spotify's audio features contain enough signal to define what "vibe" even means?

Before building anything, I needed to understand the data. What does a typical song look like? Which features actually differentiate songs from each other? Are there meaningful clusters, or is the feature space just noise? Only by knowing this could I accurately gauge vibe. This statistical analysis phase ended up being the most important step in the entire project.

### Data Cleaning

The raw dataset had 8,740,043 tracks. Before analysis, I ran a cleaning pass:

- **Loudness clamping.** The raw data had a max loudness of 6.28 dB, which is physically impossible for digital audio. All values above 0 dB were clamped.
- **Extraction failure filtering.** 34,764 tracks had a tempo of zero. 34,979 had a time signature of zero. These are artifacts of Spotify's audio analysis pipeline failing on certain tracks, not actual musical properties. All were removed.

Total records dropped: 34,979 (0.40% of the dataset). That left 8,705,064 pristine tracks for analysis. A small price to prevent zero-value tracks from skewing vector distances downstream.

---

## What the Data Told Me

### Phase 1: Understanding the Feature Space

The first question was basic: do Spotify's audio features actually mean anything?

Every single audio feature significantly predicts genre (ANOVA, p close to 0 for all nine). Classical music has a distinct audio fingerprint from hip-hop, which looks different from electronic, which looks different from rock. If the features were noise, the entire concept would have been dead on arrival. They are not.

The distributions told me what "normal" looks like. Danceability, energy, and valence are healthy bell curves centered around 0.5. Speechiness is severely right-skewed, with almost all songs near zero. That makes sense: most music is singing, not spoken word. Instrumentalness is bimodal. Songs are either vocal or instrumental, rarely in between. These shapes matter because they tell you which features will actually differentiate songs and which are just background noise.

> **[IMAGE: `plots/01_distributions.png`]** Feature distributions across 8.7M tracks.

The correlation analysis revealed structure. Energy and loudness are tightly linked (r = +0.79). Acousticness and energy are inversely correlated (r = -0.75). These three form an "intensity" cluster: they are partially redundant. But most other features are fairly independent, meaning each one adds unique information to the vibe vector. Danceability and valence have a moderate positive correlation, which makes intuitive sense: danceable songs tend to be happier.

> **[IMAGE: `plots/02_correlation_heatmap.png`]** Correlation heatmap. The energy/loudness/acousticness cluster is visible in the top-left.

PCA confirmed this: five principal components capture roughly 82% of the variance, with a clear "intensity" axis (PC1) and a "mood" axis (PC2, driven by valence and danceability).

> **[IMAGE: `plots/04_pca_analysis.png`]** Scree plot and cumulative variance. The elbow at 5 components and the two dominant axes.

The most important output: ranking features by importance. The top three were valence, acousticness, and danceability. These are perceptual features. They map to how a song *feels*, not just how it sounds. This directly informed the weighting scheme: give the "feel" features more influence in similarity calculations.

> **[IMAGE: `plots/05_feature_importance.png`]** Feature importance rankings across three methods.

> **[IMAGE: `plots/06_genre_radar.png`]** Genre radar charts. Each genre has a visibly distinct audio fingerprint.

### Implications for the Model

The statistical findings pointed clearly:
- **Use all 9 continuous features.** Low inter-correlation means each adds unique signal.
- **Perceptual weighting makes sense.** Valence, energy, and danceability are the most vibe-relevant features and should carry more weight.
- **StandardScaler is necessary.** Loudness ranges from -60 to 0 dB while danceability ranges from 0 to 1. Without normalization, loudness would dominate every distance calculation.
- **Genre can validate but cannot replace audio features.** 70% of artists in the dataset lack genre tags entirely.

### Phase 2: Proving Similarity Search Works

Knowing the features carry signal is not the same as knowing you can search by similarity at scale. I built a 12-dimensional vibe index across all 8.7M tracks and stress-tested it.

**The vibe space is dense and well-behaved.** The median nearest-neighbor distance is just 0.066. At rank 20, the median distance is still only 0.177. For any given anchor song, 341 tracks fall within a tight similarity radius. The candidate pool is rich, not thin. This was the first real validation that the feature could work. If a user locks a vibe, the system would have hundreds of strong candidates to draw from.

**Similarity is holistic, not one-dimensional.** When I examined the nearest neighbors visually, they matched the anchor across all features, not just one or two. The index is not finding "same tempo." It is finding genuinely similar vibes.

**Genre is irrelevant, by design.** Genre coherence is flat at roughly 10% across all distance thresholds. This is actually the correct behavior. A chill bossa nova track and a chill indie folk track should match on vibe even though they are different genres. The vibe space captures how music feels, not what category it is filed under.

**Cross-vibe separation works.** "Friday" (energy = 0.86) and "everything i wanted" (energy = 0.22) sit at the same roughly 120 BPM but have zero neighborhood overlap. The system correctly separates tracks that share surface-level features but feel completely different. The overall signal-to-noise ratio is strong: vibe-matched tracks are 28.9x closer than random pairs (Cohen's d = 4.66).

One key product question answered by this phase: can a user lock after just one song? Yes. The density guarantees hundreds of high-quality candidates for any single anchor. At low confidence, the system stays permissive. It will not reject good matches, and it will not stall.

---

## What I Knew It Could Not Do

I went into this with specific intuitions, and I want to be honest about where they hit a wall.

K-Means clustering served as a reasonable backbone for the project, but it has deep limitations for production-scale implementation. There is no user signal in this dataset. The most critical issue I stumbled on early is that there really is no objective way to define what a "lockdown" of vibe would be. In future iterations, user signals like skips during a locked session would get fed into machine learning models to better define what "vibe" really means. I am sure data teams at streaming services are already working on this.

The audio features alone cannot capture instrumentation, production style, vocals, lyrics, cultural era, or tempo feel. A 120 BPM EDM song feels entirely different from a 120 BPM bossa nova song. A Bach cello performance and an ambient electronic track can have extremely similar vectors: 0.1 on energy, 0.8 on acousticness, 0.3 on valence. But no one would say they are the same vibe.

There is also deeper subjectivity involved with the word "vibe" itself. That is precisely why this project is a product proposal, not just a data project. The data gives us a foundation. The product design has to account for what the data cannot see.

---

## From Data to Product

With the data foundation validated, I wrote a full PRD for a feature called "Keep This Vibe."

The concept is simple: one tap to lock DJ X to your current groove. The system reads your recent listening behavior, computes a vibe anchor, and constrains future recommendations to stay within that space. When the lock expires, it fades out gradually. No jarring transition.

The key product decisions, all informed by the data:

- **Session-aware anchoring.** Short sessions (fewer than 5 songs) use the most recent track. Longer sessions compute a weighted centroid. The data showed that vibe space is continuous, not clustered, so a centroid approach works better than trying to snap to discrete moods.
- **Confidence-adjusted thresholds.** Consistent sessions get tight recommendations; exploratory sessions stay loose. This came directly from the distance distribution analysis. The median nearest-neighbor distance is just 0.07, but the 95th percentile is 0.31. That range matters.
- **Genre as a soft boost, not a filter.** Genre coherence in the similarity index is roughly 10%, low by design. A genre match gets a small similarity bonus, but nothing gets excluded.
- **Skip-rate monitoring.** If a user starts skipping 70% or more of locked recommendations, the system asks "Still vibing?" rather than stubbornly continuing. The data showed that some listening patterns, focus work and drifting exploration in particular, do not respond well to vibe locking at all.
- **Gradual timer expiry.** The last three songs before the lock expires gradually widen the recommendation space. The user gets offered a one-tap extension. No hard cutoff.

The target audience for V1 is specific: high-energy sessioners. Workouts, parties, drives, any context where energy consistency matters most. The data clearly showed these users benefit the most. Deep focus users are explicitly excluded from the V1 target because the data showed the feature actively hurts them.

---

## The Problem I Could Not Solve With Data Alone

The engineering works. 0.32ms query latency across 8.7M tracks, 7x genre coherence over random, 29x distance separation between vibe-matched and random pairs.

But I could not answer the most important question: does it actually help users listen longer?

I do not have users. I do not have real skip and listen behavior. So I built a synthetic session simulator with five behavioral personas: the chill driver, the party host, the deep focus worker, the genre explorer, and the vibe drifter. 10,000 sessions. 800,000 events. Each persona with different skip tolerances, noise factors, and drift patterns.

This is where intellectual honesty became the most important product skill.

---

## The Results I Almost Got Wrong

My first evaluation showed a +2.1 average listen lift and 59% of sessions helped. It looked like a clear win.

Then I audited the methodology and found three structural biases:

1. **The counterfactual was a straw man.** My "DJ X without vibe lock" model drifted recommendations 5 to 12x farther than the nearest neighbor, guaranteeing the alternative would always look worse. I replaced it with realistic DJ behavior: gradual energy ramps and genre hops with bounded shifts.

2. **The evaluation was tautological.** Skip decisions were a pure function of angular distance, the same metric the lock optimizes. Of course the lock won. I added noise factors (10 to 22% random skip/listen flips) to simulate non-vibe reasons people skip: unfamiliar artist, wrong lyrics, mood shift.

3. **Confidence ignored skip rate.** A session with 90% skips could still show high confidence if the 10% of listens happened to be similar. I added a skip-rate penalty.

After fixing all three: **+0.3 average listen lift. 49% of sessions helped.** Essentially break-even.

But the breakdown by persona told a clearer story:

| Persona | Listen Lift | % Helped |
|---------|------------|----------|
| Party host | **+3.3** | **77%** |
| Genre explorer | +0.9 | 62% |
| Chill driver | +0.1 | 59% |
| Vibe drifter | -0.6 | 47% |
| Deep focus | **-2.2** | **36%** |

Party-style users with narrow, consistent preferences and high energy benefit significantly. Deep focus users are hurt by the lock because they skip for reasons that have nothing to do with vibe: lyrics, vocals, familiarity. The feature is not universally good. It is good for a specific segment.

That finding directly shaped the PRD. V1 targets high-energy sessioners explicitly, excludes deep focus users, and includes an experiment design to validate with real users before broader rollout.

---

## Why I Would Vouch for This Feature

The core is solid. The vibe similarity index works at scale. The product design adapts to session context. The lifecycle handles all the edge cases: early locks, taste drift, timer expiry, graceful transitions. With UX and UI refinement from a design team, this feature has legs.

My market research and user interviews support a feature like this existing in Spotify. I found independent corroboration on Spotify's own community forum: a user submitted a feature request titled "Keep the vibe button for AI DJ," describing the exact same problem and proposing a nearly identical solution. The people yearn for continuous vibes.

The data tells me where to aim. Party-style and driving sessions are the sweet spot. The data also tells me where to pull back: focus users and habitual drifters. That segmentation is the difference between shipping something that works for everyone 49% of the time and shipping something that works for the right users 77% of the time.

---

## What I Would Do Next

The honest answer is that synthetic data can validate mechanics but not impact. The critical next step is a small A/B test. Even 1,000 users over one week would provide ground truth that no simulation can replicate.

Beyond that:
- **Collaborative filtering.** "Users who locked on this vibe also liked..." would dramatically improve locked recommendations over pure audio similarity.
- **Personalized thresholds.** The current base threshold is a global default. Real calibration would learn per-user optimal thresholds from their historical skip distributions.
- **Deeper embeddings.** Solving the bossa nova problem, where two songs share identical audio features but feel completely different, requires richer signal than nine numerical features can provide.
- **Spotify's internal features.** Mood tags, activity tags, editorial playlists, and the social graph would all improve the vibe lock far beyond what raw audio features can achieve.

---

## The Takeaway

The PM cycle is not about proving your intuition right. It is about stress-testing it fast enough to build the right thing, or to learn why you should not build it at all.

Data analysis was not a checkbox in this project. It was the step that turned a hunch ("DJ X switches vibes too much") into a defensible product bet ("audio features contain 5 to 6 dimensions of vibe signal, similarity search works at scale, and party-style users are the right V1 target"). Without it, I would have designed a feature for everyone and discovered, much later and much more expensively, that it only works for some.

The v1-to-v2 correction was the most valuable moment in the project. Not because it changed the answer, but because it forced the right question: is this feature actually good, or does my evaluation just make it look good? That is the question every PM should be asking before they ship.
