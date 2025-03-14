export function VideoTutorial() {

   return(
    <div className="flex items-center justify-center py-2 my-6">
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/fbkVewraXr4?si=jP7l2_fP0r7eYkI1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share"
        allowFullScreen
      ></iframe>
    </div>
    </div>
   );

}