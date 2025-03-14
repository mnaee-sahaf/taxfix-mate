
import { useIsMobile } from '@/hooks/use-mobile';

export function VideoTutorial() {
  const isMobile = useIsMobile();
  
  return(
    <div className="flex items-center justify-center py-2 my-6">
      <div className="w-full max-w-3xl">
        <div className="relative overflow-hidden pt-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            width={isMobile ? "100%" : "560"}
            height={isMobile ? "auto" : "315"}
            src="https://www.youtube.com/embed/fbkVewraXr4?si=jP7l2_fP0r7eYkI1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
