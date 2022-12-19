export default function ErrorBanner(props: { message: string }) {
	return (
		<div role="alert">
			<div className="text-center bg-red-500 text-white font-bold px-4 py-2">
				We&apos;re experiencing some issues...
			</div>
			<div className="text-center border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
				{props.message}
			</div>
		</div>
	);
}