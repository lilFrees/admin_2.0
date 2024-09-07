import Link from 'next/link';

function NotFound() {
	return (
		<div className='absolute inset-0 w-full    flex flex-col items-center justify-center h-screen bg-gray-100'>
			<h1 className='text-4xl font-bold text-gray-800 mb-4'>
				404 - Page Not Found
			</h1>
			<p className='text-gray-600 mb-8'>
				Oops! The page you are looking for does not exist.
			</p>
			<Link
				href='/'
				className='px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 hover:bg-green-600'
			>
				Go Back Home
			</Link>
		</div>
	);
}

export default NotFound;
