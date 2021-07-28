import { AuthService } from 'src/core/service/auth.service';

export function appInitializer(auth: AuthService) {
    return () => new Promise(resolve => {
        auth.refreshToken();
    });
}