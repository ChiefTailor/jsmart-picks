import PremiumServicesData from './PremiumServicesData'

const Premium = () => {
  return (
      <div className="flex flex-col items-center justify-center">
           <div className="">
            <h1 className="text-[2rem] text-center sm:text-left font-bold font-serif text-[#9a0141] shawdow-[#bf0050]/50">Premium Services</h1>
            <div className="grid grid-cols-3 gap-[3vw] border-t-8 border-[#bf0050]">
                {PremiumServicesData.map((Card)=>(
                    <div key={Card.id} className="border-3 rounded-[15px] shadow-xl shadow-[#bf0050]/10 p-4">
                        <img src={Card.image} alt={Card.desc} className=" rounded-[15px] w-30 h-20 mt-[2vh]"/>
                        <p className="font-bold text-2xl mt-[1vh] font-serif text-[#a2014d]">{Card.title}</p>
                        <p className="font-mono text-l text-[#c3024f] shadow-purple-900/50">{Card.desc}</p>
                    </div>
                ))}
            </div> 
          </div>
        </div>
  )
}

export default Premium
