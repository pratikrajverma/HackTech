
import Course from "./Course";
import Live from "./Live";
import Peers from "./Peers";



function OldLandingPage() {



    return (



        <div className="flex   lg:flex-row flex-col lg:justify-center lg:items-center gap-20 lg:gap-10 lg:h-[100vh]">

            <Course></Course>

            <Live></Live>

            <Peers></Peers>
        </div>



    );
}

export default OldLandingPage;
