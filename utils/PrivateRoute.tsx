// utils/privateRoute.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/contextfile';

interface PrivateRouteProps {
    params?: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
    data?: any,
    courseId?: number
}

export default function PrivateRoute<T extends PrivateRouteProps>(WrappedComponent: React.ComponentType<T>) {
    const Wrapper: React.FC<T> = (props) => {
        const { isAuthenticated } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (isAuthenticated === null) {
                // Still loading authentication state, do nothing
                return;
            }

            if (!isAuthenticated) {
                router.push('/auth/login');
            }
        }, [isAuthenticated]);

        // Render the wrapped component only if the authentication state is known
        return <>{isAuthenticated !== null && isAuthenticated ? <WrappedComponent {...props} /> : null}</>;
    };

    return Wrapper;
}
