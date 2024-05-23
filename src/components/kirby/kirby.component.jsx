import { useEffect, useRef, useState } from "react"
import walk from 'assets/walk.gif'
import dead from 'assets/kirbyDead.png'
import rainbow from 'assets/rainbow.gif'
import boom from 'assets/boom.gif'
import './kirby.styles.scss'

const Kirby = () => {
    const imgRef = useRef()
    const kirbyExplodedRef = useRef(false)
    const [kirbyExploded, setKirbyExploded] = useState(false)
    const [isExplosionVisible, setIsExplosionVisible] = useState(false)
    const [explosionCoordinates, setExplosionCoordinates] = useState({x: 0, y: 0})


    const explosion = <img src={boom} alt='explosion' style={{display: isExplosionVisible ? 'block' : 'none', position: "fixed", left: explosionCoordinates.x, top: explosionCoordinates.y, zIndex: 4}}/>

    useEffect(() => {
        kirbyExplodedRef.current = kirbyExploded
    }, [kirbyExploded])

    useEffect(() => {
        const calculateScrollPercentage = () => {
            if (kirbyExplodedRef.current) return
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
      
            const totalDocScrollLength = docHeight - windowHeight;
            const scrollPosition = scrollTop / totalDocScrollLength;

            imgRef.current.style.left = `${(window.innerWidth * scrollPosition) - window.innerWidth}px`;
            imgRef.current.style.bottom = '0px';
        };

        window.addEventListener('scroll', calculateScrollPercentage);
    }, []);

    const images = new Array(10).fill(null);
    const onKirbyClick = (element) => {
        setExplosionCoordinates({x: element.clientX - 60, y: element.clientY - 60})
        setIsExplosionVisible(true)
        setKirbyExploded(true)
        setTimeout(() => {
            setIsExplosionVisible(false)
            setTimeout(() => {
                window.close()
            }, 300)
        }, 900)
    } 

    return (
        <div className="kirby">
            {explosion}
            <div className="kirby-outer-container">
                <div className="kirby-walk"  ref={imgRef} style={{left: window.innerWidth * -1}}>
                    {images.map((_, index) => (
                        <img 
                        key={index} 
                        src={rainbow} 
                        alt={`background ${index}`} 
                        style={{width: '10%', height: '60px'}}
                        className="rainbow"
                        />
                    ))}
                    <img className="kirby" alt='Kirby' src={kirbyExploded ? dead : walk} onClick={(e) => {onKirbyClick(e)}}/>
                </div>
            </div>
            
        </div>
    )
}

export default Kirby
