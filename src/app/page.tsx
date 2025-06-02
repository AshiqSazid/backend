'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
	const router = useRouter();
	const { status } = useSession(); // 'authenticated', 'unauthenticated', or 'loading'

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/dashboard');
		} else if (status === 'authenticated') {
			router.push('/dashboard');
		}
		// 'loading' state does nothing - we wait for the session to resolve
	}, [status, router]);

	return <></>;
}
