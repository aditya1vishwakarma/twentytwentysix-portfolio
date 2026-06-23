import React from 'react';
import WritingLayout from '../../components/Writing/WritingLayout';

const Nostalgia = () => {
    return (
        <WritingLayout
            title="The Curse of Nostalgia"
            date="Random Note, 2025"
            readTime="1 min read"
            category="Random Thoughts"
            backLink={{ path: '/blog', label: 'Back to Journal' }}
        >

            <div className="mb-16">
                <p className="text-xl leading-relaxed text-charcoal/80 mb-8 italic border-l-4 border-moss/40 pl-6">
                    Nostalgia is probably the most potent and dangerous feeling we have.
                </p>
                <p className="mb-8">
                    A sense of longing for a past time, our minds completely manipulate reality of that time to something it wasn’t. The present is lame. We want out. I think that has to do with a realization that we live our lives by what the algorithm tells us.
                </p>
            </div>

            <div className="bg-moss/5 p-8 md:p-12 rounded-squircle border border-moss/10 my-16 wide-bleed">
                <p className="mb-6">
                    <strong>Porter Robinson</strong> covers this in SMILE - “some people die of nostalgia”
                </p>
                <p className="mb-6">
                    <strong>Coldplay</strong> - Glass of Water - “Don't ask, neither how full nor empty is your glass. Cling… To the mast… Spend your whole life living in the past… Going nowhere fast”
                </p>
                <p className="mb-0">
                    <strong>Midnight in Paris</strong> covers this - “The present is always a little unsatisfying”
                </p>
            </div>

            <p className="mb-8">
                People have completely exhausted nostalgia from 2010 to 2020. Now we’re moving back to exhausting nostalgia from 2000-2010. Then we’ll continue moving back to 1990-2000. We just can’t get enough. This cycle repeats again, and again, and again.
            </p>

            <p className="text-charcoal/70 mb-0">
                I feel like there’s been no big design or cultural movements since 2020. Everyone lives trying to recapture a different time. Everything is short term and money motivated. No real risk is taken in design nor do people try to take risks. It upsets EPS.
            </p>
        </WritingLayout>
    );
};

export default Nostalgia;