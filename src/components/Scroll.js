import React,{useState,useEffect} from 'react'
function Scroll() {

    const [visibility, setVisibility] = useState(false)

    const toggleVisible = ()=>{
        if(window.scrollY>500){
            setVisibility(true)
        }
        else{
            setVisibility(false)
        }
    }

    useEffect(() => {

      window.addEventListener('scroll',toggleVisible) 
    }, [])

    const gotoScroll=()=>{

        window.scrollTo({
            top:0,
            behavior:'smooth',
        })

      }
    


  return (
    <>
    
    <i className="fa-solid fa-arrow-up"  onClick={gotoScroll} style={{display: visibility ? 'inline' : 'none',position:'fixed',width: '100%',left: '2%',bottom: '40px',fontSize: '3rem',cursor: 'pointer'}}  ></i>
   </>

  )
}

export default Scroll