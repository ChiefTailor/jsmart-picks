import { CardData } from "../Data/CardData"

const Data = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="ml-[0vw] mr-[vw]  ">
        <h1 className="text-[2rem] text-center sm:text-left font-bold font-serif text-[#9a0141] shadow-[#bf0050]/50">Top Leagues</h1>
        <div className="grid grid-cols-4 gap-[4vw] border-t-8 border-[#bf0050]">
            {CardData.map((Card)=>(
                <div key={Card.id}>
                    <img src={Card.image} alt={Card.desc} className=" rounded-[15px] w-40 h-40 mt-[2vh] shadow-xl shadow-[#bf0050]/10 "/>
                    <p className="font-bold text-2xl mt-[1vh] font-serif text-[#a2014d] shadow-purple-900/50">{Card.title}</p>
                    <p className="font-mono text-l text-[#c3024f]">{Card.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Data
