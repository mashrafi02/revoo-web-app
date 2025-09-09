import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

const PaginationBar = ({totalPages, currentPage, onPageChange}) => {

    const maxPagesTOShow = 10;
    const page_numbers = [];

    if(totalPages <= maxPagesTOShow){
        for(let i= 1; i <= totalPages; i++){
            page_numbers.push(i);
        }
    }
    else{
        const startPages = [1];
        const endPages = [totalPages];
        const middlePages = [currentPage -3, currentPage -2, currentPage -1, currentPage, currentPage +1, currentPage +2, currentPage +3].filter(
            p => p > 1 && p < totalPages 
        )

        const uniquePages = Array.from(new Set([...startPages, ...middlePages, ...endPages])).sort((a,b) => a-b);
        for (let i = 0; i < uniquePages.length; i++) {
            const current = uniquePages[i];
            const prev = uniquePages[i - 1];
        
            if (i > 0 && current - prev > 1) {
                page_numbers.push("...");
            }
        
            page_numbers.push(current);
        }
    }

  return (
    <div className="text-center my-20">
        <div className="paginate flex gap-x-[30px] items-center justify-center">
            <button onClick={() => onPageChange(prev => ({...prev, page: currentPage - 1}))}
                    disabled={currentPage === 1}
                    className="bg-red-400 w-[50px] h-[50px] rounded-full mr-[34px] flex justify-center items-center cursor-pointer">
                <SlArrowLeft className=" text-xl text-[#FFF] cursor-pointer font-bold"/>
            </button>
            {
                page_numbers.map((num,index) => <button key={index}
                                                        onClick={() => onPageChange(prev => ({...prev, page: num}))}
                                                        className="px-[18px] py-[9px] text-lg text-[#303030] font-[Poppins] font-semibold cursor-pointer rounded-[5px] hover:!text-white hover:!bg-blue-400 duration-200"
                                                        style={{
                                                            background: currentPage === num? "skyblue" : "#FFF",
                                                            color: currentPage === num? "#000" : "#303030",
                                                        }}>
                                                    {num}
                                                </button>)
            }
            <button onClick={() => onPageChange(prev => ({...prev, page: currentPage + 1}))}
                    disabled={currentPage === totalPages}
                    className="bg-red-400 w-[50px] h-[50px] rounded-full ml-[34px] flex justify-center items-center cursor-pointer">
                <SlArrowRight className="text-xl text-[#FFF] cursor-pointer font-bold"/>
            </button>
        </div>
    </div>
  )
}

export default PaginationBar