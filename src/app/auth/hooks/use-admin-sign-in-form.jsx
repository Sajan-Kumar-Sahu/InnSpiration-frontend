import API_CONFIG from '@/config/api.config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useMutation from '@/lib/hooks/useMutation';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { PATHS } from '@/config/path.config';
import { adminSignInSchema } from '@/lib/validators/auth-form-validator';
import { AUTH_TOKEN_KEY, setStorageItem } from '@/lib/storage-manager';
import { useAuthContext } from '@/lib/providers/auth-context-provider';

const useAdminSignInForm = () => {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuthContext();

  const { pending, mutate } = useMutation(API_CONFIG.AUTH.SIGN_IN, 'POST');

  const form = useForm({
    resolver: zodResolver(adminSignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignInSubmit = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        const token = response.data.accessToken;

        setStorageItem(AUTH_TOKEN_KEY, token);

        setAuthenticatedUser({
          isAuthenticated: true,
          user: response.user || {
            email: data.email,
            role: 'HOTEL_MANAGER', // fallback role if response doesn't include user
          },
        });

        toast.success('Signed in successfully');

        setTimeout(() => {
          navigate(PATHS.ADMIN_DASHBOARD, { replace: true });
        }, 100);
      },
      onError: (error) => {
        console.log(error);
        toast.error('Sign-in failed', {
          description: error?.message || 'Something went wrong',
        });
      },
    });
  };

  return { form, handleSignInSubmit, pending };
};

export { useAdminSignInForm };
