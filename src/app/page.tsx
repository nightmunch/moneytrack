import { Spotlight } from "@/components/ui/spotlight";

export default function Home() {
	return (
		<div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-grid-white/[0.02] relative overflow-hidden">
			<Spotlight
				className="-top-40 left-0 md:left-60 md:-top-20"
				fill="#26210e"
			/>
			<div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
				<h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-slate-800 to-stone-500 bg-opacity-50">
					MoneyTrack <br /> Your companion.
				</h1>
				<p className="mt-4 font-normal text-base text-neutral-800 max-w-lg text-center mx-auto">
					Unleash financial freedom with MoneyTrack! 🚀 Transform your finances
					into an exciting adventure. Boost savings, master budgets, and uncover
					hidden opportunities. Navigate your financial world with confidence
					and turn dreams into reality. Your journey to prosperity starts now!
					💰✨
				</p>
				<div className="mt-8 flex justify-center">
					<a
						href="/login"
						className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#9c937e] to-[#ada799] rounded-full hover:from-[#726b5c] hover:to-[#918b7d] transition-all duration-300 shadow-lg hover:shadow-xl"
					>
						Let&apos;s Get Started
					</a>
				</div>
			</div>
		</div>
	);
}
