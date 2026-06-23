# Building Architextures: on-device intelligence for the built environment

*An iOS app that photographs, classifies, and curates architecture using nothing beyond the frameworks already on your phone.*

**Aditya Vishwakarma · June 2026**

---

There is a particular kind of noticing that happens when you spend time around buildings. You start to see the repeated arch, the material choice that ages well in coastal air, the way a cantilever creates shade at exactly the right hour. Architextures is an app for people who notice these things and want a place to keep them.

The premise is simple. You photograph architecture, and the app tells you what it sees: materials, structural elements, stylistic periods. You accept, reject, or add your own labels. Over time, your library becomes a personal taxonomy of the built world, organized by the descriptors that matter to you.

What made this project interesting to build was a set of constraints we chose at the start and never relaxed.

## Zero dependencies, fully on-device

Architextures has no third-party packages. No SPM dependencies, no CocoaPods, no external SDKs. Every capability comes from Apple's native frameworks: SwiftData for persistence, Vision for image classification, AVFoundation for the camera, CoreLocation for GPS, MapKit for the location experience, and UIKit and SwiftUI together for the interface.

This was a product decision, not a technical exercise. When your app depends only on the platform, you inherit the platform's privacy story, its performance profile, and its longevity. There is no dependency to audit, no SDK update to chase, no server to keep running. The app works on a plane.

All machine learning inference runs on-device through `VNClassifyImageRequest`. Vision returns roughly 1,300 taxonomy identifiers with confidence scores for any given image. Most of those describe the natural world. "Flower." "Dog." For an architecture app, that raw output is almost entirely noise.

## The architectural mapping layer

The solution is a curated translation dictionary: a static property list that maps Vision's taxonomy identifiers to architectural terms. When Vision returns `material` with high confidence, the dictionary resolves it to "Mosaic Tile" under the Element category. When it returns `building`, the dictionary knows what that means in an architectural context and how to surface it.

Identifiers that have no match in the dictionary are dropped entirely. This is deliberate. A suggestion that reads "outdoor" or "recreation" teaches the user nothing about the building they photographed. By filtering aggressively at the mapping layer, we ensure that every suggestion surfaced to the user is architecturally meaningful.

The mapping is a maintained resource. It is intentionally non-exhaustive today, strong on materials and structural elements, thinner on style (which waits for a dedicated CoreML classifier). It is designed to grow.

## Staging, not guessing

> *A tag does not exist in the database until a person says it should.*

The inference pipeline produces suggestions, not facts. Each Vision result that survives the mapping layer becomes a `TagSuggestion`: a temporary staging object that holds the identifier, its human-readable name, its confidence score, and its proposed category. The suggestion is linked to the individual photo it was generated from. It carries no resolved tag. Its `targetTag` field is nil.

Tags are canonical. They live in a shared library with a unique constraint on the name field. They belong to photo groups, not individual photos. A `Tag` is created or reused only when the user explicitly accepts a suggestion during the save transaction. This separation between inference output and user-confirmed metadata is the backbone of the data architecture. It means the app never pollutes the user's library with machine-generated labels they did not choose.

Unaccepted suggestions are cleaned up. Anything older than 24 hours that was never converted into a tag relationship is purged automatically by a background janitor service.

## The unit of curation

Early on, we made a structural decision that shaped everything downstream: the `PhotoGroup` is the fundamental unit of the app. A single import creates one group. A multi-photo import also creates one group. The home grid, the data queries, the tag relationships, the favorites, the description: all of these live on the group, not on individual photos.

This means a user who photographs a building from three angles and imports those three photos gets one card in their library, one set of tags, one description, one favorite toggle. The mental model matches the real object. Three photos of the Salk Institute is one entry about the Salk Institute.

The inference pipeline still runs per-photo (each image may surface different materials or elements), and suggestions from all photos in the group are presented together. The accepted tags land on the group. This gives you the breadth of per-image analysis with the clarity of per-subject organization.

## UIKit where it matters, SwiftUI where it fits

The home screen is a masonry grid. Early versions used SwiftUI's `LazyVStack` with a column-balancing pre-pass. It worked for sample data. It would not have worked at scale: eager layout computation, no true cell reuse, no prefetching.

We moved the home shell to UIKit. `UICollectionViewCompositionalLayout` computes the masonry incrementally, per section. `UICollectionViewDiffableDataSource` feeds it from a batched `FetchDescriptor`. Prefetching decodes upcoming thumbnails off the main thread. The staggered opening animation is driven imperatively through cell appearance callbacks.

Inside those cells, the card content is still SwiftUI, hosted via `UIHostingConfiguration`. The detail view, the tag suggestion editor, the filter sheet: all SwiftUI. The camera is UIKit and AVFoundation. Each framework is used where its strengths are clearest.

## The camera and deferred processing

The capture experience prioritizes responsiveness. Zero-shutter-lag is enabled. Fast capture prioritization is on. A readiness coordinator gates the shutter button on the camera's actual ready state, so the button is honest: if you can tap it, the shot will land.

During a capture session, nothing else happens. No Vision inference, no thumbnail generation, no SwiftData writes. Each shot is written to a temporary file and that is all. The camera stays fast because the camera only does camera work.

Processing is deferred to the moment you tap "Use Photos." At that point, a single `PhotoGroup` is created, 600px thumbnails are generated, EXIF GPS is extracted (or CoreLocation coordinates are written into the image metadata for geotagging), and the detail view opens in edit mode. Vision classification runs on appear, and the tag suggestion editor presents itself with the results organized by category: Style, Element, Vibe.

This flow means you go from shutter to curated entry in one continuous gesture. Capture, review, tag, describe, save.

## What we are still thinking about

Rich-text descriptions persist today as archived `AttributedString` data, supporting bold and italic through Foundation's inline presentation intents. The plain-text field remains as a mirror. Whether that duality is worth carrying long-term is an open question.

The location feature uses MapKit for tiles and place search. That is a network dependency in an app that otherwise works offline. We have not resolved that tension fully. The current position is pragmatic: the map renders empty without connectivity, place names come only from stored metadata, and reverse geocoding is not attempted. It is a reasonable compromise. It may not be the final one.

The Stage 3 CoreML style classifier (Art Deco, Brutalist, Mid-Century Modern) is designed in the data architecture and has a place in the pipeline. It has not been trained yet. When it arrives, it will run independently of the Vision pipeline, produce its own `TagSuggestion` objects, and surface alongside the mapped results. The staging layer is already waiting for it.

Pagination is partial. The grid fetches in batches of 200, sorted by most recently updated. True offset-based paging and a full-text search strategy are both noted for when the library size demands them.

## The shape of the work

Architextures is a small app with a specific point of view. It is built on the belief that on-device intelligence, local persistence, and careful data modeling can produce an experience that feels considered and fast, without reaching for anything beyond the platform.

The constraints we started with turned out to be generative. Having no server meant every feature had to justify its data model locally. Having no dependencies meant understanding every framework we used at the API level. Having a staging layer between inference and the user's library meant we had to design the entire flow around human judgment, which is, in the end, the whole point of a curation app.

We are still building. The architecture is solid. The dictionary is growing. The camera works. The next step is getting it into hands.
