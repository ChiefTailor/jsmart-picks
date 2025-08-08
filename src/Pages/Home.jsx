import Premium from '../Data/Premium'
import logo from '../images/logo.png'
import logoj from '../images/logoj.jpg'
import Card from '../Components/Data'
import Packages from './Packages'
import Form from './Form'
import SocialButton from '../Components/SocialButton'
import HomeUi from './HomeUi'
import LogoSvg from '../Data/LogoSvg'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer'


const Home = () => {
    const links = [
        {
            name: 'Home',
            link: 'home'
        },
        {
            name: 'About',
            link: 'about'
        },
        {
            name: 'Premium',
            link: 'premium'
        },
        {
            name: 'Packages',
            link: 'packages'
        },
        {
            name: 'Contact',
            link: 'contact'
        },
        
    ];
    
    const handleScroll=(elementId) =>{
        const element =
        document.getElementById(elementId);
        if(element){
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    };
  return (
    <div>
      <nav className=' flex  items-center justify-between fixed top-0 w-full bg-white font-bold z-20'>
      <img src={logo} alt="Jerry Picks" className="w-[80px] ml-10 shadow-[#bf0050]/50"/>
     <ul className="flex gap-8 p-4 text-l font-sans">
       {links.map ((link, index) =>(
        <li key={index} className=''>
            <button onClick={()=> handleScroll(link.link)} className="text-black hover:text-[#bf0050]">
                {link.name}
            </button>
        </li>

        ))}
      </ul>
     <Link to= 'https://discord.gg/hnUux68kAp' className='mr-[20px]'> <Button/></Link>
     </nav>

     <div  id="home" className=" h-[100vh] bg-[url(./images/bg-2.jpg)] bg-cover bg-center pt-28 flex flex-col items-center ">
         <img src={logoj} alt="J smart" className='w-[500px] border-[10px] border-white rounded-full opacity-25 z-0' />
        <div className='flex flex-col items-center absolute top-0 z-10 pt-20 '>
        <p className='text-white text-center w[50vw] pl-16 mt-[15vh] text-7xl font-bold font-serif leading-[15vh] shadow-[#bf0050]/50'>
            DESTINATION FOR PREMIUM SPORT CONTENT
         </p>
         <div>
            <HomeUi/>
         </div>
         <div><LogoSvg/></div>
        </div>
      </div>

      <div id="about" className=" border h-[100vh] pt-28" >
       <Card/>
      </div>

      <div id="premium" className=" border h-[100vh] pt-28 px-[6vw]" >
       <Premium/> 
      </div>

      <div id="packages" className=" border h-[160vh] pt-28 px-[6vw]">
        <Packages/>
      </div>

      <div id="contact" className="border  h-[100vh] pt-28 px-[6vw] flex items-center justify-center gap-[10vw]">
        <Form/>
        <SocialButton/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
