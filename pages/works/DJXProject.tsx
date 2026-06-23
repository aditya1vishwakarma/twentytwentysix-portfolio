import React from 'react';
import WritingLayout from '../../components/Writing/WritingLayout';
import OptimizedImage from '../../components/UI/OptimizedImage';
import EmbedContainer from '../../components/Writing/EmbedContainer';

const DJXProject = () => {
  return (
    <WritingLayout
      title="Keep This Vibe, DJ X"
      category="Product Manager"
      date="March 2026"
      readTime="10 min read"
      backLink={{ path: '/works', label: 'Back to Works' }}
    >
      <div className="mb-4">
        <p className="text-xl leading-relaxed">
          How I used the full PM cycle to take a personal frustration, stress-test it with data, prototype a solution, and learn that the honest answer is more useful than the optimistic one.
        </p>
      </div>

      <div className="wide-bleed mt-2 mb-16">
        <div className="overflow-hidden rounded-squircle shadow-lg border border-charcoal/10 bg-charcoal/5">
          <video
            src="https://pub-9c95b4d2e81345c4a46a362747b32ea6.r2.dev/projectvideos/djxlockprototype.mov"
            controls
            playsInline
            muted
            loop
            autoPlay
            className="w-full h-auto object-cover max-h-[70vh]"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-xs md:text-sm text-charcoal/60 mt-3 text-center italic">
          Early, functional, quick-code prototype of how the feature could work.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">The Problem</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          You are twenty minutes into a drive. Spotify's DJ X has been nailing it. You have settled into a groove of disco house, everything is clicking, and then you hear it: "Let's switch things up a bit." The energy drops. You go from disco to melancholic rock. Your vibe is gone. So you skip. Skip again. After a few songs of trying to recapture the same mood, you leave DJ X entirely and go find a playlist.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          This happened to me constantly. And when I asked friends, the reaction was always immediate: "Yeah, I hate that."
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The frustration was real. But frustration alone is not a product. I wanted to know: is this solvable? Would the data support it? And if I built it, would it actually work?
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">Why This Problem</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Music is something I care deeply about, and Spotify is a platform I have used for over a decade. For a project like this, I wanted to work on something I would genuinely want to use. In this case, that meant improving how Spotify's recommendation engine handles continuity. Because sometimes it misses the mark, not by suggesting bad songs, but by breaking a streak you did not want broken.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          I also needed to see past Spotify's existing recommendation biases. I have used the platform long enough to notice the nuances. Song radio, for example, leans heavily on your existing history. Spotify has released features over time that discount personalization, but they are not particularly accessible. The feature I started thinking about sits in that same space: relying on the pure recommendation engine, stripped of personal bias, and putting it to work for a short, focused period.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">The Approach</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          I will acknowledge upfront that this is a little different from how Spotify PMs would ordinarily operate. Usually the data science team delivers the sophisticated analysis, and PMs shape a feature or product around it. Or vice versa, the PM has an inclination for a feature, and data science helps validate it. For this project, I tackled the entire stack, with Claude as my partner.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The dataset I found was a public collection of 8.7 million Spotify tracks with full audio feature metadata: energy, valence (musical positivity), danceability, acousticness, tempo, loudness, and more. Nine features per song, across nearly the entire catalog. It came in SQLite format, which I had genuinely never worked with before. That turned out to be the smallest challenge by far.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">The Hypothesis</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Using the audio features table that assigns a measurable characteristic to every song, I could build a clustering model to group songs and recommend the closest possible "vibe" to a given track. This would later enable a "Keep This Vibe" feature when using DJ X, where one tap locks the system to your current groove.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The formal version: by leveraging high-dimensional audio metadata to create a nearest-neighbors model, we can identify vibe-consistent tracks with higher precision than genre tags alone. Implementing a "Keep This Vibe" toggle in the AI DJ would increase session length and decrease skip rate, as users would no longer need to manually curate their queue to maintain atmospheric consistency.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">Starting With the Data, Not the Solution</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Over my career, I have had to learn the painful lesson of not jumping to a solution first. So I started with a question: do Spotify's audio features contain enough signal to define what "vibe" even means?
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Before building anything, I needed to understand the data. What does a typical song look like? Which features actually differentiate songs from each other? Are there meaningful clusters, or is the feature space just noise? Only by knowing this could I accurately gauge vibe. This statistical analysis phase ended up being the most important step in the entire project.
        </p>

        <h3 className="text-2xl font-serif mb-4 mt-8 text-moss">Data Cleaning</h3>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The raw dataset had 8,740,043 tracks. Before analysis, I ran a cleaning pass:
        </p>
        <ul className="list-disc list-inside space-y-2 text-charcoal/70 text-lg mb-4">
          <li><strong>Loudness clamping.</strong> The raw data had a max loudness of 6.28 dB, which is physically impossible for digital audio. All values above 0 dB were clamped.</li>
          <li><strong>Extraction failure filtering.</strong> 34,764 tracks had a tempo of zero. 34,979 had a time signature of zero. These are artifacts of Spotify's audio analysis pipeline failing on certain tracks, not actual musical properties. All were removed.</li>
        </ul>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Total records dropped: 34,979 (0.40% of the dataset). That left 8,705,064 pristine tracks for analysis. A small price to prevent zero-value tracks from skewing vector distances downstream.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">What the Data Told Me</h2>

        <h3 className="text-2xl font-serif mb-4 mt-8 text-moss">Phase 1: Understanding the Feature Space</h3>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The first question was basic: do Spotify's audio features actually mean anything?
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Every single audio feature significantly predicts genre (ANOVA, p close to 0 for all nine). Classical music has a distinct audio fingerprint from hip-hop, which looks different from electronic, which looks different from rock. If the features were noise, the entire concept would have been dead on arrival. They are not.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The distributions told me what "normal" looks like. Danceability, energy, and valence are healthy bell curves centered around 0.5. Speechiness is severely right-skewed, with almost all songs near zero. That makes sense: most music is singing, not spoken word. Instrumentalness is bimodal. Songs are either vocal or instrumental, rarely in between. These shapes matter because they tell you which features will actually differentiate songs and which are just background noise.
        </p>

        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The correlation analysis revealed structure. Energy and loudness are tightly linked (r = +0.79). Acousticness and energy are inversely correlated (r = -0.75). These three form an "intensity" cluster: they are partially redundant. But most other features are fairly independent, meaning each one adds unique information to the vibe vector. Danceability and valence have a moderate positive correlation, which makes intuitive sense: danceable songs tend to be happier.
        </p>

        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          PCA confirmed this: five principal components capture roughly 82% of the variance, with a clear "intensity" axis (PC1) and a "mood" axis (PC2, driven by valence and danceability).
        </p>

        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The most important output: ranking features by importance. The top three were valence, acousticness, and danceability. These are perceptual features. They map to how a song <em>feels</em>, not just how it sounds. This directly informed the weighting scheme: give the "feel" features more influence in similarity calculations.
        </p>

        <h3 className="text-2xl font-serif mb-4 mt-8 text-moss">Implications for the Model</h3>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The statistical findings pointed clearly:
        </p>
        <ul className="list-disc list-inside space-y-2 text-charcoal/70 text-lg mb-4">
          <li><strong>Use all 9 continuous features.</strong> Low inter-correlation means each adds unique signal.</li>
          <li><strong>Perceptual weighting makes sense.</strong> Valence, energy, and danceability are the most vibe-relevant features and should carry more weight.</li>
          <li><strong>StandardScaler is necessary.</strong> Loudness ranges from -60 to 0 dB while danceability ranges from 0 to 1. Without normalization, loudness would dominate every distance calculation.</li>
          <li><strong>Genre can validate but cannot replace audio features.</strong> 70% of artists in the dataset lack genre tags entirely.</li>
        </ul>

        <h3 className="text-2xl font-serif mb-4 mt-8 text-moss">Phase 2: Proving Similarity Search Works</h3>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Knowing the features carry signal is not the same as knowing you can search by similarity at scale. I built a 12-dimensional vibe index across all 8.7M tracks and stress-tested it.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          <strong>The vibe space is dense and well-behaved.</strong> The median nearest-neighbor distance is just 0.066. At rank 20, the median distance is still only 0.177. For any given anchor song, 341 tracks fall within a tight similarity radius. The candidate pool is rich, not thin. This was the first real validation that the feature could work. If a user locks a vibe, the system would have hundreds of strong candidates to draw from.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          <strong>Similarity is holistic, not one-dimensional.</strong> When I examined the nearest neighbors visually, they matched the anchor across all features, not just one or two. The index is not finding "same tempo." It is finding genuinely similar vibes.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          <strong>Genre is irrelevant, by design.</strong> Genre coherence is flat at roughly 10% across all distance thresholds. This is actually the correct behavior. A chill bossa nova track and a chill indie folk track should match on vibe even though they are different genres. The vibe space captures how music feels, not what category it is filed under.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          <strong>Cross-vibe separation works.</strong> "Friday" (energy = 0.86) and "everything i wanted" (energy = 0.22) sit at the same roughly 120 BPM but have zero neighborhood overlap. The system correctly separates tracks that share surface-level features but feel completely different. The overall signal-to-noise ratio is strong: vibe-matched tracks are 28.9x closer than random pairs (Cohen's d = 4.66).
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          One key product question answered by this phase: can a user lock after just one song? Yes. The density guarantees hundreds of high-quality candidates for any single anchor. At low confidence, the system stays permissive. It will not reject good matches, and it will not stall.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">What I Knew It Could Not Do</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          I went into this with specific intuitions, and I want to be honest about where they hit a wall.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          K-Means clustering served as a reasonable backbone for the project, but it has deep limitations for production-scale implementation. There is no user signal in this dataset. The most critical issue I stumbled on early is that there really is no objective way to define what a "lockdown" of vibe would be. In future iterations, user signals like skips during a locked session would get fed into machine learning models to better define what "vibe" really means. I am sure data teams at streaming services are already working on this.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The audio features alone cannot capture instrumentation, production style, vocals, lyrics, cultural era, or tempo feel. A 120 BPM EDM song feels entirely different from a 120 BPM bossa nova song. A Bach cello performance and an ambient electronic track can have extremely similar vectors: 0.1 on energy, 0.8 on acousticness, 0.3 on valence. But no one would say they are the same vibe.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          There is also deeper subjectivity involved with the word "vibe" itself. That is precisely why this project is a product proposal, not just a data project. The data gives us a foundation. The product design has to account for what the data cannot see.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">From Data to Product</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          With the data foundation validated, I wrote a full PRD for a feature called "Keep This Vibe."
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The concept is simple: one tap to lock DJ X to your current groove. The system reads your recent listening behavior, computes a vibe anchor, and constrains future recommendations to stay within that space. When the lock expires, it fades out gradually. No jarring transition.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The key product decisions, all informed by the data:
        </p>
        <ul className="list-disc list-inside space-y-2 text-charcoal/70 text-lg mb-4">
          <li><strong>Session-aware anchoring.</strong> Short sessions (fewer than 5 songs) use the most recent track. Longer sessions compute a weighted centroid. The data showed that vibe space is continuous, not clustered, so a centroid approach works better than trying to snap to discrete moods.</li>
          <li><strong>Confidence-adjusted thresholds.</strong> Consistent sessions get tight recommendations; exploratory sessions stay loose. This came directly from the distance distribution analysis. The median nearest-neighbor distance is just 0.07, but the 95th percentile is 0.31. That range matters.</li>
          <li><strong>Genre as a soft boost, not a filter.</strong> Genre coherence in the similarity index is roughly 10%, low by design. A genre match gets a small similarity bonus, but nothing gets excluded.</li>
          <li><strong>Skip-rate monitoring.</strong> If a user starts skipping 70% or more of locked recommendations, the system asks "Still vibing?" rather than stubbornly continuing. The data showed that some listening patterns, focus work and drifting exploration in particular, do not respond well to vibe locking at all.</li>
          <li><strong>Gradual timer expiry.</strong> The last three songs before the lock expires gradually widen the recommendation space. The user gets offered a one-tap extension. No hard cutoff.</li>
        </ul>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The target audience for V1 is specific: high-energy sessioners. Workouts, parties, drives, any context where energy consistency matters most. The data clearly showed these users benefit the most. Deep focus users are explicitly excluded from the V1 target because the data showed the feature actively hurts them.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">The Problem I Could Not Solve With Data Alone</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The engineering works. 0.32ms query latency across 8.7M tracks, 7x genre coherence over random, 29x distance separation between vibe-matched and random pairs.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          But I could not answer the most important question: does it actually help users listen longer?
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          I do not have users. I do not have real skip and listen behavior. So I built a synthetic session simulator with five behavioral personas: the chill driver, the party host, the deep focus worker, the genre explorer, and the vibe drifter. 10,000 sessions. 800,000 events. Each persona with different skip tolerances, noise factors, and drift patterns.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          This is where intellectual honesty became the most important product skill.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">The Results I Almost Got Wrong</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          My first evaluation showed a +2.1 average listen lift and 59% of sessions helped. It looked like a clear win.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Then I audited the methodology and found three structural biases:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-charcoal/70 text-lg mb-4">
          <li><strong>The counterfactual was a straw man.</strong> My "DJ X without vibe lock" model drifted recommendations 5 to 12x farther than the nearest neighbor, guaranteeing the alternative would always look worse. I replaced it with realistic DJ behavior: gradual energy ramps and genre hops with bounded shifts.</li>
          <li><strong>The evaluation was tautological.</strong> Skip decisions were a pure function of angular distance, the same metric the lock optimizes. Of course the lock won. I added noise factors (10 to 22% random skip/listen flips) to simulate non-vibe reasons people skip: unfamiliar artist, wrong lyrics, mood shift.</li>
          <li><strong>Confidence ignored skip rate.</strong> A session with 90% skips could still show high confidence if the 10% of listens happened to be similar. I added a skip-rate penalty.</li>
        </ol>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          After fixing all three: <strong>+0.3 average listen lift. 49% of sessions helped.</strong> Essentially break-even.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          But the breakdown by persona told a clearer story:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full text-left text-sm whitespace-nowrap bg-moss/5 rounded-squircle border border-moss/10 overflow-hidden">
            <thead className="uppercase tracking-wider border-b border-moss/10 bg-moss/10 text-charcoal/80 font-bold">
              <tr>
                <th scope="col" className="px-6 py-4">Persona</th>
                <th scope="col" className="px-6 py-4">Listen Lift</th>
                <th scope="col" className="px-6 py-4">% Helped</th>
              </tr>
            </thead>
            <tbody className="text-charcoal/70 text-base">
              <tr className="border-b border-moss/5">
                <td className="px-6 py-4">Party host</td>
                <td className="px-6 py-4 font-bold">+3.3</td>
                <td className="px-6 py-4 font-bold">77%</td>
              </tr>
              <tr className="border-b border-moss/5">
                <td className="px-6 py-4">Genre explorer</td>
                <td className="px-6 py-4">+0.9</td>
                <td className="px-6 py-4">62%</td>
              </tr>
              <tr className="border-b border-moss/5">
                <td className="px-6 py-4">Chill driver</td>
                <td className="px-6 py-4">+0.1</td>
                <td className="px-6 py-4">59%</td>
              </tr>
              <tr className="border-b border-moss/5">
                <td className="px-6 py-4">Vibe drifter</td>
                <td className="px-6 py-4">-0.6</td>
                <td className="px-6 py-4">47%</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Deep focus</td>
                <td className="px-6 py-4 font-bold">-2.2</td>
                <td className="px-6 py-4 font-bold">36%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Party-style users with narrow, consistent preferences and high energy benefit significantly. Deep focus users are hurt by the lock because they skip for reasons that have nothing to do with vibe: lyrics, vocals, familiarity. The feature is not universally good. It is good for a specific segment.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          That finding directly shaped the PRD. V1 targets high-energy sessioners explicitly, excludes deep focus users, and includes an experiment design to validate with real users before broader rollout.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">Why I Would Vouch for This Feature</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The core is solid. The vibe similarity index works at scale. The product design adapts to session context. The lifecycle handles all the edge cases: early locks, taste drift, timer expiry, graceful transitions. With UX and UI refinement from a design team, this feature has legs.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          My market research and user interviews support a feature like this existing in Spotify. I found independent corroboration on Spotify's own community forum: a user submitted a feature request titled "Keep the vibe button for AI DJ," describing the exact same problem and proposing a nearly identical solution. The people yearn for continuous vibes.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The data tells me where to aim. Party-style and driving sessions are the sweet spot. The data also tells me where to pull back: focus users and habitual drifters. That segmentation is the difference between shipping something that works for everyone 49% of the time and shipping something that works for the right users 77% of the time.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">What I Would Do Next</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The honest answer is that synthetic data can validate mechanics but not impact. The critical next step is a small A/B test. Even 1,000 users over one week would provide ground truth that no simulation can replicate.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Beyond that:
        </p>
        <ul className="list-disc list-inside space-y-2 text-charcoal/70 text-lg mb-4">
          <li><strong>Collaborative filtering.</strong> "Users who locked on this vibe also liked..." would dramatically improve locked recommendations over pure audio similarity.</li>
          <li><strong>Personalized thresholds.</strong> The current base threshold is a global default. Real calibration would learn per-user optimal thresholds from their historical skip distributions.</li>
          <li><strong>Deeper embeddings.</strong> Solving the bossa nova problem, where two songs share identical audio features but feel completely different, requires richer signal than nine numerical features can provide.</li>
          <li><strong>Spotify's internal features.</strong> Mood tags, activity tags, editorial playlists, and the social graph would all improve the vibe lock far beyond what raw audio features can achieve.</li>
        </ul>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-6 text-moss">The Takeaway</h2>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The PM cycle is not about proving your intuition right. It is about stress-testing it fast enough to build the right thing, or to learn why you should not build it at all.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          Data analysis was not a checkbox in this project. It was the step that turned a hunch ("DJ X switches vibes too much") into a defensible product bet ("audio features contain 5 to 6 dimensions of vibe signal, similarity search works at scale, and party-style users are the right V1 target"). Without it, I would have designed a feature for everyone and discovered, much later and much more expensively, that it only works for some.
        </p>
        <p className="text-lg leading-relaxed text-charcoal/70 mb-4">
          The v1-to-v2 correction was the most valuable moment in the project. Not because it changed the answer, but because it forced the right question: is this feature actually good, or does my evaluation just make it look good? That is the question every PM should be asking before they ship.
        </p>
      </div>

    </WritingLayout>
  );
};

export default DJXProject;
