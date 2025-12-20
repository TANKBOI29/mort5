import Footer from '../Components/atoms/Footer'
import LeafletMap from '../Components/atoms/LeafletMap'

function Home(){
    return (
        <>
          <div className='min-h-screen flex flex-col'>
            <div id="hero" className="flex flex-1 h-full bg-neutral-900 align-items justify-center">
              <LeafletMap />
            </div>
            <div id="footer" className="flex h-full bg-neutral-900">
              <Footer />
            </div>
          </div>
          
        </>
    )
};

export default Home;