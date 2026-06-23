import React from 'react';
import WritingLayout from '../../components/Writing/WritingLayout';
import OptimizedImage from '../../components/UI/OptimizedImage';
import EmbedContainer from '../../components/Writing/EmbedContainer';

const PhotoCaptions = () => {
  return (
    <WritingLayout
      title="Shared Memories & Captions"
      category="Un-Selected Works"
      backLink={{ path: '/works', label: 'Back to Works' }}
    >
      <div className="mb-16">
        <p className="text-xl leading-relaxed text-charcoal/80 mb-8 mt-12 border-l-4 border-moss/40 pl-6 italic">
          This is a preliminary idea, but when we create memories in the native Photos app, we should be able to caption photos, tag contacts who the collection is shared with, etc. This makes it a lot more collaborative and makes it feel more like a scrapbook to be shared and is more personal than just a simple shared album.
        </p>
      </div>
    </WritingLayout>
  );
}
export default PhotoCaptions;
