"use client"
// components/YouTubeEmbed.tsx

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <div className="relative pb-9/16 h-0">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen
        title="YouTube video"
      />
    </div>
  );
};

export default YouTubeEmbed;
