import React from 'react';
import {Skeleton} from '@/components/ui/skeleton';
import {cn} from "@/lib/utils.ts";

const MuscleCrewSkeletonSubsection: React.FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <section
            id="muscle-crew"
            className={cn(
                "relative w-full pt-[70px] pb-[78px] md:py-[120px] bg-neon-yellow px-4",
                "bg-[url('/images/yellow-bg-bottom.png')] bg-no-repeat bg-[center_bottom] bg-[length:100%]",
                className
            )}
        >
            {/* Top background overlay */}
            <div
                className="absolute top-0 left-0 right-0 w-full h-[300px] z-0"
                style={{
                    backgroundImage: `url('/images/yellow-bg-top.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left top",
                    backgroundSize: "cover",
                }}
            />

            <div className="relative z-30 flex flex-col items-center gap-5 md:gap-[30px] w-full pb-5 md:pb-8">
                <div className="inline-flex items-center">
                    <Skeleton className="custom-clip-path-both-side h-8 w-40 bg-black"/>
                </div>
                <Skeleton className="h-[80px] lg:h-[150px] w-[280px] lg:w-[500px] bg-black"/>
                <Skeleton className="h-[100px] w-full max-w-xl bg-gray-300 mt-4"/>
            </div>

            <div className="w-full flex justify-center items-center">
                <div className="cards w-full md:w-10/12 max-w-[1500px] xl:w-11/12 h-[78vh] lg:h-[82lvh] relative rounded-[20px] overflow-hidden ml-auto mr-0">
                    {/* Card Skeleton - giống như card-1 */}
                    <div className="absolute inset-0 w-full h-full bg-black border border-yellow-300 rounded-t-[20px] flex flex-col justify-end px-4 xl:pl-[62px] pb-[3em] lg:pb-[50px]">
                        <div className="w-full lg:w-1/2 max-w-[517px] flex flex-col gap-[13px] md:gap-[30px]">
                            <Skeleton className="h-[48px] lg:h-[60px] w-3/4 bg-white"/>
                            <Skeleton className="h-[100px] w-full bg-gray-300"/>
                            <Skeleton className="h-[50px] w-4/5 bg-gray-300"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MuscleCrewSkeletonSubsection;