import LogoData from "./LogoData"

const LogoSvg = () => {
  return (
    <div>
      <div className="flex gap-[70px]">
        {LogoData.map((Card, index)=>(
          <div key={index} className=' gradientContainer flex flex-col items-center justify-center border-3 rounded-md shadow-xl shadow-[#bf0050]/10 p-4 w-44'>
            <div className="bg-[#a2014d] flex items-center justify-center rounded-[15%] w-28 h-28">
            <img src={Card.image} alt="Sport Balls" className=" rounded-[15px] w-20 h-20 mt-[2vh]"/> 
            </div>
            <p className="font-bold text-2xl mt-[1vh] font-sans-serif text-[#210fae]  ">{Card.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoSvg
