import nft1 from './images/nft1.jpg'
import nft2 from './images/nft2.jpg'
import nft7 from './images/nft7.png'

function Collections(){
    return (
        <>
            <div className="bodycontainer">
                <div className="nft-grid">
                    <div className="nft-card"> 
                        <img src={nft7} alt="" />
                        <h3>Carding 1</h3>
                    </div>

                    <div className="nft-card">
                        <h3>Carding 2</h3>
                    </div>

                    <div className="nft-card">
                        <h3>Carding 3</h3>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Collections