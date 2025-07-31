// components/CarrierTextBlock.js

export default function CarrierTextBlock() {
    return (
        <div className="h-fit md:text-left text-center">
            <div className="w-min md:space-y-4 space-y-2  md:mx-0 mx-auto">
                <h5 className="uppercase text-[16px] md:text-[18px] font-semibold">Carrier</h5>
                <h1 className="gradient-text text-9xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                    Carrier Partners
                </h1>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
                    Utilizing State-Of-The-Art Technology For Real-Time Tracking And Efficiency.
                </p>
                <button className="mt-6 sm:mt-10 md:mt-12 btn py-2 px-6 sm:px-8 rounded-4xl cursor-pointer font-semibold text-sm sm:text-base">
                    Get Started
                </button>
            </div>
        </div>
    );
}
