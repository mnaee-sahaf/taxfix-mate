export function VideoTutorial() {

   return(
    <div className="flex items-center justify-center py-2 my-6">
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/R8E3arXq75Q&ab_channel=SaturdayNightLive"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    </div>
   );

}